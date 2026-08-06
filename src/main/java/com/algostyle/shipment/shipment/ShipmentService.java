package com.algostyle.shipment.shipment;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service // Dit à Spring : "crée un objet ShipmentService et gère-le"
@AllArgsConstructor // Lombok crée automatiquement un constructeur avec tous les attributs final
public class ShipmentService {

    // C'est la dépendance dont ShipmentService a besoin.
    // Spring va chercher un objet ShipmentRepository et l'injecter ici.
    private final ShipmentRepository shipmentRepository;

    /**
     * === final ===
     * final → une fois que Spring lui donne une valeur, elle ne pourra plus être changée.
     * > Sans final : quelqu'un pourrait remplacer ton repository pendant l'exécution de ton programme.
     * > Avec final : La dépendance devient immuable.
     */

    public ShipmentDTO.ShipmentResponse createShipment(ShipmentDTO.CreateShipmentRequest request){
        String trackingNumber=generateTrackingNumber();
        Shipment shipment = Shipment.builder()
                .trackingNumber(trackingNumber)
                .origin(request.origin)
                .destination(request.destination)
                .estimatedDelivery(request.estimatedDelivery)
                .build();
        shipmentRepository.save(shipment);
        return shipment;
    }
    private String generateTrackingNumber(){
        return "TRK-" + UUID.randomUUID().toString().substring(0,8).toUpperCase();
    }
}
