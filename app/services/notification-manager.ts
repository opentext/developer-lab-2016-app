import {Injectable} from "@angular/core";
import {AWService} from "./aw-service";
import {Alert, App} from "ionic-angular/index";

@Injectable()
export class NotificationManager {

    private appworks:AWService;
    private app:App;

    constructor(awService:AWService, app:App) {
        this.appworks = awService;
        this.app = app;
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
        data = JSON.parse(data);
        let alert = Alert.create({
            title: 'New Notification!',
            subTitle: 'You just received a link. Would you like to open it?',
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.appworks.webview.open(data.link);
                    }
                }
            ]
        });
        this.app.getRootNav().present(alert);
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