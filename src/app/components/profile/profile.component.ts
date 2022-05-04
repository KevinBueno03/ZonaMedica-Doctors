import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DoctorInfo } from 'src/app/interfaces/doctor.interfaces';
import { DoctorService } from 'src/app/Services/doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  doctoresData: DoctorInfo[]=[];
  closeResult = '';
  body={}
  //biography: FormGroup;
  formLoginAdmin: FormGroup;

  constructor(private doctorService: DoctorService, private modalService: NgbModal, private _router: Router, private formBuilder: FormBuilder) {
    this.formLoginAdmin = this.formBuilder.group({
      bibliography: new FormControl('',Validators.required)
    });
   }

  ngOnInit(): void {
    this.doctorService.getDoctor().subscribe(data=> this.doctoresData=data);
    console.log(this.doctoresData);
  }

  actualizarPerfilExitoso(){
    Swal.fire('¡Bien!', 'Has actualizado tu biografía exitosamente', 'success');
  }

  actualizarPerfilError(){
    Swal.fire('¡Ups!', 'No hemos podido actualizar tu biografia', 'error');
  }

  actualizarBiografia(email:any){
    this.doctorService.updateAccepted(email,this.formLoginAdmin.value).subscribe(res=>{
      console.log("Esto le envia: ",email, this.formLoginAdmin.value);
      if(res){
        console.log(res);
        this._router.navigateByUrl('/doctor/dashboard');
        this.actualizarPerfilExitoso();
        this.modalService.dismissAll();
      }else{
        //mostrar mensaje de error
        this.actualizarPerfilError();
        this.modalService.dismissAll();
      }
    });
    this._router.navigateByUrl('/doctor/dashboard');
  }

  cambiarAccepted(email:string){
    this.doctorService.updateAccepted(email,this.formLoginAdmin.value).subscribe(res=>{
      console.log("Esto le envia: ",this.formLoginAdmin.value);
      if(res){
        this._router.navigateByUrl('/admin/listar-pacientes');
      }else{
        //mostrar mensaje de error
        this.actualizarPerfilError();
      }
      console.log(res);
    });
  }

  openCita(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
}
