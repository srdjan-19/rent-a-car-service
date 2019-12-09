package com.rentacar.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.function.Supplier;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class EntityNotFoundException extends RuntimeException  {

    public EntityNotFoundException(String entity, String id) {
        super(entity + " with id '" +  id + "'does not exist!");
    }
}
