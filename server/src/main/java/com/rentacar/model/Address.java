package com.rentacar.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Range;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.UUID;

import static com.rentacar.utilities.ValidationConstraints.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "address")
@Where(clause = "is_deleted='false'")
public class Address extends BaseEntity  {

    @NotBlank
    @Size(max = CITY_SIZE)
    private String city;

    @NotBlank
    @Size(max = STATE_SIZE)
    private String state;

    @NotBlank
    @Size(max = STREET_SIZE)
    private String street;

    @NotNull
    @Range(min=0, max=180)
    private Double longitude;

    @NotNull
    @Range(min=0 , max=90)
    private Double latitude;
}
