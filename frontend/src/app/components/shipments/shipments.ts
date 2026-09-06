import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ShipmentService } from '../../services/shipment/shipment-service';
import { STATUS_LABELS, StatusUpdateMessage } from '../../models/shipment.model';
import { DatePipe } from '@angular/common';
import { WebsocketService } from '../../services/websocket/websocket-service';
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
  shipments = this.shipmentService.shipments;

  STATUS_LABELS = STATUS_LABELS;

  ngOnInit(): void {
    this.loadShipments();
    this.connectWebSocket();
    this.handleUpdate();

  }
  private connectWebSocket(): void {
    this.websocketService.connect();
  }
  private handleUpdate(): void {
    this.websocketService.getStatusUpdates()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((update) => {
        if (update) {
          this.handleStatusUpdate(update)
        }
      })
  }


  private handleStatusUpdate(update: StatusUpdateMessage): void {
    const shipmentExists = this.shipments().some(
      shipment => shipment.id === update.shipmentId
    );

    // CREATE
    if (!shipmentExists) {
      this.loadShipments();
      return;
    }

    // UPDATE
    this.shipments.update(shipments =>
      shipments.map(shipment => {
        if (shipment.id !== update.shipmentId) {
          return shipment;
        }

        return {
          ...shipment,
          status: update.status,
          currentLocation: update.currentLocation,
          updatedAt: update.timestamp
        };
      })
    );
    ;
  }


  loadShipments(): void {
    this.shipmentService.getAllShipments().subscribe((shipments) => {
      this.shipmentService.getAllShipments().subscribe();
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
