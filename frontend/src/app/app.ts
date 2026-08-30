import { Component, signal } from '@angular/core';
import { Shipments } from "./components/shipments/shipments";
import { CreateShipment } from "./components/create-shipment/create-shipment";
import { UpdateShipment } from "./components/update-shipment/update-shipment";

@Component({
  selector: 'app-root',
  imports: [Shipments, CreateShipment, UpdateShipment],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
