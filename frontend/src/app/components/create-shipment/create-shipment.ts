import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShipmentService } from '../../services/shipment-service';
import { CreateShipmentRequest } from '../../models/shipment.model';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-create-shipment',
  imports: [ReactiveFormsModule],
  templateUrl: './create-shipment.html',
  styleUrl: './create-shipment.css',
})
export class CreateShipment {
  private shipmentService = inject(ShipmentService);
  private fb = inject(FormBuilder);
  isSubmitting = signal(false);

  shipmentForm : FormGroup = this.fb.group({
    origin : ['',[Validators.required, Validators.minLength(2)]],
    destination : ['', [Validators.required, Validators.minLength(2)]],
    estimatedDelivery : []
  })

  createShipment() : void {
    if(this.shipmentForm.invalid || this.isSubmitting()){
      this.shipmentForm.markAllAsTouched(); //sert à indiquer à Angular que tous les champs du formulaire ont été visités/interagis, même si l'utilisateur ne les a pas encore touchés.
      return;
    }
    this.isSubmitting.set(true);
    const shipment : CreateShipmentRequest = this.shipmentForm.value;
    this.shipmentService.createShipment(shipment)
    .pipe(catchError(()=>{
      this.isSubmitting.set(false);
      return of(null)
    }))
    .subscribe( () => {
      this.shipmentForm.reset();
      this.isSubmitting.set(false);
    });
  }
  hasErrorField(fieldName:string) : boolean{
    const field = this.shipmentForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }
  getErrorMessage(fieldName:string) : string{
    const field = this.shipmentForm.get(fieldName);
    if(field?.hasError('required')){
      return 'This field is required';
    }
    if(field?.hasError('minlength')){
      return 'Please enter at least 2 characters';
    }
    return '';
  }
}
