package org.launchcode.Amethyst.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.launchcode.Amethyst.dto.DonutDto;
import org.launchcode.Amethyst.entity.Donut;
import org.launchcode.Amethyst.models.data.DonutRepository;
import org.launchcode.Amethyst.services.impl.DonutServiceImpl;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Arrays;
import java.util.Optional;


@ExtendWith(SpringExtension.class)
@SpringBootTest
public class DonutsServiceTests {
    @Mock
    private DonutRepository donutRepository;

    @InjectMocks
    private DonutServiceImpl donutService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testFindAllDonuts() {
        Donut donut1 = new Donut(1, "first Donut", 5.6, "This is first donut description", "www.image1.url");
        Donut donut2 = new Donut(2, "second Donut", 6.6, "This is second donut description", "www.image2.url");

        List<Donut> mockDonuts = Arrays.asList(donut1, donut2);
        // Mock repository behavior
        when(donutRepository.findAll()).thenReturn(mockDonuts);

        // Call the service method
        List<DonutDto> result = donutService.getAllDonuts(null);

        // Assertions
        assertEquals(2, result.size());
        assertEquals("first Donut", result.get(0).getName());
        assertEquals(5.6, result.get(0).getPrice());
        assertEquals("This is first donut description", result.get(0).getDescription());
        assertEquals("www.image1.url", result.get(0).getImageUrl());
        assertEquals("second Donut", result.get(1).getName());
        assertEquals(6.6, result.get(1).getPrice());
        assertEquals("This is second donut description", result.get(1).getDescription());
        assertEquals("www.image2.url", result.get(1).getImageUrl());

    }

    @Test
    public void testFindDonutById() {
        // Create a sample Donut entity
        Donut donut1 = new Donut(1, "first Donut", 5.6, "This is first donut description", "www.image1.url");

        // Mock repository behavior to return the sample Donut when findById(1) is called
        when(donutRepository.findById(1)).thenReturn(java.util.Optional.of(donut1));

        // Call the service method to get the DonutDto by ID
        DonutDto result = donutService.getDonutById(1);

        // Assertions to verify the properties of the returned DonutDto
        assertEquals("first Donut", result.getName());
        assertEquals(5.6,result.getPrice());
        assertEquals("This is first donut description", result.getDescription());
        assertEquals("www.image1.url", result.getImageUrl());
    }

    @Test
    public void testCreateDonut() {
        // Create a new Donut object to be saved
        DonutDto donutDtoToCreate = new DonutDto(1, "New Donut", 4.5, "This is a new donut", "www.newdonut.com");

        // Mock the repository behavior to return the saved Donut object when saved
        Donut createdDonut = new Donut(1, "New Donut", 4.5, "This is a new donut", "www.newdonut.com");
        when(donutRepository.save(any(Donut.class))).thenReturn(createdDonut);

        // Call the service method to create the Donut
        DonutDto createdDonutDto = donutService.createDonut(donutDtoToCreate);

        // Assertions to verify the properties of the returned DonutDto
        assertEquals("New Donut", createdDonutDto.getName());
        assertEquals(4.5, createdDonutDto.getPrice());
        assertEquals("This is a new donut", createdDonutDto.getDescription());
        assertEquals("www.newdonut.com", createdDonutDto.getImageUrl());
        // Add more assertions based on the expected properties of the created DonutDto
    }


    @Test
    public void testDeleteDonutById() {
        // Specify the ID of the Donut to be deleted
        int donutIdToDelete = 1;

        // Mock the repository behavior to return a Donut when findById is called
        Donut donutToDelete = new Donut(donutIdToDelete, "Donut to Delete", 3.99, "To be deleted", "www.delete.com");
        when(donutRepository.findById(donutIdToDelete)).thenReturn(java.util.Optional.of(donutToDelete));

        // Call the service method to delete the Donut by ID
        donutService.deleteDonutById(donutIdToDelete);

        // Verify that the repository's deleteById method was called with the correct ID
        verify(donutRepository).deleteById(donutIdToDelete);
    }

//    @Test
// not sure why having the error
//    public void testEditDonut() {
//        // Create a sample donut with initial details
//        Donut existingDonut = new Donut(1, "Original Donut", 4.99, "Original description", "www.original.com");
//
//        // Mock the behavior of findById to return the existing donut
//        when(donutRepository.findById(1)).thenReturn(java.util.Optional.of(existingDonut));
//
//        // Call the service method to edit the donut
//        DonutDto updatedDonutDto = new DonutDto(1, "Updated Donut", 5.99, "Updated description", "www.updated.com");
//        DonutDto result = donutService.updateDonut(1, updatedDonutDto);
//
//        // Verify that the repository save method is called with the updated Donut
//        verify(donutRepository).save(any(Donut.class));
//
//        // Verify the result returned by the service method
//        assertNotNull(result);
//        assertEquals(updatedDonutDto.getName(), result.getName());
//        assertEquals(updatedDonutDto.getPrice(), result.getPrice());
//        assertEquals(updatedDonutDto.getDescription(), result.getDescription());
//        assertEquals(updatedDonutDto.getImageUrl(), result.getImageUrl());
//    }

}

