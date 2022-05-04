import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DoctorInfo } from 'src/app/interfaces/doctor.interfaces';
import { DoctorService } from 'src/app/Services/doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  recuperarContra: FormGroup;
  closeResult = '';
  doctoresData: DoctorInfo[]=[];
  probando!: boolean;
  body={};
  // Uso del decorador @ViewChild('aqui va lo que hayas definido en el html con el #') variable: ElementRef
  @ViewChild('toggle') toggle!: ElementRef

  constructor(private _router: Router,private doctorService: DoctorService, private formBuilder: FormBuilder, private modalService: NgbModal){
    this.recuperarContra= this.formBuilder.group({
      emailRecu: new FormControl('', [Validators.required, Validators.email])
    });
  }
  logoutDoctor(){
    this._router.navigateByUrl('/doctor/login-doctor');
    this.doctorService.logoutDoctor();
  }



get recuContra() {
  return this.recuperarContra.controls;
}

recupContra(){
  if(!this.recuperarContra.valid){
    console.log('No se pudo enviar el email');
    return;
  }
  this.doctorService.restablecerContra(JSON.stringify(this.recuperarContra.value))
  .subscribe(
    data => {console.log(data); this._router.navigate(['/']); this.sweetAlertCorreo()},
    error => {console.log(error); this.logoutDoctor() ; this.modalService.dismissAll() ;this.sweetAlertCorreo()}
  )
  console.log(JSON.stringify("Estos valores le envio: "+ this.recuperarContra.value))
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


ngOnInit(): void {
  this.doctorService.getDoctor().subscribe(data=>
    this.doctoresData=data);

    this.doctorService.getOneDoctor().subscribe(dato=>
      this.probando= dato.onService);

      //console.log(this.probando);
}

cambiarToggle(probando:boolean){
  if(probando===true){
    probando=false;
    Swal.fire('Aviso', 'Ya no estás disponible para tus pacientes', 'warning');
  }else if(probando===false){
    probando=true;
    Swal.fire('¡Bien!', 'Ahora estás disponible para tus pacientes', 'success');
  }
  this.body= {onService: probando}
  console.log("Valor del toggle: ",probando);
  this.doctorService.subirDoctor(this.body).subscribe(res=>{
    console.log("Esto se envia: ", this.body);
    console.log(res);
  }
    );
    console.log(this._router.url);
}



sweetAlertCorreo() {
  Swal.fire('¡Muy Bien!', 'Te hemos enviado un correo para restablecer tu contraseña', 'success');
}

}
