package org.launchcode.Amethyst.services;

import org.launchcode.Amethyst.dto.DonutDto;
import org.launchcode.Amethyst.entity.Donut;

import java.util.List;


public interface DonutService {

    DonutDto createDonut(DonutDto donutDto);

    DonutDto getDonutById(int id);

    List<DonutDto> getAllDonuts();

    List<Donut> findByIds(List<Integer> donutIds);

    void deleteDonutById(int id);
}
