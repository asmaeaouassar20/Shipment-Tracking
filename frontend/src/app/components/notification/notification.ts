import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { WebsocketService } from '../../services/websocket-service';
import { StatusUpdateMessage } from '../../models/shipment.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class Notification implements OnInit {
  private destroyRef = inject(DestroyRef);
  private websocketService =inject(WebsocketService);
  notifications = signal<StatusUpdateMessage[]>([])

  ngOnInit(): void {
    this.handleUpdate();
  }
  private handleUpdate() : void{
    this.websocketService
    .getStatusUpdates()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe( (update) => {
      if(update){
        this.notifications.update( notifications => [update, ...notifications])
      }
    })
  }
}
