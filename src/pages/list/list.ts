import { Component } from '@angular/core';
import { NavController, NavParams,Platform, ModalController,ViewController } from 'ionic-angular';
import { AddEventPage } from '../addevent/addevent';
import { AddSpeechPage } from '../addspeech/addspeech';
import { AddMediaPage } from '../addmedia/addmedia';

@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {
    selectedItem: any;
    icons: string[];
    items: Array<{title: string, note: string, icon: string}>;
    title:string;
    notuser:boolean;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('name');
        //       let name = navParams.get('name'); 
        console.log('this.selectedItem '+JSON.stringify(this.selectedItem));

        // Let's populate this page with some filler content for funzies
        this.icons = ['contact', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
                      'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        this.notuser=true;
        if(this.selectedItem==2){
            this.notuser=false;
            this.title='Manage Speeches';
            for (let i = 1; i < 5; i++) {
                this.items.push({
                    title: 'Speeches ' + i,
                    note: 'img/image1.jpg',
                    icon: this.icons[0]
                });
            } 
        }
        else if(this.selectedItem==3){
            this.title='Media Coverage';
            for (let i = 1; i < 11; i++) {
                this.items.push({
                    title: 'Media Coverage ' + i,
                    note: 'img/image2.jpg',
                    icon: this.icons[0]
                });
            } 
        }
        else if(this.selectedItem==4){
            this.title='Events';
            for (let i = 1; i < 11; i++) {
                this.items.push({
                    title: 'Events ' + i,
                    note: 'img/image3.jpg',
                    icon: this.icons[0]
                });
            } 
        }
        //        else if(this.selectedItem==8){
        //            this.notuser=false;
        //            this.title='All Suppliers';
        //            for (let i = 1; i < 5; i++) {
        //                this.items.push({
        //                    title: 'Supplier ' + i,
        //                    note: 'Address: AP 23, Sector 2, Kolkata, India',
        //                    icon: this.icons[0]
        //                });
        //            } 
        //        }
    }

    addSup() {
        // That's right, we're pushing to ourselves!
        console.log('addSup for '+this.selectedItem);
        if(this.selectedItem==2)  this.navCtrl.push(AddSpeechPage,{name:this.selectedItem});
        else if(this.selectedItem==4) this.navCtrl.push(AddEventPage,{name:this.selectedItem});
        else if(this.selectedItem==3) this.navCtrl.push(AddMediaPage,{name:this.selectedItem});
        //        else if(this.selectedItem==7) this.navCtrl.push(AddSupPage,{name:this.selectedItem});
    }

    viewDet() {
        // That's right, we're pushing to ourselves!
        console.log('addSup for '+this.selectedItem);
        if(this.selectedItem==2)  this.navCtrl.push(SpeechdetPage,{name:this.selectedItem});
        else if(this.selectedItem==4) this.navCtrl.push(EventdetPage,{name:this.selectedItem});
        else if(this.selectedItem==3) this.navCtrl.push(MediadetPage,{name:this.selectedItem});
        //        else if(this.selectedItem==7) this.navCtrl.push(AddSupPage,{name:this.selectedItem});
    }
    /* itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
  */
}
@Component({
    selector: 'page-eventdet',
    templateUrl: 'eventdet.html'
})
export class EventdetPage {
    selectedItem: any;
    icons: string[];
    items: Array<{title: string, note: string, icon: string}>;
    title:string;
    op1:number;
    myDate:string;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('name');
        //       let name = navParams.get('name'); 
        console.log('this.selectedItem '+JSON.stringify(this.selectedItem));
        console.log('this.opt '+JSON.stringify(this.op1));

        // Let's populate this page with some filler content for funzies
        this.icons = ['contact', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
                      'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        var datePipe = new Date();
        this.myDate = new Date().toISOString();
        this.title='Event Detail';

    }
    editEvent() {
        this.navCtrl.push(AddEventPage,{name:this.selectedItem});
    }

    onChange(op1) {
        console.log(op1);
        //        this.items = [];
        /*if(op1==1){
            for (let i = 1; i < 12; i++) {
                this.items.push({
                    title: '123456',
                    note: 'Customer '+i,
                    icon: this.icons[0]
                });
            }
        }else{
            for (let i = 1; i < 12; i++) {
                this.items.push({
                    title: '123456',
                    note: 'Supplier '+i,
                    icon: this.icons[0]
                });
            }
        }*/
    }

    /* itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
  */
}
@Component({
    selector: 'page-mediadet',
    templateUrl: 'mediadet.html'
})
export class MediadetPage {
    selectedItem: any;
    icons: string[];
    items: Array<{title: string, note: string, icon: string}>;
    title:string;
    op1:number;
    myDate:string;
    constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('name');
        //       let name = navParams.get('name'); 
        console.log('this.selectedItem '+JSON.stringify(this.selectedItem));
        console.log('this.opt '+JSON.stringify(this.op1));

        // Let's populate this page with some filler content for funzies
        this.icons = ['contact', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
                      'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        var datePipe = new Date();
        this.myDate = new Date().toISOString();
        this.title='Media Detail';


    }
    editMedia() {
        this.navCtrl.push(AddMediaPage,{name:this.selectedItem});
    }
    openRecModal(characterNum) {
        //        let modal = this.modalCtrl.create(ModalReceiptPage, characterNum);
        //        modal.present();
    }
    onChange(op1) {
        console.log(op1);
        //        this.items = [];
        /*if(op1==1){
            for (let i = 1; i < 12; i++) {
                this.items.push({
                    title: '123456',
                    note: 'Customer '+i,
                    icon: this.icons[0]
                });
            }
        }else{
            for (let i = 1; i < 12; i++) {
                this.items.push({
                    title: '123456',
                    note: 'Supplier '+i,
                    icon: this.icons[0]
                });
            }
        }*/
    }

    /* itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
  */
}


@Component({
    selector: 'page-speechdet',
    templateUrl: 'speechdet.html'
})
export class SpeechdetPage {
    selectedItem: any;
    icons: string[];
    items: Array<{title: string, note: string, icon: string}>;
    title:string;
    op1:number;
    myDate:string;
    constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('name');
        //       let name = navParams.get('name'); 
        console.log('this.selectedItem '+JSON.stringify(this.selectedItem));
        console.log('this.opt '+JSON.stringify(this.op1));

        // Let's populate this page with some filler content for funzies
        this.icons = ['contact', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
                      'american-football', 'boat', 'bluetooth', 'build'];
        var datePipe = new Date();
        this.myDate = new Date().toISOString();
        this.title='Speech Detail';

    }
    editSpeech() {
        this.navCtrl.push(AddSpeechPage,{name:this.selectedItem});
    }
}