import { Component, signal } from '@angular/core';
import { Shipments } from "./components/shipments/shipments";
import { CreateShipment } from "./components/create-shipment/create-shipment";
import { UpdateShipment } from "./components/update-shipment/update-shipment";
import { Header } from "./components/header/header";
import { Notification } from "./components/notification/notification";

@Component({
  selector: 'app-root',
  imports: [Shipments, CreateShipment, UpdateShipment, Header, Notification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
