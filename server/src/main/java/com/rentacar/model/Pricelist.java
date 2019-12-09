package com.rentacar.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "pricelist")
@Where(clause = "is_deleted='false'")
public class Pricelist extends BaseEntity {

    @Column(name = "start_date")
    @NotNull
    private Date startDate;

    @Column(name = "end_date")
    @NotNull
    private Date endDate;

    @NotNull
    @ManyToOne
    private Vehicle vehicle;

}
