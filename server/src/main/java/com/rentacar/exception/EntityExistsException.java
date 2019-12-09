package com.rentacar.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class EntityExistsException extends RuntimeException {

    public EntityExistsException(String entity, String property) {
        super(entity + " with " + property + " already exists!");
    }
}
