package org.launchcode.Amethyst.services.impl;

import org.launchcode.Amethyst.dto.CartDto;
import org.launchcode.Amethyst.dto.CartItemDto;
import org.launchcode.Amethyst.entity.Cart;
import org.launchcode.Amethyst.entity.CartItem;
import org.launchcode.Amethyst.entity.Donut;
import org.launchcode.Amethyst.entity.User;
import org.launchcode.Amethyst.mapper.DonutMapper;
import org.launchcode.Amethyst.mapper.UserMapper;
import org.launchcode.Amethyst.models.data.CartRepository;
import org.launchcode.Amethyst.services.CartItemService;
import org.launchcode.Amethyst.services.CartService;
import org.launchcode.Amethyst.services.DonutService;
import org.launchcode.Amethyst.services.UserService;
import org.launchcode.Amethyst.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DonutService donutService;
    @Autowired
    private UserService userService;
    @Autowired
    private CartItemService cartItemService;

    @Override
    public CartDto createCart(CartDto cartDto) {
        Cart cart= toCart(cartDto);
        Cart savedCart = cartRepository.save(cart);
        return toDto(savedCart);
    }

    @Override
    public CartDto getCartById(int id) {
        Cart cart = cartRepository.findById(id).orElseThrow(() -> new RuntimeException("Cart does not exist"));
        return toDto(cart);
    }

    @Override
    public List<Cart> getAllCarts() {
        List<Cart> carts = new ArrayList<>();
        cartRepository.findAll().forEach(carts::add);
        return carts;
    }

    @Override
    public double getTotal(CartDto cartDto) {
        double total = 0; //initialize total to 0
        Cart cart = toCart(cartDto); //covert CartDto to Cart entity
        List<CartItem> cartItems = cart.getCartItems(); //grabs the list of CartItems from Cart
        for(CartItem cartItem: cartItems) { //loops over each cart item and calculates the line item total
            total += (cartItem.getDonut().getPrice() * cartItem.getQuantity()); //update total
        }
        return total;
    }

    @Override
    public int getTotalQuantity(CartDto cartDto) {
        int totalQuantity = 0; // Initialize total quantity to zero
        Cart cart = toCart(cartDto); // Convert CartDto to Cart object
        List<CartItem> cartItems = cart.getCartItems(); // Get list of cart items from Cart object

        // Iterate over each cart item and sum up the quantities
        for(CartItem cartItem: cartItems) {
            totalQuantity += cartItem.getQuantity(); // Add quantity of current item to total quantity
        }

        return totalQuantity; // Return the total quantity
    }

    @Override
    public CartDto emptyCart(CartDto cartDto) {
        Cart cart = toCart(cartDto); //convert CartDto to Cart entity
        List<CartItem> emptyCart = new ArrayList<>(); //initialize an empty list of CartItems
        cart.setCartItems(emptyCart); //set Cart List<CartItems> to the empty list
        cartRepository.save(cart); //save Cart entity
        return null;
    }

    @Override
    public List<CartItem> getCartItems(CartDto cartDto) {
        Cart cart = cartRepository.findById(cartDto.getId()).orElseThrow(() -> new RuntimeException("Cart does not exist"));
        return cart.getCartItems();
    }

    @Override
    public List<CartItem> lookForDonut(int donutId) {
        Donut donut = DonutMapper.mapToDonut(donutService.getDonutById(donutId)); //set Donut entity from donutId
        List<CartItem> donutsFound = new ArrayList<>(); //initialize an empty list of CartItems
        List<Cart> cartsToSearch = getAllCarts(); //grabs a list of all Cart entities
        for (Cart cart : cartsToSearch) { //loops over each Cart entity
            List<CartItem> cartItemList = cart.getCartItems(); //grabs the List<CartItem> from Cart
            for (CartItem cartItem : cartItemList) { //loops over the cartItemList
                if (cartItem.getDonut().getId() == donutId) { //check each CartItem for matching donutId
                    donutsFound.add(cartItem); //if matching add to donutsFound
                }
            }
        }
        return donutsFound;
    }

    @Override
    public void removeFromCart(List<CartItem> cartItemsToRemove) {
        List<CartItem> cartItems = cartItemsToRemove;
        for (CartItem cartItem : cartItems) { //loops over the list of cartItemsToRemove
            for (Cart cart : cartItem.getCarts()) { //grabs the Cart Entity that the CartItem is stored in
                cart.getCartItems().remove(cartItem); //removes CartItem from Cart Entity
            }
        }
    }

    @Override
    public void removeSingleItemFromCart(int cartItemId) {
        //Grabbing the CartItem entity by cartItemId
        CartItem cartItemToRemove = cartItemService.toCartItem(cartItemService.getCartItemById(cartItemId));
        List<Cart> cartList = getAllCarts(); //grab a list of all the Cart entities
        for (Cart cart : cartList) { //loop over Cart entities
            List<CartItem> cartItems = cart.getCartItems(); //Grab CartItem List from Cart entity
            for (CartItem cartItem : cartItems) { //loop over CartItem List
                if (cartItem.getId() == cartItemToRemove.getId()) { //checking for matching cartItemId from input
                    cart.getCartItems().remove(cartItem); //removes matching CartItem from list
                    cartRepository.save(cart); //saves Cart entity
                    //this return must be here if the Cart only has 1 CartItem
                    return; //once cartItems is empty, the for loop will try and run again
                    //this results in an error attempting to loop through the empty list.
                }
            }
        }
    }

    @Override
    public int getCartIdByUserId(int userId) {
        List<Cart> carts = new ArrayList<>(); //initialize an empty list of Cart entities
        cartRepository.findAll().forEach(carts::add); //populate list with all Cart entity records
        int cartId = 0; //initializing cartId
        for(Cart cart: carts){ //loops through list of all Cart entities
            if (cart.getUser().getId() == userId) { //if userId input equals the Cart entities' associated UserId
                return cartId = cart.getId(); //set cartId and end loop
            }
        }
        return cartId;
    }

    @Override
    public void deleteCartByUserId(int userId) {
        int cartId = getCartIdByUserId(userId);
        if (cartId != 0) {
            cartRepository.deleteById(cartId);
        }
    }

    //toDto converts a Cart entity to a CartDto
    CartDto toDto(Cart cart) {
        List<Integer> cartItemIds = cart.getCartItems().stream().map(CartItem::getId).toList();
        return new CartDto(cart.getId(), cart.getUser().getId(), cart.getTotal(), cartItemIds);
    }

    //toCart coverts a CartDto to a Cart entity
    Cart toCart(CartDto cartDto) {
        User user = UserMapper.mapToUser(userService.getUserById(cartDto.getUserId()));
        List<CartItem> cartItems = cartItemService.findByIds(cartDto.getCartItemIds());
        return new Cart(cartDto.getId(), user, cartDto.getTotal(), cartItems);
    }


}
