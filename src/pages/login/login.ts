import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DataService} from '../../service/dataservice';
import { ForgotPassPage } from '../forgot/forgot';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [DataService]
})
export class LoginPage {
    selectedItem: any;
    title:string;

    constructor(public navCtrl: NavController, public navParams: NavParams,public data: DataService) {
        this.selectedItem = navParams.get('name');

        this.title='Login';
//                data.postData();


    }

    openForgot(){
        this.navCtrl.push(ForgotPassPage,{name:3});

    }

}
