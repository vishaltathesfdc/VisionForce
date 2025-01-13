import { LightningElement, wire, track } from 'lwc';
import getUpcomingTasks from '@salesforce/apex/TaskController.getUpcomingTasks';

export default class TaskManager extends LightningElement {
    @track tasks = []; // Corrected spacing

    connectedCallback() {
        this.startCountDown(); // Missing semicolon fixed
    }

    @wire(getUpcomingTasks)
    wiredTasked({ data }) {
        if (data) {
            this.tasks = data.map(task => ({
                ...task,
                remaingTime: this.calculateRemaingTime(task.DueDateTime__c), // Fixed typo in "remaingTime"
                isExpired: false // Missing semicolon fixed
            }));
        }
    }

    calculateRemaingTime(dueDateTime) { // Moved inside the class
        const now = new Date().getTime();
        const dueDate = new Date(dueDateTime).getTime();

        const timeRemaing = dueDate - now;

        if (timeRemaing <= 0) {
            return null;
        }

        const days = Math.floor(timeRemaing / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaing % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaing % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaing % (1000 * 60)) / 1000); // Fixed typo in "second"

        return `${days}d ${hours}h ${minutes}m ${seconds}s`; // Fixed typo in "second"
    }

    startCountDown() {
        setInterval(() => {
            this.tasks = this.tasks.map(task => { // Fixed typo in "this.task"
                const remaingTime = this.calculateRemaingTime(task.DueDateTime__c);

                return {
                    ...task,
                    remaingTime: remaingTime, // Fixed typo in "remaingTime"
                    isExpired: remaingTime === null // Changed semicolon to a comma
                };
            });
        }, 1000); // Fixed interval time definition
    }
}