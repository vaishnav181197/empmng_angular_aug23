import { Component } from '@angular/core';
import * as HightCharts from 'highcharts'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  HighChart:typeof HightCharts=HightCharts;
  chartOptions={}
  constructor(){
    this.chartOptions={
      chart: {
          type: 'pie'
      },
      title: {
          text: 'Employee Chart'
      },
      tooltip: {
          valueSuffix: '%'
      },
      subtitle: {
          text:""
              },
      plotOptions: {
          series: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: [{
                  enabled: true,
                  distance: 20
              }, {
                  enabled: true,
                  distance: -40,
                  format: '{point.percentage:.1f}%',
                  style: {
                      fontSize: '1.2em',
                      textOutline: 'none',
                      opacity: 0.7
                  },
                  filter: {
                      operator: '>',
                      property: 'percentage',
                      value: 10
                  }
              }]
          }
      },
      series: [
          {
              name: 'Percentage',
              colorByPoint: true,
              data: [
                  {
                      name: 'Water',
                      y: 55.02
                  },
                  {
                      name: 'Fat',
                      sliced: true,
                      selected: true,
                      y: 26.71
                  },
                  {
                      name: 'Carbohydrates',
                      y: 1.09
                  },
                  {
                      name: 'Protein',
                      y: 15.5
                  },
                  {
                      name: 'Ash',
                      y: 1.68
                  }
              ]
          }
      ]
  }
  }

}
