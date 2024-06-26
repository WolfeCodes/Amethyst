package org.launchcode.Amethyst.controllers;

import org.launchcode.Amethyst.dto.DonutDto;
import org.launchcode.Amethyst.entity.CartItem;
import org.launchcode.Amethyst.services.CartService;
import org.launchcode.Amethyst.services.DonutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/donuts")
public class DonutController {

    @Autowired
    private DonutService donutService;

    @Autowired
    private CartService cartService;


    //Create a donut
    @PostMapping("/")
    public ResponseEntity<DonutDto> addDonut(@RequestBody DonutDto donutDto) {
        DonutDto savedDonut = donutService.createDonut(donutDto);
        return new ResponseEntity<>(savedDonut, HttpStatus.CREATED);
    }

    //Get single donut by id
    @GetMapping("/{id}")
    public ResponseEntity<DonutDto> getDonutById(@PathVariable int id) {
        DonutDto donutDto = donutService.getDonutById(id);
        return ResponseEntity.ok(donutDto);
    }

    //Get all donuts or get the searched list by name
    @GetMapping("/")
    public ResponseEntity<List<DonutDto>> getAllDonuts(@RequestParam(required = false) String name) {
        List<DonutDto> donuts = donutService.getAllDonuts(name);
        return ResponseEntity.ok(donuts);
    }

    //Update Donut
    @PutMapping("/{id}")
    public ResponseEntity<DonutDto> updateDonuts(@PathVariable("id") int id, @RequestBody DonutDto updatedDonut) {
        DonutDto donutDto = donutService.updateDonut(id, updatedDonut);
        return ResponseEntity.ok(donutDto);
    }

    //DELETE Mapping to remove donut
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDonut(@PathVariable("id") int donutId) {
        //scan all carts for cartItems that match donutIds and return a list<CartItem>
        List<CartItem> donutsFound = cartService.lookForDonut(donutId);
        //loop through carts to compare for cartItems if cartItem in cart, remove from cart cartService
        cartService.removeFromCart(donutsFound);
        //delete the donut
        donutService.deleteDonutById(donutId);
        return ResponseEntity.ok("Donut Deleted");
    }

}
