import { Component, inject , OnInit, signal } from '@angular/core';
import { ShipmentService } from '../../services/shipment-service';
import { Shipment, STATUS_LABELS } from '../../models/shipment.model';
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
}
