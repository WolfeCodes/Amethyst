package org.launchcode.Amethyst.services.impl;

import org.launchcode.Amethyst.dto.DonutDto;
import org.launchcode.Amethyst.entity.Donut;
import org.launchcode.Amethyst.mapper.DonutMapper;
import org.launchcode.Amethyst.models.data.DonutRepository;
import org.launchcode.Amethyst.services.DonutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DonutServiceImpl implements DonutService {

    @Autowired
    private DonutRepository donutRepository;

//    @Autowired
//    public DonutServiceImpl(DonutRepository donutRepository) {
//        this.donutRepository = donutRepository;
//    }

    @Override
    public DonutDto createDonut(DonutDto donutDto) {
        Donut donut = DonutMapper.mapToDonut(donutDto);
        Donut savedDonut = donutRepository.save(donut);
        return DonutMapper.mapToDonutDto(savedDonut);
    }

    @Override
    public DonutDto getAccountById(int id) {
        Donut donut = donutRepository.findById(id).orElseThrow(() -> new RuntimeException("Donut does not exist"));
        return DonutMapper.mapToDonutDto(donut);
    }

    @Override
    public List<DonutDto> getAllDonuts() {
        List<Donut> donuts = new ArrayList<>();
        donutRepository.findAll().forEach(donuts::add);
        return donuts.stream().map(DonutMapper::mapToDonutDto).collect(Collectors.toList());
    }
}
