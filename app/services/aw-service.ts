import {Injectable} from "@angular/core";
declare let Appworks:any;
declare let Keyboard:any;

@Injectable()
export class AWService {
    auth:any;
    camera:any;
    menu:any;
    webview:any;
    header:any;
    notifications:any;
    keyboard:any;

    constructor() {

        this.auth = {
            // perform an authentication request against the gateway, get back the auth response
            authenticate: () => {
                return new Promise((resolve, reject) => {
                    let auth = new Appworks.Auth(
                        (authResponse:any) => {
                            resolve(authResponse.authData);
                        },
                        reject
                    );
                    auth.authenticate();
                });
            }
        };

        this.keyboard = {
            // hide the accessory bar in the webview keyboard
            hideKeyboardAccessoryBar: () => {
                let keyboard = new Appworks.AWKeyboard();
                keyboard.hideKeyboardAccessoryBar(true);
            },
            // disable webview closing when a textarea is focused
            disableScroll: (on?:boolean) => {
                let keyboard = new Appworks.AWKeyboard();
                keyboard.disableScroll(on);
            }
        };

        this.notifications = {
            // catch real time push notifications
            enableInAppNotifications: (callback?:any) => {
                // TODO implement notification handler for in-app notifications.
                // refer to https://github.com/opentext/appworks-js
            },
            // turn off real time push notifications
            disable: () => {
                let manager = new Appworks.AWNotificationManager();
                manager.disablePushNotifications();
            },
            // catch the notification that opened the app from the notification center
            getOpeningNotification: (callback?:any) => {
                let manager = new Appworks.AWNotificationManager();
                manager.getOpeningNotification((notification:any) => {
                    if (callback) {
                        callback(notification);
                    }
                });
            },
            // catch the notification that was tapped from the in-app notifications screen
            openListener: (callback?:any) => {
                let manager = new Appworks.AWNotificationManager();
                manager.openListener((notification:any) => {
                    if (callback) {
                        callback(notification);
                    }
                });
            },
            // get a collection of all notifications that are active for this client
            get: () => {
                return new Promise((resolve) => {
                    let manager = new Appworks.AWNotificationManager();
                    manager.getNotifications((notifications:any[]) => {
                        resolve(notifications);
                    });
                });
            }
        };

        this.menu = {
            // add items to native side menu
            setItems: (items:any[], callback:any) => {
                let menu = new Appworks.Menu();
                menu.push(items);
                menu.openListener((action:string) => {
                    callback(action);
                });
            }
        };

        this.header = {
            // add remove back button/set title in native header bar
            set: (config:any) => {
                let header = new Appworks.AWHeaderBar();
                header.setHeader(config);
            }
        };

        this.webview = {
            // open a link using the native inappbrowser plugin
            open: (url:string, target?:string, options?:string) => {
                return new Promise((resolve, reject) => {
                    // TODO implement opening of link in webview
                    // refer to https://github.com/opentext/appworks-js
                });
            }
        };

        this.camera = {
            // use the device camera to take a photo, returns type based on cameraOptions
            takePicture: () => {
                return new Promise((resolve, reject) => {
                    let camera = new Appworks.AWCamera((dataUrl:string) => {
                        resolve(`data:image/jpeg;base64,${dataUrl}`)
                    }, reject);

                    let cameraOptions = {
                        destinationType: 0, // DATA_URL
                        encodingType: 0, // JPEG
                        correctOrientation: true,
                        saveToPhotoAlbum: true,
                        quality: 100,
                        targetWidth: 720,
                        targetHeight: 720
                    };

                    camera.takePicture(cameraOptions);
                });
            },
            // choose a photo from the camera roll, returns type based on cameraOptions
            chooseFromLibrary: () => {
                return new Promise((resolve, reject) => {

                    let camera = new Appworks.AWCamera((dataUrl:string) => {
                        resolve(`data:image/jpeg;base64,${dataUrl}`)
                    }, reject);

                    let cameraOptions = {
                        quality: 100,
                        targetWidth: 720,
                        targetHeight: 720,
                        destinationType: 0, // DATA_URL
                        encodingType: 0, // JPEG
                    };

                    camera.openGallery(cameraOptions);
                });
            }
        };
    }
}
