import { Component, inject , OnInit, signal } from '@angular/core';
import { ShipmentService } from '../../services/shipment-service';
import { Shipment } from '../../models/shipment.model';

@Component({
  selector: 'app-shipments',
  imports: [],
  templateUrl: './shipments.html',
  styleUrl: './shipments.css',
})
export class Shipments implements OnInit {    
    private shipmentService = inject(ShipmentService);
    shipments = signal<Shipment[]>([]);
    
    ngOnInit() :  void{
      this.loadShipments();
    }
    loadShipments() : void{
      this.shipmentService.getAllShipments().subscribe( (shipments) => {
        this.shipments.set(shipments);
      });
    }
}
