import { LightningElement,wire } from 'lwc';
import {getObjectInfo} from 'lightning/uiObjectInfoApi';
import {getPicklistValues} from 'lightning/uiObjectInfoApi';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import COUNTRY_FIELD from '@salesforce/schema/Account.Country__c';
import STATE_FIELD from '@salesforce/schema/Account.State__c';
import CITY_FIELD from '@salesforce/schema/Account.City__c';

export default class Address extends LightningElement {
    //FieldsData
    stateFieldData
    cityFieldData

    // Option to show
    countryOptions
    stateOptions
    cityOptions

     @wire(getObjectInfo, {objectApiName: ACCOUNT_OBJECT })
    accountInfo

    @wire(getPicklistValues, {recordTypeId:'$accountInfo.data.defaultRecordTypeId', fieldApiName: COUNTRY_FIELD })
    countryInfo({data}){
     if (data) this.countryOptions = data.values;
    }

    @wire(getPicklistValues, {recordTypeId:'$accountInfo.data.defaultRecordTypeId', fieldApiName: STATE_FIELD })
    stateInfo({data}){
   if(data) this.stateFieldData =data
    }

        @wire(getPicklistValues, {recordTypeId:'$accountInfo.data.defaultRecordTypeId', fieldApiName: CITY_FIELD })
        cityInfo({data}){
            if(data) this.cityFieldData=data
        }

        handleCountryChange(event){
            const key = this.stateFieldData.controllerValues[event.target.value];
            this.stateOptions = this.stateFieldData.values.filter(opt => opt.validFor.includes(key));
            this.cityOptions=[]
        }

        handleStateChange(event){
        const key = this.cityFieldData.controllerValues[event.target.value];
        this.cityOptions = this.cityFieldData.values.filter(opt => opt.validFor.includes(key));  
}



}