import { Component } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pincode: any;
  date: any;
  age: any;
  sessions: String;
  pushes: any = [];

  constructor(private fcm: FCM, public plt: Platform) {
    this.plt.ready()
      .then(() => {
        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            console.log("Received in background");
          } else {
            console.log("Received in foreground");
          };
        });

        this.fcm.onTokenRefresh().subscribe(token => {
          // Register your new token in your back-end if you want
          // backend.registerToken(token);
        });
      })
  }
  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }
  getToken() {
    this.fcm.getToken().then(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }

  async logForm() {

    var result = fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=' + this.pincode + '&date=' + this.date)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        //console.log(myJson);
        return myJson
      })
      .then(function (myJson) {
        var sessions = myJson.sessions
        if (myJson.error){
          console.log(myJson.error)
          return myJson.error
        }
        if (sessions[0]){
          console.log(sessions[0].name)
          return sessions[0].name
        }
        return 'No slots available'        
      })
      .catch(function (error) {
        console.log("Error: " + error);
        return error;
      });

    function getResult() {
      return result.then(function (res) {
        return res
      })
    }

    this.sessions = await getResult()

  }


}
