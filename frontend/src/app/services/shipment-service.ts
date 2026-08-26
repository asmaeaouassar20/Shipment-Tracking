import {HttpClient} from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateShipmentRequest, Shipment, UpdateStatusRequest } from '../models/shipment.model';


@Injectable({
  providedIn: 'root',
})
export class ShipmentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/shipments';

  createShipment(request : CreateShipmentRequest) : Observable<Shipment>{
    return this.http.post<Shipment>(this.apiUrl , request);
  }
  getAllShipments() : Observable<Shipment[]>{
    return this.http.get<Shipment[]>(this.apiUrl);
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
