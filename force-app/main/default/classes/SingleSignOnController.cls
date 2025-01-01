global class SingleSignOnController implements Auth.RegistrationHandler{
    static final string standard_profile  = 'Standard User';
  
void prepareUserDataToCreate(Auth.UserData data, User u) {
    System.debug('Data received: ' + data);
  
    String email = data.email;
    String picture = data.attributeMap.get('picture'); 
    Integer rand = Math.round(Math.random()*100000000);
    string alias=data.firstName;
    if(alias.length() > 8)alias = alias.substring(0, 8);  
    

    u.FirstName = data.firstName;
    u.LastName = data.lastName;
    u.Email = email;
    u.username = data.firstName + '.' + rand + '@social-sign-on.com';
    u.LanguageLocaleKey = 'en_US';
    u.localesidkey = UserInfo.getLocale();
    u.emailEncodingKey = 'UTF-8';
    u.timeZoneSidKey = 'America/Los_Angeles';
    u.Alias = alias;
}


global User createUser(Id portalId, Auth.UserData data){
    system.debug('Create user data---'+data);
	User u = new User();
    prepareUserDataToCreate(data, u);
    
     Profile p = [SELECT Id FROM profile WHERE name=:standard_profile];
       u.profileId = p.Id;
	 system.debug('u----'+u);
	return u;
}

global void updateUser(Id userId, Id portalId, Auth.UserData data){
    system.debug('update user data---'+data);
	User u = new User(id=userId);

  if(data.email != null && data.email != '')u.email = data.email;
  if(data.lastName != null && data.lastName != '')u.lastName = data.lastName;
  if(data.firstName != null && data.firstName != '')u.firstName = data.firstName;
    
    system.debug('u----'+u);
    update u;
	
}
}