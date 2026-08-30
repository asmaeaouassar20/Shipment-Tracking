import { Component, DestroyRef, inject , OnInit, signal } from '@angular/core';
import { ShipmentService } from '../../services/shipment-service';
import { Shipment, SHIPMENT_STATUS, ShipmentStatus, STATUS_LABELS, StatusUpdateMessage } from '../../models/shipment.model';
import { DatePipe } from '@angular/common';
import { WebsocketService } from '../../services/websocket-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-shipments',
  imports: [DatePipe],
  templateUrl: './shipments.html',
  styleUrl: './shipments.css',
})
export class Shipments implements OnInit {   
  private destroyRef = inject(DestroyRef); 
    private shipmentService = inject(ShipmentService);
    private websocketService = inject(WebsocketService);
    shipments = signal<Shipment[]>([]);
    STATUS_LABELS = STATUS_LABELS;
    
    ngOnInit() :  void{
      this.loadShipments();   
      this.connectWebSocket();  
      this.handleUpdate(); 
    }
    private connectWebSocket() : void{
      this.websocketService.connect();    
    }
    private handleUpdate() : void{
      this.websocketService.getStatusUpdates()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe( (update) => {
        if(update){
          this.handleStatuseUpdate(update)
        }
      } )
    }
    private handleStatuseUpdate(update: StatusUpdateMessage) : void{
      this.shipments.update( shipments => {
        const updatedShipment = shipments.find( shipment => shipment.id === update.shipmentId);
        if(!updatedShipment){
          return shipments;
        }
        const updatedShipments = shipments.map( shipment => {
          if(shipment.id !== updatedShipment.id) return shipment;
          return {
            ...shipment,
            status : update.status,
            currentLocation : update.currentLocation,
            updatedAt : update.timestamp
          }
        })
        return updatedShipments;
      })
    }
    loadShipments() : void{
      this.shipmentService.getAllShipments().subscribe( (shipments) => {
        this.shipments.set(shipments);
      });
    }


    // TODO : color for every status
    /*
    readonly STATUS_BADGE_CLASS_MAP : Record<ShipmentStatus,string> = {
      [SHIPMENT_STATUS.ORDER_PLACED] : 'une classe  css'
      .
      .
      .
      .
    }
      

    // TODO mapin status to its css class
    getStatusBadge(status : ShipmentStatus) : string{
      return STATUS_BADGE_CLASS_MAP[status];
    }
      */
}
