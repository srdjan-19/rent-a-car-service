package com.rentacar.service;

import com.rentacar.dto.request.CreateDiscountRequest;
import com.rentacar.dto.response.GetDiscountedVehicleResponse;
import com.rentacar.exception.BadRequestException;
import com.rentacar.exception.EntityNotFoundException;
import com.rentacar.model.Discount;
import com.rentacar.repository.DiscountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.util.List;
import java.util.UUID;

import static com.rentacar.converter.DiscountConverter.toDiscountFromRequest;
import static com.rentacar.utilities.Helpers.formatDate;

@Service
@RequiredArgsConstructor
public class DiscountService {

    private final DiscountRepository discountRepository;
    private final VehicleService vehicleService;

    @Transactional(rollbackFor = Exception.class)
    public Discount createVehicleDiscount(CreateDiscountRequest request) throws ParseException {
        if (request.getRate() > 100 || request.getRate() < 0)
            throw new BadRequestException("Rate must be in range from 0-100!");

        if (request.getStartDate().compareTo(request.getEndDate()) > 0)
            throw new BadRequestException("Start date must be before end date!");

        vehicleService.findById(request.getVehicleId());

        if (discountRepository.check(request.getVehicleId().toString(),  formatDate(request.getStartDate()), formatDate(request.getEndDate())).size() != 0)
            throw new BadRequestException("You already have been define discount for that period of time!");

        Discount discount = toDiscountFromRequest(request);
        discount.setVehicle(vehicleService.findById(request.getVehicleId()));

       return discountRepository.save(discount);
    }

    @Transactional(readOnly = true)
    public Discount findById(UUID discountId) {
        return discountRepository.findById(discountId).orElseThrow(() -> new EntityNotFoundException("Discount", discountId.toString()));
    }

    @Transactional(readOnly = true)
    public List<GetDiscountedVehicleResponse> findVehicles(String rentACarId, String startDate, String endDate) {
        return discountRepository.findVehicles(rentACarId, startDate, endDate);
    }

}
