import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DoctorService } from 'src/app/Services/doctor.service';
import { UserService } from "src/app/Services/user.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLoginDoctor: FormGroup;
  recuperarContra: FormGroup;
  hideA=true;
  closeResult = '';

 constructor(private formBuilder: FormBuilder, private _router: Router,private modalService: NgbModal,  private doctorService: DoctorService) {
    this.formLoginDoctor = this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });


    this.recuperarContra= this.formBuilder.group({
      emailRecu: new FormControl('', [Validators.required, Validators.email])
    });
  }

 submitted: boolean = false;
  get formDoctor() {
    return this.formLoginDoctor.controls;
  }


  get recuContra() {
    return this.recuperarContra.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.formLoginDoctor.invalid) {
      return;
    }
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  logoutDoctor(){
    this._router.navigateByUrl('/doctor/login-doctor');
    this.doctorService.logoutDoctor();
  }

  logDoctor(){
    console.log(this.formLoginDoctor.value);
    const {email, password}= this.formLoginDoctor.value;
    this.doctorService.loginDoctor(email, password)
    .subscribe( resp =>{
      if(resp){
        this._router.navigateByUrl('/doctor/dashboard');
      }else{
        //mostrar mensaje de error
        this.sweetAlertLoginError();
      }
    });
  }



  recupContra(){
    if(!this.recuperarContra.valid){
      console.log('No se pudo enviar el email');
      return;
    }
    this.doctorService.restablecerContra(JSON.stringify(this.recuperarContra.value))
    .subscribe(
      data => {console.log(data); this._router.navigate(['/']); this.sweetAlertCorreo()},
      error => {console.log(error); this.sweetAlertCorreoError()}
      )
    }



    ngOnInit(): void {
    }


    sweetAlertSuccess() {
      Swal.fire('¡Muy Bien!', 'Has iniciado sesion satisfactiamente.', 'success');
    }

    sweetAlertLoginError() {
      Swal.fire('¡Upps!', 'Revisa que tu usuario y contraseña estén bien escritos.', 'error');
    }


    rContraFallido() {
      Swal.fire('¡Ups!', 'Ocurrió un error al actualizar tu contraseña', 'error');
    }

    rContraexitoso() {
      Swal.fire('¡Listo!', 'Revisa tu correo y sigue los pasos para reestablecer tu contraseña', 'success');
    }

    sweetAlertCorreo() {
      Swal.fire('¡Muy Bien!', 'Te hemos enviado un correo para restablecer tu contraseña', 'success');
    }

    sweetAlertCorreoError() {
      Swal.fire('¡Bien!', 'Correo enviado', 'success');
    }


}
