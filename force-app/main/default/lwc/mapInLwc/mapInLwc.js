import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/MainController.getAccountList'
import getAllAccount from '@salesforce/apex/MainController.getAllAccount'
import {exportCSVFile} from 'c/utils'
export default class MapInLwc extends LightningElement {
    mapMarkers=[]
    selectedMarker

    @wire(getAccountList)
    accountData({data}){
        if(data)this.formatData(data)
    }


    formatData(data){
        this.mapMarkers=data.map((item)=>{
                return  {
                    location: {
                        City: item.BillingCity ||"",
                        Country: item.BillingCountry ||"",
                        PostalCode: item.BillingPostalCode ||"",
                        State: item.BillingState ||"",
                        Street: item.BillingStreet ||"",
                    },
                    value: item.Name || "",
                    title: item.Name || "",
                    description:item.Description || "",
                    icon: 'utility:salesforce1',
                }
        })
        this.selectedMarker = this.mapMarkers.length && this.mapMarkers[0].value
    }

    handleMarkerSelect(event){
        this.selectedMarker = event.detail.selectedMarkerValue
    }


    //code for CSV generation
    accountList=[]
    @wire(getAllAccount)
    accountHandler({data,error}){
        if(data){
            this.accountList=data;
        }
        if(error)console.error(error)
    }

    handleGenerateCsv(){
        const headers={Id:"ID",Name:"Account Name",Industry:"Industry",Phone:"Phone",AnnualRevenue:"Annual Revenue"}

        exportCSVFile(headers,this.accountList,'Account_csv')
    }
}