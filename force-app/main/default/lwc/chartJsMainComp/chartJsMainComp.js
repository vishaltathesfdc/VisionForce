import { LightningElement, wire } from 'lwc';
import getOpportunityList from '@salesforce/apex/MainController.getOpportunityList'
export default class ChartJsMainComp extends LightningElement {
    pieChartData=[]
    pieChartLabels=[]

    @wire(getOpportunityList)
    oppDataHandler({data}){
        if(data){
            const oppData =data.reduce((init,item)=>({...init,[item.StageName] : (init[item.StageName]|0)+1}),{})
            this.pieChartData = Object.values(oppData)
            this.pieChartLabels = Object.keys(oppData)
        }
    }
}