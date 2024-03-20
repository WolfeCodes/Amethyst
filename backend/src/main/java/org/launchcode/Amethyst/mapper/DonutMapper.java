package org.launchcode.Amethyst.mapper;

import org.launchcode.Amethyst.dto.DonutDto;
import org.launchcode.Amethyst.entity.Donut;

public class DonutMapper {

    public static Donut mapToDonut(DonutDto donutDto){
        Donut donut = new Donut(
                donutDto.getId(),
                donutDto.getName(),
                donutDto.getPrice()
        );

        return donut;
    }

    public static DonutDto mapToDonutDto(Donut donut){
        DonutDto donutDto = new DonutDto(
                donut.getId(),
                donut.getName(),
                donut.getPrice()
        );

        return donutDto;
    }
}
