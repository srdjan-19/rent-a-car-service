package com.rentacar.model;

import com.rentacar.exception.BadRequestException;
import com.rentacar.model.enumeration.VehicleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.util.List;

import static com.rentacar.utilities.ValidationConstraints.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "vehicle")
@Where(clause = "is_deleted='false'")
public class Vehicle extends BaseEntity {

    @NotBlank
    @Size(max = VEHICLE_BRAND_SIZE)
    private String brand;

    @NotBlank
    @Size(max = VEHICLE_MODEL_SIZE)
    private String model;

    @NotNull
    @Enumerated(EnumType.STRING)
    private VehicleType type;

    @NotNull
    @JoinColumn(name = "rent_a_car_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private RentACar rentACar;

    @NotNull
    @Range(min = 1)
    private Integer numberOfPeople;

    @NotNull
    @Range(min = 0)
    private Double pricePerDay;

    @NotNull
    @Range(min = 0)
    private Integer yearOfProduction;

    @Range(min = 0, max = MAX_RATING)
    private Double rating;

    @Version
    private Integer version;
}
