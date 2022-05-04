import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/Services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-curriculum',
  templateUrl: './upload-curriculum.component.html',
  styleUrls: ['./upload-curriculum.component.css']
})
export class UploadCurriculumComponent implements OnInit {

  public previsualizacion!: string;
  public archivos: any = [];
  public loading!: boolean;
  public body = {};
  public image = '';

  constructor(private sanitizer: DomSanitizer, private doctorService: DoctorService, private router: Router) { }

  ngOnInit(): void {
  }

  capturarFile(event: any) {
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      this.image = imagen.base;
    })
    this.archivos.push(this.image);
  console.log(this.archivos);
}



  extraerBase64 = async ($event: any) => new Promise((resolve) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
      return resolve;
    } catch (e) {
      return null;
    }
  })


  /**
   * Limpiar imagen
   */

  clearImage(): any {
    this.previsualizacion = '';
    this.archivos = [];
  }



  /**
   * Subir archivo
   */

   subirArchivo(): any {
    try {
      this.loading = true;
      const formularioDeDatos = new FormData();
      //formularioDeDatos.append("img", archivo)
      this.body = { file: this.image }
      this.doctorService.subirDoctor(this.body)
        .subscribe(res => {
          this.loading = false;
          console.log("Esto se envia: ", this.image);
          Swal.fire('¡Bien!', res.message, 'success');
          this.router.navigateByUrl('/doctor/dashboard');
          console.log('Respuesta del servidor', res);

        }, () => {
          this.loading = false;
          alert('Error');
        })
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e);

    }
  }

}
