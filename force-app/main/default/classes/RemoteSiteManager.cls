public class RemoteSiteManager {
    @future(callout=true)
    public static void createRemoteSites(id accId) {
        Account acc =[select id, name ,Website from account where id =:accId limit 1];
        List<MetadataService.Metadata> remoteSites = new List<MetadataService.Metadata>();

        MetadataService.RemoteSiteSetting remoteSite = new MetadataService.RemoteSiteSetting();
        remoteSite.fullName = getDomainAsCustomName(acc.Website);
        remoteSite.url = acc.Website;
        remoteSite.description = acc.Name+acc.Id;
       remoteSite.isActive = true;
        remoteSite.disableProtocolSecurity = false;

        remoteSites.add(remoteSite);

        // Deploy the remote sites
        deployRemoteSites(remoteSites);
    }

    private static void deployRemoteSites(List<MetadataService.Metadata> remoteSites) {
        System.debug('Entered deployRemoteSites method');
        MetadataService.MetadataPort service = createMetadataService();
        List<MetadataService.SaveResult> results;
        try {
            results = service.createMetadata(remoteSites);

            // Handle SaveResult
            for (MetadataService.SaveResult result : results) {
                if (result.success) {
                    System.debug('Remote Site created successfully: ' + result.fullName);
                } else {
                    for (MetadataService.Error error : result.errors) {
                        System.debug('Error: ' + error.message);
                    }
                }
            }
        } catch (Exception ex) {
            System.debug('Error deploying Remote Site Settings: ' + ex.getMessage());
        }
    }

    private static MetadataService.MetadataPort createMetadataService() {
        MetadataService.MetadataPort service = new MetadataService.MetadataPort();
        service.SessionHeader = new MetadataService.SessionHeader_element();
        service.SessionHeader.sessionId = UserInfo.getSessionId();
        return service;
    }
    
    public static String getDomainAsCustomName(String url) {
        Pattern domainPattern = Pattern.compile('https?://([\\w.-]+)');
        Matcher matcher = domainPattern.matcher(url);
        if (matcher.find()) {
            String domain = matcher.group(1);
            String formattedDomain = domain.replaceAll('[^a-zA-Z0-9]', '_');
            return formattedDomain;
        } else {
            throw new IllegalArgumentException('Invalid URL format');
        }
    }
}