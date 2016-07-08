import {Component} from '@angular/core';
import {AWService} from "../../services/aw-service";
import {Http, Headers, Response} from "@angular/http";


@Component({
    templateUrl: 'build/pages/hello-developer-lab/hello-developer-lab.html',
    providers: [AWService]
})
export class HelloDeveloperLab {
    constructor(private http:Http, private appworks:AWService) {

    }

    sendNotificationRequest() {
        // this method will utilize the echo service to initiate a push notification from GCM,
        // taking the contents of the request, and pinging back our specific device with the link
        // we provide. once we receive the notification, we action the contents by opening the link
        // in a web view using the inappbrowser plugin provided by appworks.js
        //
        // request format to echo service:
        // {
        //   "clientId": "<your client id>",
        //   "appId": "<name of your app>",
        //   "link": "<the link you provide>"
        // }
        //
        this.appworks.auth.authenticate().then((authResponse:any) => {
            let endpoint = `${authResponse.gatewayUrl}/notifications-echo-service/api/echo/`;
            let headers = new Headers();
            let request = JSON.stringify({
                clientId: authResponse.clientId,
                link: 'https://twitter.com/Kurt_Vonnegut/status/751325711282036736',
                appId: 'DeveloperLab2016'
            });

            headers.append('Content-Type', 'application/json');

            if (authResponse.accessToken) {
                headers.append('Authorization', `Bearer ${authResponse.accessToken}`);
            } else if (authResponse.otagtoken) {
                headers.append('otagtoken', authResponse.otagtoken);
            }

            this.http.post(endpoint, request, {headers: headers}).subscribe();
        });
    }
}
