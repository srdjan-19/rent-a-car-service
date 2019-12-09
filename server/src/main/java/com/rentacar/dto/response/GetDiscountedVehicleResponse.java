package com.rentacar.dto.response;

import com.rentacar.model.Discount;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "discountedVehicles", types = {Discount.class})
public interface GetDiscountedVehicleResponse {

    @Value("#{target.discountId}")
    String getDiscountId();

    @Value("#{target.vehicleId}")
    String getVehicleId();

    @Value("#{target.brand}")
    String getBrand();

    @Value("#{target.model}")
    String getModel();

    @Value("#{target.numberOfSeats}")
    Integer getNumberOfSeats();

    @Value("#{target.yearOfProduction}")
    Integer getYearOfProduction();

    @Value("#{target.originalPrice}")
    Double getOriginalPrice();

    @Value("#{target.discounted}")
    Double getDiscounted();

    @Value("#{target.rating}")
    Double getRating();

    @Value("#{target.discountRate}")
    Double getDiscountRate();

    @Value("#{target.pickUpDate}")
    String getPickUpDate();

    @Value("#{target.dropOffDate}")
    String getDropOffDate();
}
