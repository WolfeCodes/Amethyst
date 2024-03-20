package org.launchcode.Amethyst.controllers;

import org.launchcode.Amethyst.dto.DonutDto;
import org.launchcode.Amethyst.services.DonutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/donuts")
public class DonutController {

    @Autowired
    private DonutService donutService;

    @PostMapping
    public ResponseEntity<DonutDto> addDonut(@RequestBody DonutDto donutDto){
        return new ResponseEntity<>(donutService.createDonut(donutDto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonutDto> getAccountById(@PathVariable int id){
        DonutDto donutDto = donutService.getAccountById(id);
        return ResponseEntity.ok(donutDto);
    }
}
