package org.launchcode.Amethyst.services;

import org.launchcode.Amethyst.dto.DonutDto;


public interface DonutService {

    DonutDto createDonut(DonutDto donutDto);

    DonutDto getAccountById(int id);
}
