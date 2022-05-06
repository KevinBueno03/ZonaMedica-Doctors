import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

   closeResult = '';
  EditarPerfil: FormGroup;
  //formLoginDoctor: FormGroup;
  hideP=true;
  isVisible: any;
  isSelected: boolean = true;
  public isCollapsedD = true;
  public isCollapsedP = true;
  submittedPaciente: boolean=false;
  submitted: boolean = false;
  hide=true;
  hideC=true;

    constructor(private formBuilder: FormBuilder) {
      this.EditarPerfil = this.formBuilder.group({
        department: new FormControl('', Validators.required),
        email: new FormControl('',[Validators.required, Validators.email]),
        terminos: new FormControl('', Validators.required),
        politicas: new FormControl('',Validators.required),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('',Validators.required),
        phone: new FormControl('',Validators.required),
        medAppointment_modality_inHouse: new FormControl(false),
        medAppointment_modality_inClinic: new FormControl(false),
        medAppointment_modality_online: new FormControl(false),
        master_degree: new FormControl('', Validators.required),
        bibliography: new FormControl('', Validators.required)
      }, {
        validators: this.MustMatch('password', 'confirmPassword')
      });
    }


get formularioDoctor() {
  return this.EditarPerfil.controls;
}

MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    } if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
onSubmit() {
  this.submittedPaciente=true;
  if (this.EditarPerfil.invalid) {
    return;
  }
}
guardarCambios(){
}

//INICIO ALERTAS

sweetAlertSuccess() {
  Swal.fire('Cambios guardados', 'Se ha actualizado correctamente tu información', 'success');
}

sweetAlertError() {
  Swal.fire('¡Upps!', 'Algo no ha salido como lo esperabamos.', 'error');
}
  ngOnInit(): void {
  }

}
