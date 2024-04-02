package org.launchcode.Amethyst.mapper;

import org.launchcode.Amethyst.dto.DonutDto;
import org.launchcode.Amethyst.entity.Donut;

import java.time.LocalDateTime;

public class DonutMapper {

    public static Donut mapToDonut(DonutDto donutDto){
        Donut donut = new Donut(
                donutDto.getId(),
                donutDto.getName(),
                donutDto.getPrice(),
                donutDto.getDescription(),
                donutDto.getImageUrl(),
                donutDto.getRating(),
                donutDto.getCreateTime()
        );
        return donut;
    }

    public static DonutDto mapToDonutDto(Donut donut){
        DonutDto donutDto = new DonutDto(
                donut.getId(),
                donut.getName(),
                donut.getPrice(),
                donut.getDescription(),
                donut.getImageUrl(),
                donut.getRating(),
                donut.getCreateTime()
        );

        return donutDto;
    }
}
