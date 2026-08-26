import { Component, inject , OnInit } from '@angular/core';
import { ShipmentService } from '../../services/shipment-service';

@Component({
  selector: 'app-shipments',
  imports: [],
  templateUrl: './shipments.html',
  styleUrl: './shipments.css',
})
export class Shipments implements OnInit {
    ngOnInit(): void {
      throw new Error('Method not implemented.');
    }
    private shipmentService = inject(ShipmentService);
    
    ngOnInt() :  void{
      console.log('RUNNING...');
    }
}
