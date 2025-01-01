import { LightningElement,api } from 'lwc';
import CHART_JS from '@salesforce/resourceUrl/ChartJs'
import {loadScript} from 'lightning/platformResourceLoader'
export default class ChartJsComp extends LightningElement {
    chart
    newData=[]

    @api type
    @api chartHeading
    @api chartLabels
    @api chartData

    isLoaded=false
    renderedCallback(){
        if(this.isLoaded){
            return
        }
        loadScript(this,CHART_JS+'/chartJs/Chart.js').then(()=>{
            this.isLoaded=true;
            this.chartData?.forEach(item => this.newData.push(item));
            this.loadCharts();
        })
    }

    loadCharts(){
        window.Chart.platform.disableCSSInjection = true
        const canvas = document.createElement('canvas')
        this.template.querySelector('div.chart').appendChild(canvas)
        const ctx = canvas.getContext('2d')
        this.chart = new window.Chart(ctx, this.config())
    }
    
   
    config(){
      return {
          type:this.type,
          data: {
            labels: this.chartLabels?this.chartLabels : [],
            datasets: [{
              label: this.chartHeading ? this.chartHeading : "",
              data:this.newData,
              borderWidth: 1,
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(30, 204, 148, 0.8)',
                'rgba(130, 204, 148, 0.8)'
            ],
            }]
          },
          options: {
            responsive: true,
            legend: {
                position: 'right'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
        };
    }
}