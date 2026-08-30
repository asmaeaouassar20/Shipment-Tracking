import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { WebsocketService } from '../../services/websocket-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private webSocketService = inject(WebsocketService);
  private destroyRef = inject(DestroyRef);
  title = 'Shipment Tracker';
  isConnected = signal<boolean>(false);

  ngOnInit() : void{
    this.webSocketService
    .isConnected()
    .pipe(takeUntilDestroyed(this.destroyRef)) // clean up automatic
    .subscribe( (connected) => this.isConnected.set(connected) )
    ;
  }
}
