import { api, LightningElement } from 'lwc';
import generatePDF from '@salesforce/apex/MainController.generatePDF'
export default class InvoicePdfGeneratorComp extends LightningElement {
    logo='https://marktinetechnologysolution2-dev-ed.develop.my.salesforce.com/servlet/servlet.ImageServer?id=015IU00000Hcl2S&oid=00DIU000002sMMU&lastMod=1732695790000';

    @api recordId
invoiceInfo={
    no:'# 123',
    createdDate:' 01 January 2024',
    dueDate:' 05 January 2025',
    name:'Sparksuite inc',
    street: '12345 Keshav vihar',
    city:'Jaipur 302020'
}

clientInfo={
    name:"Acme corp",
    contact:'Jhon Doe',
    email:'johndoe@mail.com'
}

services=[
    {type:"Consulation fee",
        amount:3000
    },
    {type:"Website Design",
        amount:40000
    },{type:"Platform charges",
        amount:10000
    },{type:"Hosting fee",
        amount:5000
    }
]

get totalAmount(){
    return this.services.reduce((total, service) => total + service.amount, 0);
}

generatePdfHandler(){
    const temp = this.template.querySelector('.container')   
    if(temp){
        const data={recordId:this.recordId,htmlData:temp.outerHTML}
        generatePDF(data).then((result)=>{
            console.log(result)
            window.open(`https://marktinetechnologysolution2-dev-ed.develop.file.force.com/servlet/servlet.FileDownload?file=${result.Id}`,'_blank')
        }).catch(
            (error)=>console.error(error)
        )
    }
}


}