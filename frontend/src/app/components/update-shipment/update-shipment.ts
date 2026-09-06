import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Shipment, SHIPMENT_STATUS, STATUS_LABELS } from '../../models/shipment.model';
import { ShipmentService } from '../../services/shipment-service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-update-shipment',
  imports: [ReactiveFormsModule],
  templateUrl: './update-shipment.html',
  styleUrl: './update-shipment.css',
})
export class UpdateShipment implements OnInit {

  private fb = inject(FormBuilder);
  private shipmentService = inject(ShipmentService);

  shipments = this.shipmentService.shipments;
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  Status_LABELS = STATUS_LABELS;
  statusOptions = Object.values(SHIPMENT_STATUS);
  updateForm : FormGroup = this.fb.group({
    shipmentId : [null, Validators.required],
    status : [SHIPMENT_STATUS.PROCESSING, Validators.required],
    currentLocation : ['']
  });


  ngOnInit(): void {
    this.loadShipments();
  }

  loadShipments() : void{
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.shipmentService.getAllShipments()
    .pipe(catchError( (error)=> {
      this.errorMessage.set("Failed to load shipements")
      console.error(error);
      return of([])
    }))
    .subscribe(
      (shipments) => {
        this.isLoading.set(false);
      }
    )
  }


  updateShipment() : void {
    if(this.updateForm.invalid || this.isSubmitting()){
      this.updateForm.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    this.errorMessage.set('');

    const {shipmentId, status, currentLocation} = this.updateForm.value;    
    this.shipmentService.updateShipment(shipmentId, {status,currentLocation})
    .pipe(
      catchError( (error) => {
        this.errorMessage.set('Failed to load shipments');
        console.error('error : ',error);
        return of(null);
      })
    ).subscribe( (result) => {
      if(result !== null){
        this.updateForm.reset({
          shipmentId : null,
          status : SHIPMENT_STATUS.PROCESSING,
          currentLocation : ''
        })
      }
    });
    this.isSubmitting.set(false);
  }
  onSelectShipmentId() : void {
    const shipmentId = this.updateForm.get("shipmentId")?.value;   
    if(!shipmentId) return;
    const selectedShipment = this.shipments().find( sh => sh.id === shipmentId);    
    if(selectedShipment){
      this.updateForm.patchValue(
        {
          currentLocation : selectedShipment.currentLocation || ''
        }
      )
    }
  }

  fieldHasError(fieldName : string) : boolean {
    const field = this.updateForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }
  getErrorMessage(fieldName : string) : string {
    const field = this.updateForm.get(fieldName);
    if(field?.hasError('required')){
      return 'This field is required';
    }   
    return '';
  }
}
