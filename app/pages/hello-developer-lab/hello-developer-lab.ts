import {Component} from '@angular/core';
import {AWService} from "../../services/aw-service";
import {Http} from "@angular/http";


@Component({
    templateUrl: 'build/pages/hello-developer-lab/hello-developer-lab.html',
    providers: [AWService]
})
export class HelloDeveloperLab {
    constructor(private http:Http, private appworks:AWService) {

    }

    onPageDidEnter() {
        // lifecycle hook -- dom content has loaded
        // TODO make http request to echo service to initiate a push notification
        setTimeout(() => {
            this.appworks.auth.authenticate().then((authResponse:any) => {
                console.log(authResponse);
                // TODO use client id contained in authResponse to form request to echo service
                // echo service uses this information to send a notification to the appropriate client
            });
        }, 8000);
    }
}
