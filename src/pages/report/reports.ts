import { Component } from '@angular/core';
import { NavController, NavParams,Platform, ModalController,ViewController  } from 'ionic-angular';

@Component({
    selector: 'page-reports',
    templateUrl: 'reports.html'
})
export class ListReportDVPage {
    selectedItem: any;
    icons: string[];
    items: Array<{title: string, note: string, icon: string}>;
    title:string;
    op1:number;
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

        this.title='Report: Pending DV';
        for (let i = 1; i < 12; i++) {
            this.items.push({
                title: '123456',
                note: 'Customer '+i,
                icon: this.icons[0]
            });
        }


    }
    

    onChange(op1) {
        console.log(op1);
        this.items = [];
        if(op1==1){
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
        }
    }
 
}
@Component({
    selector: 'page-liststocklow',
    templateUrl: 'liststocklow.html'
})
export class ListStockLowPage {
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
        this.myDate = new Date().toISOString();

        // Let's populate this page with some filler content for funzies
        this.icons = ['contact', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
                      'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];

        this.title='Report: Stock Low';
        for (let i = 1; i < 12; i++) {
            this.items.push({
                title: '123456',
                note: 'Variation '+i,
                icon: this.icons[0]
            });
        }


    }
   /* openDvModal(characterNum) {
        let modal = this.modalCtrl.create(ModalDVPage, characterNum);
        modal.present();
    }*/


    onChange(op1) {
        console.log(op1);
        /*this.items = [];
        if(op1==1){
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
    selector: 'page-listtally',
    templateUrl: 'listtally.html'
})
export class ListTallyPage {
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
        this.myDate = new Date().toISOString();

        // Let's populate this page with some filler content for funzies
        this.icons = ['contact', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
                      'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];

        this.title='Report: Tally Card';
        for (let i = 1; i < 12; i++) {
            this.items.push({
                title: '123456',
                note: '11'+i,
                icon: this.icons[0]
            });
        }


    }
   /* openDvModal(characterNum) {
        let modal = this.modalCtrl.create(ModalDVPage, characterNum);
        modal.present();
    }*/


    onChange(op1) {
        console.log(op1);
        /*this.items = [];
        if(op1==1){
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
