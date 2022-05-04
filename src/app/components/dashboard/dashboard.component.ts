import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables} from 'chart.js' ;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

   @ViewChild('pieCanvas')
  private pieCanvas!: ElementRef;
  @ViewChild('lineCanvas') lineCanvas!: ElementRef;
  lineChart: any;
  pieChart: any;

  constructor() { 
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    
    this.lineChartMethod();
  }

  
  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['semana 1', 'semana 2', 'semana 3', 'semana 4', 'semana 5', 'semana 6', 'semana 7'],
        datasets: [
          {
            label: 'Pacientes por semana',
            fill: false,
            backgroundColor: 'rgba(89, 72, 245, 1)',
            borderColor: 'rgba(89, 72, 245, 1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(89, 72, 245, 1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(89, 72, 245, 1)',
            pointHoverBorderColor: 'rgba(89, 72, 245, 1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [2, 5, 7, 10, 5, 7, 9],
            spanGaps: false,
          }
        ]
      }
    });
  }

}
