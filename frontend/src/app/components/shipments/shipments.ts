import { Component, inject , OnInit, signal } from '@angular/core';
import { ShipmentService } from '../../services/shipment-service';
import { Shipment, SHIPMENT_STATUS, ShipmentStatus, STATUS_LABELS } from '../../models/shipment.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-shipments',
  imports: [DatePipe],
  templateUrl: './shipments.html',
  styleUrl: './shipments.css',
})
export class Shipments implements OnInit {    
    private shipmentService = inject(ShipmentService);
    shipments = signal<Shipment[]>([]);
    STATUS_LABELS = STATUS_LABELS;
    
    ngOnInit() :  void{
      this.loadShipments();
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
