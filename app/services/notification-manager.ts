import {Injectable} from "@angular/core";
import {AWService} from "./aw-service";

@Injectable()
export class NotificationManager {

    private appworks:AWService;

    constructor(awService:AWService) {
        this.appworks = awService;
    }

    setup() {

        this.getNotificationFromNotificationCenter((notification:any) => {
            this.handleNotification(notification);
        });

        this.enable((notification:any) => {
            this.handleNotification(notification);
        });

        this.getTappedNotification((notification:any) => {
            this.handleNotification(notification);
        });
    }

    private handleNotification(data:any) {
        // here is where we get the notification
        // TODO do something with notification
    }

    private getTappedNotification(callback:any) {
        this.appworks.notifications.openListener(callback);
    }

    private getNotificationFromNotificationCenter(callback:any) {
        this.appworks.notifications.getOpeningNotification(callback);
    }

    private enable(callback:any) {
        this.appworks.notifications.enable(callback);
    }
}