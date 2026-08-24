package com.algostyle.shipment.exception;

public record ErrorResponse(
        String code,
        String message
){}
