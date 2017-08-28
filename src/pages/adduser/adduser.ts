import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListuserPage } from '../listuser/listuser';

@Component({
    selector: 'page-adduser',
    templateUrl: 'adduser.html'
})
export class AddUserPage {
    selectedItem: any;
    title:string;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.selectedItem = navParams.get('name');
  
            this.title='Add User';
         

    }
openUsers(){
        this.navCtrl.push(ListuserPage,{name:3});

    }
}
