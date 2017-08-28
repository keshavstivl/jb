import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-addnotice',
    templateUrl: 'addnotice.html'
})
export class AddNoticePage {
   selectedItem: any;
    title:string;
    myDate:string;
    psDate:string;
    peDate:string;
    pDate:string;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.selectedItem = navParams.get('name');
          this.myDate = new Date().toISOString();
          this.psDate = new Date().toISOString();
          this.peDate = new Date().toISOString();
          this.pDate = new Date().toISOString();

            this.title='Send New Notice';
         

    }
}
