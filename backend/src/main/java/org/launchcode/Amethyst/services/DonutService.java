package org.launchcode.Amethyst.services;

import org.launchcode.Amethyst.dto.DonutDto;

import java.util.List;


public interface DonutService {

    DonutDto createDonut(DonutDto donutDto);

    DonutDto getAccountById(int id);

    List<DonutDto> getAllDonuts();
}
