import { Component } from '@angular/core';
import { NavController, NavParams,Platform, ModalController,ViewController  } from 'ionic-angular';
import { AddNoticePage } from '../addnotice/addnotice';

@Component({
    selector: 'page-listnotice',
    templateUrl: 'listnotice.html'
})
export class ListNoticePage {
    selectedItem: any;
    icons: string[];
    items: Array<{title: string, note: string, icon: string}>;
    title:string;
    constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('name');
        //       let name = navParams.get('name'); 
        console.log('this.selectedItem '+JSON.stringify(this.selectedItem));

        // Let's populate this page with some filler content for funzies
        this.icons = ['contact', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
                      'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];

        this.title='Notices';
        for (let i = 1; i < 11; i++) {
            this.items.push({
                title: 'Notices ' + i,
                note: 'img/image3.jpg',
                icon: this.icons[0]
            });
        } 

    }
    addSup() {
        // That's right, we're pushing to ourselves!
        console.log('addSup for '+this.selectedItem);
        this.navCtrl.push(AddNoticePage,{name:this.selectedItem});
    }
    openDet() {
        this.navCtrl.push(NoticedetPage,{name:this.selectedItem});
        //        let modal = this.modalCtrl.create(ModalContentPage, characterNum);
        //        modal.present();
    }
    openAttachModal(characterNum) {

        let modal = this.modalCtrl.create(ModalAttachPage, characterNum);
        modal.present();
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
    selector: 'page-noticedet',
    templateUrl: 'noticedet.html'
})
export class NoticedetPage {
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
        this.title='Notice Detail';


    }
}


@Component({
    selector: 'page-model',
    templateUrl: 'modal-attach.html'
})
export class ModalAttachPage {
    character;
    items: Array<{title: string, note: string }>;

    constructor(
    public platform: Platform,
     public params: NavParams,
     public viewCtrl: ViewController
    ) {
        this.items = [];
        this.items.push({
            title: 'Apple',
            note: 'Consumable',
        });
        this.items.push({
            title: 'Orrange',
            note: 'Consumable',
        });
        this.items.push({
            title: 'Grape',
            note: 'Consumable',
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}