public class MainController {

    //This method is for Generate PDF 
    @AuraEnabled
    public static Attachment generatePDF(id recordId,string htmlData){
        PageReference page = Page.InvoicePdfVisualPage;
        page.getParameters().put('pdfText',htmlData);
            Attachment att = new Attachment();
        	att.name='Invoice.pdf';
            att.ParentId=recordId;
            att.Body=page.getContentAsPdf();
            att.IsPrivate=false;
            insert att;
            return att;
    }
    
    //This method is used for Fetch Data TO Show in Map
    @AuraEnabled(Cacheable=true)
    public static  list<account> getAccountList(){
        return [select id , name,description, billingStreet, billingCity, billingstate,BillingCountry,BillingPostalCode from account where billingStreet !=''  and  billingCity!= '' order by createdDate desc limit 5];
    }
    
    
    @AuraEnabled(Cacheable=true)
    Public static list<account> getAllAccount(){
        return [select id,name,industry,phone,annualRevenue from Account];
    }
    
      @AuraEnabled(Cacheable=true)
    Public static list<opportunity> getOpportunityList(){
        return [select stageName,amount from opportunity];
    }
}