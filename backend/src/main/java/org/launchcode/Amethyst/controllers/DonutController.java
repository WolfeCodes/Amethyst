package org.launchcode.Amethyst.controllers;

import org.launchcode.Amethyst.dto.DonutDto;
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


    //Build Add Employee REST API
    @PostMapping("/")
    public ResponseEntity<DonutDto> addDonut(@RequestBody DonutDto donutDto) {
        DonutDto savedDonut = donutService.createDonut(donutDto);
        return new ResponseEntity<>(savedDonut, HttpStatus.CREATED);
    }

    //Build Get Employee REST API
    @GetMapping("/{id}")
    public ResponseEntity<DonutDto> getDonutById(@PathVariable int id) {
        DonutDto donutDto = donutService.getDonutById(id);
        return ResponseEntity.ok(donutDto);
    }

    //Build Get All Employee REST API
    @GetMapping("/")
    public ResponseEntity<List<DonutDto>> getAllDonuts() {
        List<DonutDto> donuts = donutService.getAllDonuts();
        return ResponseEntity.ok(donuts);
    }


    //Build Update Employee REST API
    @PutMapping("/{id}")
    public ResponseEntity<DonutDto> updateDonuts(@PathVariable("id") int id, @RequestBody DonutDto updatedDonut) {
        DonutDto donutDto = donutService.updateDonut(id, updatedDonut);
        return ResponseEntity.ok(donutDto);
    }

    //DELETE Mapping to remove donut
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDonut(@PathVariable("id") int donutId) {
        donutService.deleteDonutById(donutId);
        return ResponseEntity.ok("Donut Deleted");
    }

}
