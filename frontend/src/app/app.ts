import { Component, signal } from '@angular/core';
import { Shipments } from "./components/shipments/shipments";

@Component({
  selector: 'app-root',
  imports: [ Shipments],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
