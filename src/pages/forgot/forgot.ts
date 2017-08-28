import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DataService} from '../../service/dataservice';

@Component({
    selector: 'page-forgot',
    templateUrl: 'forgot.html',
    providers: [DataService]
})
export class ForgotPassPage {
    selectedItem: any;
    title:string;

    constructor(public navCtrl: NavController, public navParams: NavParams,public data: DataService) {
        this.selectedItem = navParams.get('name');

        this.title='Forgot Password';
//        data.postData();


    }

}
