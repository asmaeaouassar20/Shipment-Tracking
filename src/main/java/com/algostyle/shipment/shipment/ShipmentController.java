package com.algostyle.shipment.shipment;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shipments")
@RequiredArgsConstructor
public class ShipmentController {
    private final ShipmentService shipmentService;

    @PostMapping
    public ResponseEntity<ShipmentDTO.ShipmentResponse> createShipment(@Valid @RequestBody ShipmentDTO.CreateShipmentRequest request){
        var shipment=shipmentService.createShipment(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(shipment);
    }

    @GetMapping

}
