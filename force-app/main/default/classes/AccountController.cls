public with sharing class AccountController {
    public List<Account> accountList { get; set; }

    public AccountController() {
        accountList = [SELECT Id, Name, Industry, AnnualRevenue FROM Account];
    }

    @AuraEnabled
    public static String generatePDF() {
        PageReference pdfPage = Page.AccountPDFPage;
        Blob pdfBlob = pdfPage.getContentAsPDF();
        return EncodingUtil.base64Encode(pdfBlob);
    }
    
    public static void rettt(){
        if(trigger.isExecuting){
            system.debug('trigger--'+trigger.operationType);
        }
    }
    
    
    @AuraEnabled(Cacheable=true)
    public static map<string,account> getAccountData(){
        
        map<string,account> accMap = new map<string,account>();
        list<account> accQuery =[select id, name,phone , annualRevenue From account];
        for(Account acc : accQuery){
            accMap.put(acc.name,acc);
        }
        return accMap;
    }
}