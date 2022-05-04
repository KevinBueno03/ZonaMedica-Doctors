import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { DoctorService } from 'src/app/Services/doctor.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

   mapa!: mapboxgl.Map;
  data= JSON.stringify('all');
  token= JSON.stringify(localStorage.getItem("token"));
  longitud= -87.207;
  latitud=14.0383;
  jsonLngLat: any;

  constructor(private doctorService:DoctorService, private _router: Router){

  }


  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapboxKey;
    this.mapa = new mapboxgl.Map({
      container: 'mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.longitud, this.latitud],
      zoom: 15
    });

    this.crearMarcador(this.longitud, this.latitud);
  }

  crearMarcador(longitud: number, latitud: number) {
    const marcador = new mapboxgl.Marker({
      draggable: true
    }).setLngLat([longitud, latitud])
      .addTo(this.mapa);

    marcador.on('drag', () => {
      this.jsonLngLat=marcador.getLngLat();
    })

  }

  crearDireccion(){
    this.doctorService.crearDireccion(JSON.stringify(this.jsonLngLat))
    .subscribe(
      data => { console.log(data); this.sweetAlertDireccionSuccess() ;this._router.navigate(['/doctor/dashboard'])},
      error => {console.log(error); this.sweetAlertDireccionError()}
    )
  }

  sweetAlertDireccionSuccess() {
    Swal.fire('¡Muy Bien!', 'Has guardado tu dirección satisfactoriamente', 'success');
    console.log("Longitud: "+ this.longitud+" Latitud: "+this.latitud);
  }

  sweetAlertDireccionError() {
    Swal.fire('¡Upps!', 'No pudimos guardar tu direccion', 'error');
  }

}
