package com.algostyle.shipment.shipment;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<List<ShipmentDTO.ShipmentResponse>> getAllShipments(){
        var shipments = shipmentService.getAllShipments();
        return ResponseEntity.status(HttpStatus.OK).body(shipments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShipmentDTO.ShipmentResponse> getShipmentById(@PathVariable Long id){
        ShipmentDTO.ShipmentResponse shipment = shipmentService.getShipmentById(id);
        return ResponseEntity.status(HttpStatus.OK).body(shipment);
    }

    @GetMapping("/track/{trackingNumber}")
    public  ResponseEntity<?> getShipmentByTrackingNumber(@PathVariable String trackingNumber){
        ShipmentDTO.ShipmentResponse shipment = shipmentService.getShipmentByTrackingNumber(trackingNumber);
        return ResponseEntity.status(HttpStatus.OK).body(shipment);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateShipmentStatus(
            @PathVariable Long id,
            @Valid @RequestBody ShipmentDTO.UpdateStatusRequest request
    ){
        ShipmentDTO.ShipmentResponse shipmentResponse = shipmentService.updateShipmentStatus(request,id);
        return ResponseEntity.status(HttpStatus.OK).body(shipmentResponse);
    }
}
