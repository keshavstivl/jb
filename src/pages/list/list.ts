import { Component } from '@angular/core';
import { NavController, NavParams,Platform, ModalController,ViewController,LoadingController } from 'ionic-angular';
import { AddEventPage } from '../addevent/addevent';
import { AddSpeechPage } from '../addspeech/addspeech';
import { AddMediaPage } from '../addmedia/addmedia';
import {Param} from '../../service/dataservice';
import { CONSTANT} from '../constant';
import {DataService} from '../../service/dataservice';

@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {
    selectedItem: any;
    icons: string[];
    items: Array<{title: string, note: string, date: Date}>;
    user_id:string;
    title:string;
    notuser:boolean;
    constructor(public navCtrl: NavController, public navParams: NavParams,public data: DataService,public loadingCtrl: LoadingController) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('name');
        this.user_id = navParams.get('user_id');
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
            /* for (let i = 1; i < 5; i++) {
                this.items.push({
                    title: 'Speeches ' + i,
                    note: 'img/image1.jpg',
                    icon: this.icons[0]
                });
            }*/
            this.getList(this.selectedItem,"listMySpeech");
        }
        else if(this.selectedItem==3){
            this.title='Media Coverage';
            /*for (let i = 1; i < 11; i++) {
                this.items.push({
                    title: 'Media Coverage ' + i,
                    note: 'img/image2.jpg',
                    icon: this.icons[0]
                });
            }*/ 
            this.getList(this.selectedItem,"listMyMediaCoverage");
        }
        else if(this.selectedItem==4){
            this.title='Events';
            /*for (let i = 1; i < 11; i++) {
                this.items.push({
                    title: 'Events ' + i,
                    note: 'img/image3.jpg',
                    icon: this.icons[0]
                });
            } */
            this.getList(this.selectedItem,"listMyEvents");
        }

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

    getList(i,sub){
        let parames : Array<Param>=new Array<Param>();

        parames.push({'key':'user_id','value':this.user_id});
        parames.push({'key':'device_type','value':CONSTANT.device});
        parames.push({'key':'device_token_id','value':CONSTANT.defaultToken});
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();
        this.data.postData(parames,sub,(dataa) => {
            // do something here
            let res =JSON.parse(dataa._body)
            console.log(res);

            if(res.Ack==1){
                if(i==2){
                    for(let ob of res.speechs)
                        this.items.push({
                            title: ob.speech_title,
                            note: ob.speech_image,
                            date: ob.speeach_date
                        });
                }else if(i==3){
                    for(let ob of res.medias)
                        this.items.push({
                            title: ob.media_title,
                            note: ob.media_image,
                            date: ob.media_date
                        });
                }else if(i==4){
                    for(let ob of res.events)
                        this.items.push({
                            title: ob.event_title,
                            note: ob.event_image,
                            date: ob.event_date
                        });
                }
                 
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