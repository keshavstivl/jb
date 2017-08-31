import { Component } from '@angular/core';
import { NavController, NavParams,Platform, ModalController,ViewController,LoadingController  } from 'ionic-angular';
import {Param} from '../../service/dataservice';
import { CONSTANT} from '../constant';
import {DataService} from '../../service/dataservice';

@Component({
    selector: 'page-listfeedback',
    templateUrl: 'listfeedback.html'
})
export class ListFeedbacksPage {
    selectedItem: any;
    icons: string[];
    items: Array<{title: string, note: string, date: string}>;
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
        if(this.selectedItem==2){
            this.title='All Feedbacks';
            this.getList("listAllGrivance","ALL");
        }
        else if(this.selectedItem==3){
            this.title='Pending Feedbacks';
            this.getList("listAllGrivance","0");
        }
        else if(this.selectedItem==4){
            this.title='Resolved Feedbacks';
            this.getList("listAllGrivance","2");
        }
        else{
            this.title='New Feedbacks';
            this.getList("listAllGrivance","0");
        }
    }
    openDetails() {
        this.navCtrl.push(FeedbackDetPage, {item:1});
        //        let modal = this.modalCtrl.create(ModalContentPage, characterNum);
        //        modal.present();
    }
    getList(sub,status){
        let parames : Array<Param>=new Array<Param>();

        parames.push({'key':'user_id','value':this.user_id});
        parames.push({'key':'user_id','value':this.user_id});
        parames.push({'key':'status','value':status});
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
                this.items=res.grivances;
                /*for(let ob of res.grivances)
                    this.items.push({
                        title: ob.message_title,
                        note: ob.message_image,
                        date: ob.message_date
                    });*/
                loading.dismiss() ;
                if(this.items.length==0)
                    this.data.presentToast("No feedbacks found");
                else
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