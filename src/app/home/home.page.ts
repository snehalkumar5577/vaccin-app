import { Component } from '@angular/core';

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

  constructor() {}

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
        console.log(sessions[0].name)
        return sessions[0].name
      })
      .catch(function (error) {
        console.log("Error: " + error);
      });

    function getResult() {
      return result.then(function (res) {
        return res
      })
    }

    this.sessions = await getResult()

  }


}