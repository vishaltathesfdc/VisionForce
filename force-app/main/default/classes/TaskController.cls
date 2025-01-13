public with sharing class TaskController {
	@AuraEnabled(cacheable=true)
	public static list<Task__c> getUpcomingTasks(){
		return [select id, subject__c, dueDateTime__c from Task__c];
	}
}