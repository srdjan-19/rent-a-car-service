package com.rentacar.dto.response;

import com.rentacar.model.VehicleReservation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name="rentACarVehicleIncome", types = {VehicleReservation.class})
public interface GetRentACarVehicleIncomeResponse {

    @Value("#{target.brand + ' ' + target.model}")
    String getVehicle();

    @Value("#{target.income}")
    Double getIncome();

}
