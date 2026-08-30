import { Component, signal } from '@angular/core';
import { Shipments } from "./components/shipments/shipments";
import { CreateShipment } from "./components/create-shipment/create-shipment";

@Component({
  selector: 'app-root',
  imports: [Shipments, CreateShipment],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
