import { LightningElement } from 'lwc';
import INPUT_ICON_CSS from '@salesforce/resourceUrl/inputIconCss';
import {loadStyle} from 'lightning/platformResourceLoader'
export default class LoginForm extends LightningElement {
    passVisible = false

    connectedCallback(){
        loadStyle(this,INPUT_ICON_CSS)
    }

    handleIcon(){
        this.passVisible =!this.passVisible
    }

get passFieldIcon(){
    return this.passVisible ? 'utility:hide':'utility:preview'
}

get passFieldType(){
    return this.passVisible ? 'text':'password'
}
}