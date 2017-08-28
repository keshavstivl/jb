import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
 
@Component({
    selector: 'page-listprod',
    templateUrl: 'listprod.html'
})
export class ListprodPage {
    selectedItem: any;
    icons: string[];
    items: Array<{title: string, note: string, icon: string}>;
    title:string;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('name');
        //       let name = navParams.get('name'); 
        console.log('this.selectedItem '+JSON.stringify(this.selectedItem));

        // Let's populate this page with some filler content for funzies
        this.icons = ['contact', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
                      'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];

        this.title='Products/Services';
        for (let i = 1; i < 11; i++) {
            this.items.push({
                title: 'Product ' + i,
                note: 'Total Gaz',
                icon: this.icons[0]
            });
        }

    }

    addProd() {
        // That's right, we're pushing to ourselves!
        console.log('addProd');
//        this.navCtrl.push(AddprodPage,{name:this.selectedItem});

    }
    /* itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
  */
}
