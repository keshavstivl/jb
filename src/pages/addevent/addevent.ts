import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
 
@Component({
    selector: 'page-addevent',
    templateUrl: 'addevent.html'
})
export class AddEventPage {
    selectedItem: any;
    title:string;
    myDate:string;
    psDate:string;
    peDate:string;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.selectedItem = navParams.get('name');
          this.myDate = new Date().toISOString();
          this.psDate = new Date().toISOString();
          this.peDate = new Date().toISOString();

            this.title='Post New Event';
         

    }
}