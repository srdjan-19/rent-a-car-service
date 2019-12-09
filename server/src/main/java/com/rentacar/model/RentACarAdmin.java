package com.rentacar.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "is_deleted='false'")
public class RentACarAdmin extends User {

    @NotNull
    private boolean notFirstLogin;

}
