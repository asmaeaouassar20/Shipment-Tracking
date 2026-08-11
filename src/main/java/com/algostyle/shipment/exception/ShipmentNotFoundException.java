package com.algostyle.shipment.exception;

public class ShipmentNotFoundException extends RuntimeException {
    public ShipmentNotFoundException(Long shipmentId){
        super("Shipment not found");
    }
}
