public class InvoicePdfPageController {
    public string pdfText {set;get;}
    public InvoicePdfPageController(){
        pdfText=String.escapeSingleQuotes(
        ApexPages.currentPage().getparameters().get('pdfText')
        );
    }

}