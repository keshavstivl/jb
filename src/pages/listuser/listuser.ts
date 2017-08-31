import { Component } from '@angular/core';
import { NavController, NavParams,Platform, ModalController,ViewController,LoadingController  } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {Param} from '../../service/dataservice';
import { CONSTANT} from '../constant';
import {DataService} from '../../service/dataservice';

@Component({
    selector: 'page-listuser',
    templateUrl: 'listuser.html'
})
export class ListuserPage {
    selectedItem: any;
    icons: string[];
    items: Array<{title: string, note: string, icon: string}>;
    title:string;
    user_id:string;

    constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public data: DataService,public loadingCtrl: LoadingController) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('name');
        this.user_id = navParams.get('user_id');
        console.log('this.selectedItem '+JSON.stringify(this.selectedItem));

        // Let's populate this page with some filler content for funzies
        this.icons = ['contact', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
                      'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];

        this.title='All Users';


        /*for (let i = 1; i < 8; i++) {
            this.items.push({
                title: 'User '+i,
                note: 'Type'+i,
                icon: ''
            });
        }

*/
        this.getList();
    }
    openModal(characterNum) {
        var    selectedItem = characterNum.charNum;
        console.log('characterNum '+JSON.stringify(characterNum)+' :'+selectedItem);
        if(selectedItem==3){
            let modal = this.modalCtrl.create(ModalItemPage, characterNum);
            modal.present();
        }
        else if(selectedItem==8){
            let modal = this.modalCtrl.create(ModalBrandPage, characterNum);
            modal.present();
        }
    }

    getList(){
        let parames : Array<Param>=new Array<Param>();

        parames.push({'key':'user_id','value':this.user_id});
        parames.push({'key':'user_type','value':"ALL"});
        parames.push({'key':'device_type','value':CONSTANT.device});
        parames.push({'key':'device_token_id','value':CONSTANT.defaultToken});
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();
        this.data.postData(parames,"listUsers",(dataa) => {
            // do something here
            let res =JSON.parse(dataa._body)
            console.log(res);

            if(res.Ack==1){
                this.items=res.all_users;
                /*for(let ob of res.messages)
                    this.items.push({
                        title: ob.message_title,
                        note: ob.message_image,
                        date: ob.message_date
                    });
*/

                loading.dismiss() ;
                this.data.presentToast(res.msg);
            }else{
                loading.dismiss();this.data.presentToast(res.msg);
            }
        });

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
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {
    selectedItem: any;
    icons: string[];
    items: Array<{title: string, note: string, icon: string}>;
    title:string;
    constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('name');
        //       let name = navParams.get('name'); 
        console.log('this.selectedItem '+JSON.stringify(this.selectedItem));

        // Let's populate this page with some filler content for funzies
        this.icons = ['contact', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
                      'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];

        this.title='About App';

        this.items.push({
            title: 'Feedback',
            note: 'Apple',
            icon: this.icons[0]
        });
        this.items.push({
            title: 'FAQ',
            note: 'Apple',
            icon: this.icons[0]
        });
        this.items.push({
            title: 'Rate us on Google Play',
            note: 'Apple',
            icon: this.icons[0]
        });
        this.items.push({
            title: 'Terms of service',
            note: 'Apple',
            icon: this.icons[0]
        });this.items.push({
            title: 'Contact Us',
            note: 'Apple',
            icon: this.icons[0]
        });

    }
    presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Select Reason',
            buttons: [
                {
                    text: 'Stock Received',
                    handler: () => {
                        console.log('Stock Received clicked');
                    }
                },{
                    text: 'Damage',
                    role: 'destructive',
                    handler: () => {
                        console.log('Damage clicked');
                    }
                },{
                    text: 'Retun',
                    handler: () => {
                        console.log('Retun clicked');
                    }
                },{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }
    showPrompt() {
        let prompt = this.alertCtrl.create({
            title: 'Adjustment',
            message: "",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Adjustment value',
                    type:'number'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'OK',
                    handler: data => {
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    }

    openModal(characterNum) {
        var    selectedItem = characterNum.charNum;
        console.log('characterNum '+JSON.stringify(characterNum)+' :'+selectedItem);
        if(selectedItem==8){
            let modal = this.modalCtrl.create(ModalBrandPage, characterNum);
            modal.present();
        }
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
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    selectedItem: any;
    icons: string[];
    items: Array<{title: string, note: string, icon: string}>;
    title:string;
    constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('name');
        //       let name = navParams.get('name'); 
        console.log('this.selectedItem '+JSON.stringify(this.selectedItem));

        // Let's populate this page with some filler content for funzies
        this.icons = ['contact', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
                      'american-football', 'boat', 'bluetooth', 'build'];
        this.title='Settings';


    }
    presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Track',
            buttons: [
                {
                    text: 'Yes',
                    handler: () => {
                        console.log('Stock Received clicked');
                    }
                },{
                    text: 'No',
                    role: 'destructive',
                    handler: () => {
                        console.log('Damage clicked');
                    }
                },{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }
    showPrompt() {
        let prompt = this.alertCtrl.create({
            title: 'Alert At',
            message: "",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Value',
                    type:'number'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'OK',
                    handler: data => {
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    }

    openModal(characterNum) {
        var    selectedItem = characterNum.charNum;
        console.log('characterNum '+JSON.stringify(characterNum)+' :'+selectedItem);
        if(selectedItem==3){
            let modal = this.modalCtrl.create(ModalBrandPage, characterNum);
            modal.present();
        }
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
    selector: 'page-model',
    templateUrl: 'modal.html'
})
export class ModalItemPage {
    character;
    items: Array<{title: string, note: string, icon: string}>;

    constructor(public navCtrl: NavController,public platform: Platform,public params: NavParams,public viewCtrl: ViewController,public modalCtrl: ModalController) {
        this.items = [];
        for (let i = 1; i < 4; i++) {
            this.items.push({
                title: 'Variation '+i,
                note: '132'+i,
                icon: ''
            });
        }
    }
    openModal(characterNum) {
        var    selectedItem = characterNum.charNum;
        console.log('characterNum '+JSON.stringify(characterNum)+' :'+selectedItem);
        if(selectedItem==8){
            let modal = this.modalCtrl.create(ModalBrandPage, characterNum);
            modal.present();
        }
    }

    openVar(){
        //        this.navCtrl.push(ListBrandPage,{name:3});
    }
    openStockAlert(){
        //        this.navCtrl.push(ListstockalertPage,{name:4});
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
@Component({
    selector: 'page-modal-brand',
    templateUrl: 'modal-brand.html'
})
export class ModalBrandPage {
    character;

    constructor(
    public platform: Platform,
     public params: NavParams,
     public viewCtrl: ViewController
    ) {

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}