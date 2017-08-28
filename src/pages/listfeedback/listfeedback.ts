import { Component } from '@angular/core';
import { NavController, NavParams,Platform, ModalController,ViewController  } from 'ionic-angular';

@Component({
    selector: 'page-listfeedback',
    templateUrl: 'listfeedback.html'
})
export class ListFeedbacksPage {
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
        if(this.selectedItem==2)
            this.title='All Feedbacks';
        else if(this.selectedItem==3)
            this.title='Pending Feedbacks';
        else if(this.selectedItem==4)
            this.title='Resolved Feedbacks';
        else
            this.title='New Feedbacks';

        for (let i = 1; i < 12; i++) {
            this.items.push({
                title: '123456',
                note: 'Type '+i,
                icon: this.icons[0]
            });
        }

    }
    openDetails() {
        this.navCtrl.push(FeedbackDetPage, {item:1});
        //        let modal = this.modalCtrl.create(ModalContentPage, characterNum);
        //        modal.present();
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
    selector: 'page-feedbackdetail',
    templateUrl: 'feedbackdetail.html'
})
export class FeedbackDetPage {
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

        this.title='Feedback Details';
    }
    openAssign() {
        this.navCtrl.push(FeedbackAssignPage, {item:1});
        //        let modal = this.modalCtrl.create(ModalContentPage, characterNum);
        //        modal.present();
    }



}

@Component({
    selector: 'page-feedbackassign',
    templateUrl: 'feedbackassign.html'
})
export class FeedbackAssignPage {
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

        this.title='Feedback Assign';



    }

}