public class GeneratePdfController {
    public String textValue { get; set; }

    public GeneratePdfController() {
        String recordId = ApexPages.currentPage().getParameters().get('recId');
        
        
        for(integer count= 1; count< 10000; count++){
            system.debug(count);
        }

        Account acc = [
            SELECT Id, IsDeleted, MasterRecordId, Name, Type, ParentId, 
                   BillingStreet, BillingCity, BillingState, BillingPostalCode, 
                   BillingCountry, BillingLatitude, BillingLongitude, 
                   BillingGeocodeAccuracy, BillingAddress, ShippingStreet, 
                   ShippingCity, ShippingState, ShippingPostalCode, ShippingCountry, 
                   ShippingLatitude, ShippingLongitude, ShippingGeocodeAccuracy, 
                   ShippingAddress, Phone, Fax, AccountNumber, Website, PhotoUrl, 
                   Sic, Industry, AnnualRevenue, NumberOfEmployees, Ownership, 
                   TickerSymbol, Description, Rating, Site, OwnerId, CreatedDate, 
                   CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, 
                   LastActivityDate, LastViewedDate, LastReferencedDate, Jigsaw, 
                   JigsawCompanyId, CleanStatus, AccountSource, DunsNumber, 
                   Tradestyle, NaicsCode, NaicsDesc, YearStarted, SicDesc, 
                   DandbCompanyId, OperatingHoursId
            FROM Account
            WHERE Id = :recordId
            LIMIT 1
        ];
        
        if(acc.id !=null){
            textValue = JSON.serialize(acc);
        }else textValue='Please enterr recId ';
        
    }
}