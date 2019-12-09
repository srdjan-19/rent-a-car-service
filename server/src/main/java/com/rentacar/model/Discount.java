package com.rentacar.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

import static com.rentacar.utilities.ValidationConstraints.DISCOUNT_RATE_MAX;
import static com.rentacar.utilities.ValidationConstraints.DISCOUNT_RATE_MIN;


@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "discount")
@Where(clause = "is_deleted='false'")
public class Discount  extends  BaseEntity {

    @Column(name = "start_date")
    @NotNull
    private Date startDate;

    @Column(name = "end_date")
    @NotNull
    private Date endDate;

    @NotNull
    @JoinColumn(name = "vehicle_id")
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Vehicle vehicle;

    @Column(name = "rate")
    @Range(min = DISCOUNT_RATE_MIN, max = DISCOUNT_RATE_MAX)
    private Double rate;

}
