package com.algostyle.shipment.shipment;

import com.algostyle.shipment.exception.ShipmentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service // Dit à Spring : "crée un objet ShipmentService et gère-le"
@AllArgsConstructor // Lombok crée automatiquement un constructeur avec tous les attributs final
public class ShipmentService {

    // C'est la dépendance dont ShipmentService a besoin.
    // Spring va chercher un objet ShipmentRepository et l'injecter ici.
    private final ShipmentRepository shipmentRepository;

    private final SimpMessagingTemplate simpMessagingTemplate; // déclare une dépendance SimpMessagingTemplate qui permet d’envoyer des messages WebSocket depuis ton application vers les clients connectés.

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
        return mapToResponseDto(shipment);
    }



    public List<ShipmentDTO.ShipmentResponse> getAllShipments(){
        List<Shipment> shipments = shipmentRepository.findAll();
        return shipments.stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }
    public ShipmentDTO.ShipmentResponse getShipmentById(Long id){
        Shipment shipment = shipmentRepository.findById(id)
                .orElseThrow(() -> new ShipmentNotFoundException(id ));
        return mapToResponseDto(shipment);
    }



    // === utilities function ===
    private ShipmentDTO.ShipmentResponse mapToResponseDto(Shipment shipment){
        return ShipmentDTO.ShipmentResponse.builder()
                .id(shipment.getId())
                .trackingNumber(shipment.getTrackingNumber())
                .origin(shipment.getOrigin())
                .destination(shipment.getDestination())
                .status(shipment.getStatus())
                .createdAt(shipment.getCreatedAt())
                .updatedAt(shipment.getUpdatedAt())
                .currentLocation(shipment.getCurrentLocation())
                .estimatedDelivery(shipment.getEstimatedDelivery())
                .build();
    }
    private String generateTrackingNumber(){
        return "TRK-" + UUID.randomUUID().toString().substring(0,8).toUpperCase();
    }

    public ShipmentDTO.ShipmentResponse getShipmentByTrackingNumber(String trackingNumber){
        Shipment shipment = shipmentRepository.findByTrackingNumber(trackingNumber)
                .orElseThrow( () -> new RuntimeException("Shipment not found with tracking number: "+trackingNumber) );
        return mapToResponseDto(shipment);
    }


    public ShipmentDTO.ShipmentResponse updateShipmentStatus(ShipmentDTO.UpdateStatusRequest request, Long id){
        Shipment shipment = shipmentRepository.findById(id).orElseThrow(()-> new RuntimeException("Shipment not found with id: "+id));
        shipment.setStatus(request.getStatus());
        if(request.getCurrentLocation()!=null){
            shipment.setCurrentLocation(request.getCurrentLocation());
        }
        shipment = shipmentRepository.save(shipment);
        return mapToResponseDto(shipment);
    }

}
