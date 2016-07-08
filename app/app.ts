import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, Nav} from 'ionic-angular';
import {HelloDeveloperLab} from "./pages/hello-developer-lab/hello-developer-lab";
import {NotificationManager} from "./services/notification-manager";
import {AWService} from "./services/aw-service";

@Component({
    templateUrl: 'build/app.html',
    providers: [NotificationManager, AWService]
})
class MyApp {
    @ViewChild(Nav) nav:Nav;

    // make HelloDeveloperLab the root (or first) page
    rootPage:any = HelloDeveloperLab;
    pages:Array<{title:string, component:any}>;

    constructor(private platform:Platform, private notificationManager:NotificationManager) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.

            // initialize notification handler
            this.notificationManager.setup();

            // this would also be a good place to do the following...
            // disable keyboard scroll
            // hide keyboard navigation buttons
        });
    }
}

ionicBootstrap(MyApp);
