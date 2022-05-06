import { Component, OnInit } from '@angular/core';

import { Calendar, CalendarOptions } from '@fullcalendar/core';

import { DoctorService } from 'src/app/Services/doctor.service';
import { PacienteService } from 'src/app/Services/paciente.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  appointments?:any=[];
  idDoctor?:any;
  calendario?:CalendarOptions;
  events:any=[];
  i?:any;
  paciente:any;
  nombre:any;
  elemento:any;
  hora:any;
  des:any;
  appointment?:any;
  minutes:any;
  contador:any;
  detalle:any;
  table:any;
  modalidad:any;
  pay:any;
  
  constructor(private doctorService: DoctorService, private patientService: PacienteService) { }

  ngOnInit(): void {

    this.doctorService.getDoctor().subscribe(data=>{
      this.idDoctor=data[0]._id;
      //console.log(this.idDoctor);

      this.obtenerInfo();

    }

    );
  }
  obtenerInfo(){
    this.doctorService.getMedAppointment(this.idDoctor).subscribe(data=>{
    this.appointments=data;
      this.fillEvents();
    }
    )
  }

  fillCalendar(){
    this.calendario = {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this),
      locale: 'es',
      events: this.events
    };
  }
  handleDateClick(arg:any) {
    this.detalle="";


     this.events.forEach((element: any) => {
        if(element.date==arg.dateStr){
          this.detalle=this.detalle+`
          <tr (click)="detalleCita()">
            <td>${element.nombre} </td>
            <td>${element.date}  </td>
            <td>${element.hour}</td>
            <td>${element.modality}</td>
            <td>${element.pay}</td>
            <td>${element.description}</td>
          </tr>
          `
          //console.log(arg.dateStr);
        }
    });
    this.table=`
        <table class="table table-striped" style="font-size:0.7em">
          <thead>
            <tr>
              <th scope="col">Peciente</th>
              <th scope="col">Fecha</th>
              <th scope="col">Hora</th>
              <th scope="col col-span-2" style="min-width:30px">Modalidad</th>
              <th scope="col">Pago</th>
              <th scope="col">Descripción</th>
            </tr>
            </thead>
            <tbody>
              ${this.detalle}

            </tbody>
        </table>`
    Swal.fire({
      title:'Citas de la fecha',
      width: 800,
      html:this.table,
    });
  }
  fillEvents(){

    this.contador=0;
    for(let appointment of this.appointments!){
      this.patientService.getPacienteById(appointment.id_patient).subscribe(data=>{
        this.paciente=data;
        this.nombre=this.paciente.firstName+" "+this.paciente.firstLastName;
        //console.log("paciente"+appointment+this.paciente);
        //console.log(this.nombre);
        if(appointment.medAppointment_modality_inClinic==true){
          this.modalidad="Clínica";
        }else if(appointment.medAppointment_modality_inHouse==true){
          this.modalidad="Casa"
        }else{
          this.modalidad="En línea"
        }
        if(appointment.payment_cash==true){
          this.pay="Efectivo"
        }else{
          this.pay="Digital"
        } 
        this.elemento={
          title: 'Cita paciente '+this.nombre,
          date:appointment.date,
          hour:this.getHora(appointment.hour, appointment.minutes),
          modality:this.modalidad,
          nombre:this.nombre,
          pay:this.pay,
          description:appointment.description
        }
        this.events.push(this.elemento);
        this.contador=this.contador+1;
        if(this.contador>=this.appointments.length){
          this.fillCalendar();
        }
        //console.log(this.events);
        }
        );
      }

  }

  getHora(hora:any, minutes:any){

    if(hora>12){
      this.hora=hora-12;
      this.des="pm";
    }else if(hora==12){
      this.hora=hora;
      this.des="pm";
    }else{
      this.hora=hora;
      this.des="am";
    }
    if(minutes<=9||minutes==0){
      return this.hora+":0"+minutes.toString()+this.des;
    }else{
    return this.hora+":"+minutes.toString()+this.des;
    }
  }
}
