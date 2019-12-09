package com.rentacar.converter;

import com.rentacar.dto.request.CreateDiscountRequest;
import com.rentacar.model.Discount;
import org.springframework.stereotype.Component;

@Component
public class DiscountConverter {

    public static Discount toDiscountFromRequest(CreateDiscountRequest request) {
        return Discount
                .builder()
                .rate(request.getRate())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();
    }

}
