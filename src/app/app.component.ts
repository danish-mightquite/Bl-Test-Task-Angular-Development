import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  constructor(private http: HttpClient) { }

  datadoughnut: any;


  ngOnInit() {



    this.http.get<any>('https://data.covid19india.org/v4/min/timeseries.min.json').subscribe(data => {
      
      const dates: string[] = [];
      const cases: number[] = [];
      const deaths: number[] = [];
      const recoveries: number[] = [];

      // Dynamically process the data
      for (const stateKey in data) {
        if (Object.prototype.hasOwnProperty.call(data, stateKey)) {
          const stateData = data[stateKey];
          if (stateData?.dates) {
            for (const date in stateData.dates) {
              if (Object.prototype.hasOwnProperty.call(stateData.dates, date)) {
                const stats = stateData.dates[date];
                dates.push(date);
                cases.push(stats.total?.confirmed || 0);
                deaths.push(stats.total?.deceased || 0);
                recoveries.push(stats.total?.recovered || 0);
              }
            }
          }
        }
      }

      // Create the chart
      const barchart = new Chart('barchart', {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [
            {
              label: 'Confirmed Cases',
              data: cases,
              backgroundColor: '#42A5F5'
            },
            {
              label: 'Deaths',
              data: deaths,
              backgroundColor: '#FF6384'
            },
            {
              label: 'Recoveries',
              data: recoveries,
              backgroundColor: '#9CCC65'
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              stacked: true,
              beginAtZero: true
            },
            y: {
              stacked: true,
              beginAtZero: true
            }
          }
        }
      });
    });



    this.datadoughnut = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            '#FF6384', // Color for January
            '#36A2EB', // Color for February
            '#FFCE56', // Color for March
            '#4BC0C0', // Color for April
            '#9966FF', // Color for May
            '#FF9F40', // Color for June
            '#FF6F61'  // Color for July
          ],
          borderColor: '#000', // Optional: border color for each bar
          borderWidth: 1 // Optional: border width for each bar
        }
      ]
    };

    // const barchart = new Chart('barchart', {
    //   type: 'bar',
    //   data: {
    //     labels: this.datadoughnut.labels,
    //     datasets: [
    //       {
    //         label: 'Monthly Sales',
    //         data: this.datadoughnut.datasets[0].data,
    //         backgroundColor: this.datadoughnut.datasets[0].backgroundColor
    //       }
    //     ]
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: false
    //       }
    //     }
    //   }
    // })

    const piechart = new Chart("piechart", {
      type: 'pie',
      data: {
        labels: this.datadoughnut.labels,
        datasets: [
          {
            label: 'Monthly Sales',
            data: this.datadoughnut.datasets[0].data,
            backgroundColor: this.datadoughnut.datasets[0].backgroundColor
          }
        ]
      },
      options: {

      }
    })



    const doughnutchart = new Chart("doughnutchart", {
      type: 'doughnut',
      data: {
        labels: this.datadoughnut.labels,
        datasets: [
          {
            label: 'Monthly Sales',
            data: this.datadoughnut.datasets[0].data,
            backgroundColor: this.datadoughnut.datasets[0].backgroundColor
          }
        ]
      },
      options: {

      }
    })


    const pachart = new Chart("pachart", {
      type: 'polarArea',
      data: {
        labels: this.datadoughnut.labels,
        datasets: [
          {
            label: 'Monthly Sales',
            data: this.datadoughnut.datasets[0].data,
            backgroundColor: this.datadoughnut.datasets[0].backgroundColor
          }
        ]
      },
      options: {

      }
    })


    const radarchart = new Chart("radarchart", {
      type: 'radar',
      data: {
        labels: this.datadoughnut.labels,
        datasets: [
          {
            label: 'Monthly Sales',
            data: this.datadoughnut.datasets[0].data,
            backgroundColor: this.datadoughnut.datasets[0].backgroundColor
          }
        ]
      },
      options: {

      }
    })


    const linechart = new Chart("linechart", {
      type: 'line',
      data: {
        labels: this.datadoughnut.labels,
        datasets: [
          {
            label: 'Monthly Sales',
            data: this.datadoughnut.datasets[0].data,
            backgroundColor: this.datadoughnut.datasets[0].backgroundColor
          }
        ]
      },
      options: {

      }
    })



  }

}
