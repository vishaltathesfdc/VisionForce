trigger AccountTrigger on Account (after insert) {

    
    For(Account acc : trigger.new){
        if(acc.website !=null){
            RemoteSiteManager.createRemoteSites(acc.id);
        }
    }
}