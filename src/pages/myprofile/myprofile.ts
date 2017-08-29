import { Component } from '@angular/core';
import { NavController, NavParams,Platform, ModalController,ViewController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Param} from '../../service/dataservice';
import { CONSTANT} from '../constant';
import {DataService} from '../../service/dataservice';
import { HomePage } from '../home/home';

@Component({
    selector: 'page-myprofile',
    templateUrl: 'myprofile.html'
})
export class MyprofilePage {
    selectedItem: any;
    title:string;
    txt:any;
    op1:number;

    constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public data: DataService,public storage: Storage) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('name');
        //       let name = navParams.get('name'); 
        console.log('this.selectedItem '+JSON.stringify(this.selectedItem));
        console.log('this.opt '+JSON.stringify(this.op1));
        this.title='Myprofile';

        this.txt ='HELLO'

        storage.get('user')
            .then( data => {
            console.log(data)
            let user=data;
            if(user!=null)
                this.txt=user.UserDetails;
            else
                this.txt ='HELLO'

        }, error => {
            console.error(error)
            this.txt ='HELLO'

        });

    }
    logout(){
        let parames : Array<Param>=new Array<Param>();

        parames.push({'key':'user_id','value':this.txt.user_id});
        parames.push({'key':'device_type','value':CONSTANT.device});
        parames.push({'key':'device_token_id','value':CONSTANT.defaultToken});

        this.data.postData(parames,"logout",(dataa) => {
            // do something here
            let res =JSON.parse(dataa._body)
            console.log(res);

            if(res.Ack==1){
                this.storage.clear()
                    .then(() => {
                    console.log('Stored user Data  cleard!')
                    //                        this.navCtrl.pop();
                    this.data.presentToast(res.msg);
                    this.navCtrl.setRoot(HomePage,{name:3});
                },error => console.error('Error clearing', error));

            }else{
                this.data.presentToast(res.msg);
            }
        });

    }
    openEdit() {
        //        let modal = this.modalCtrl.create(ModalDemandPage, characterNum);
        //        modal.present();
        this.navCtrl.push(EditProfPage, {item: 0});
    }

    openChangePass() {
        //        let modal = this.modalCtrl.create(ModalDemandPage, characterNum);
        //        modal.present();
        this.navCtrl.push(ChangePassPage, {item: 0});
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
    selector: 'page-editprof',
    templateUrl: 'editprof.html'
})
export class EditProfPage {
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

        this.title='Edit Profile';



    }
    openDvModal(characterNum) {
        //        let modal = this.modalCtrl.create(ModalDVPage, characterNum);
        //        modal.present();
    }


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
    selector: 'page-changepass',
    templateUrl: 'changepass.html'
})
export class ChangePassPage {
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

        this.title='Change Passwprd';



    }

}

@Component({
    selector: 'page-model-add',
    templateUrl: 'modal-add.html'
})
export class ModalAddItemPage {
    character;
    items: Array<{title: string, note: string, icon: string}>;

    constructor(
    public platform: Platform,
     public params: NavParams,
     public viewCtrl: ViewController
    ) {
        /*this.items = [];
        for (let i = 1; i < 4; i++) {
            this.items.push({
                title: 'Item '+i,
                note: ''+i,
                icon: ''
            });
        }*/
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
@Component({
    selector: 'page-modeldv',
    templateUrl: 'modal-viewdv.html'
})
export class ModalDVPage {
    character;
    items: Array<{title: string, note: string, icon: string}>;

    constructor(
    public platform: Platform,  public params: NavParams,
     public viewCtrl: ViewController,public modalCtrl: ModalController
    ) {
        this.items = [];
        for (let i = 1; i < 4; i++) {
            this.items.push({
                title: 'Item '+i,
                note: ''+i,
                icon: ''
            });
        }
    }
    openAddModal(characterNum) {
        let modal = this.modalCtrl.create(ModalAddItemPage, characterNum);
        modal.present();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}