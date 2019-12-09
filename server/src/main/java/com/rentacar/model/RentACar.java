package com.rentacar.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.util.List;

import static com.rentacar.utilities.ValidationConstraints.*;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "rent_a_car")
@Where(clause = "is_deleted='false'")
public class RentACar extends BaseEntity {

    @NotBlank
    @Size(max = NAME_SIZE)
    private String name;

    @NotBlank
    @Size(max = DESCRIPTION_SIZE)
    private String description;

    @NotNull
    @JoinColumn(name = "address_id")
    @OneToOne(fetch = FetchType.LAZY)
    private Address address;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "rentACar")
    private List<Vehicle> vehicles;

    @Range(min = 0, max = MAX_RATING)
    private Double rating;

    @NotNull
    @OneToOne
    private RentACarAdmin owner;

    @Version
    private Integer version;

}

