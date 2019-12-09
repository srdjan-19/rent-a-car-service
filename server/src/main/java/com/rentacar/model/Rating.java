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
import java.util.UUID;

import static com.rentacar.utilities.ValidationConstraints.RATING_MARK_MAX;
import static com.rentacar.utilities.ValidationConstraints.RATING_MARK_MIN;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "rating")
@Where(clause = "is_deleted='false'")
public class Rating extends BaseEntity{

    @JoinColumn(name = "vehicle_id")
    @ManyToOne
    private Vehicle vehicle;

    @JoinColumn(name = "rent_a_car_id")
    @ManyToOne
    private RentACar rentACar;

    @NotNull
    @JoinColumn(name = "user_id")
    @ManyToOne
    private User user;

    @NotNull
    @Range(min = RATING_MARK_MIN, max = RATING_MARK_MAX)
    private Integer mark;

}
