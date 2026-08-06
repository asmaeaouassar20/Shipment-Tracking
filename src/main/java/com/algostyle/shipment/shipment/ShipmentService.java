package com.algostyle.shipment.shipment;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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

    public Shipment createShipment(){
        Shipment shipment = Shipment.builder()
                .trackingNumber("TRACK123456")
                .origin("New York")
                .destination("Los Angeles")
                .build();
        shipmentRepository.save(shipment);
        return shipment;
    }
}
