package com.rentacar.converter;

import com.rentacar.dto.request.CreateRatingRequest;
import com.rentacar.model.Rating;
import org.springframework.stereotype.Component;

@Component
public class RatingConverter {

    public static Rating toRatingFromCreateRequest(CreateRatingRequest request) {
        return Rating
                .builder()
                .mark(request.getMark())
                .build();
    }

}
