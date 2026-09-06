import {HttpClient} from '@angular/common/http';
import { Injectable,inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CreateShipmentRequest, Shipment, UpdateStatusRequest } from '../models/shipment.model';


@Injectable({
  providedIn: 'root',
})
export class ShipmentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/shipments';

  shipments = signal<Shipment[]>([]); //liste de shipments partagée par toutel'application

  createShipment(request : CreateShipmentRequest) : Observable<Shipment>{
    return this.http.post<Shipment>(this.apiUrl , request);
  }
  getAllShipments(): Observable<Shipment[]> {
  return this.http.get<Shipment[]>(this.apiUrl).pipe(
    tap(shipments => {
      this.shipments.set(shipments);
    })
  );
}

  getShipmentById(id:number) : Observable<Shipment[]>{
    return this.http.get<Shipment[]>(`${this.apiUrl}/${id}`);
  }
  getShipmentByTrackingNumber(trackingNumber:string) : Observable<Shipment>{
    return this.http.get<Shipment>(`${this.apiUrl}/track/${trackingNumber}`);
  }
  updateShipment(id:number, request:UpdateStatusRequest) : Observable<Shipment>{
    return this.http.patch<Shipment>(`${this.apiUrl}/${id}/status` , request);
  }
}
