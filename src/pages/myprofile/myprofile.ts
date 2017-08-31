import { Component } from '@angular/core';
import { NavController, NavParams,Platform, ModalController,ViewController ,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CONSTANT} from '../constant';
import {Param} from '../../service/dataservice';
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
        parames.push({ 'key': 'device_token_id', 'value': CONSTANT.defaultToken });
        let loading = this.data.getLoading("");
        loading.present();
        this.data.postData(parames,"logout",(dataa) => {
            // do something here
            let res =JSON.parse(dataa._body)
            console.log(res);

            if(res.Ack==1){
                this.storage.set('user', null)
                    .then(() => {
                    console.log('Stored user Data  cleard!')
                    //                        this.navCtrl.pop();
                    loading.dismiss();this.data.presentToast(res.msg);
                    this.navCtrl.setRoot(HomePage,{name:3});
                },error =>{console.error('Error clearing', error);loading.dismiss();});

            }else{
                loading.dismiss();this.data.presentToast(res.msg);
            }
        });

    }
    openEdit() {
        //        let modal = this.modalCtrl.create(ModalDemandPage, characterNum);
        //        modal.present();
        this.navCtrl.push(EditProfPage, {item: 0,user_data:this.txt});
    }
    openChangePass() {
        //        let modal = this.modalCtrl.create(ModalDemandPage, characterNum);
        //        modal.present();
        this.navCtrl.push(ChangePassPage, {item: 0,user_id:this.txt.user_id});
    }

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
    user_data:any;

    constructor(public navCtrl: NavController, public navParams: NavParams,public data: DataService,public modalCtrl: ModalController) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('name');
        this.user_data = navParams.get('user_data');
        console.log('this.user_data '+JSON.stringify(this.user_data));

        this.title='Edit Profile';



    }

    updateProf(){
        let parames : Array<Param>=new Array<Param>();
        console.log(this.user_data.email+":"+this.user_data.full_name);
        if(this.user_data.email!=null&&this.user_data.full_name!=null&&this.user_data.phone!=null){
            parames.push({'key':'user_id','value':this.user_data.user_id});
            parames.push({'key':'email','value':this.user_data.email});
            parames.push({'key':'full_name','value':this.user_data.full_name});
            parames.push({'key':'phone','value':this.user_data.phone});
            parames.push({'key':'user_type','value':"C"});
            parames.push({'key':'location','value':this.user_data.office_address});
            parames.push({'key':'office_address','value':this.user_data.office_address});
            parames.push({'key':'portfolios','value':this.user_data.portfolios});
            parames.push({'key':'fax_nos','value':this.user_data.fax_nos});
            parames.push({'key':'epabx_nos','value':this.user_data.epabx_nos});
            parames.push({'key':'ext','value':this.user_data.ext});
            parames.push({'key':'lat','value':"11"});
            parames.push({'key':'lang','value':"11"});
            parames.push({'key':'device_type','value':CONSTANT.device});
            parames.push({'key':'device_token_id','value':CONSTANT.defaultToken});
            let loading = this.data.getLoading("");
            loading.present();

            this.data.postData(parames,"updateMayorProfile",(dataa) => {
                // do something here
                console.log(dataa);
//                if(dataa.status==200){
                    let res =JSON.parse(dataa._body)
                    console.log(res);
                    if(res.Ack==1){
                        loading.dismiss() ;
                        this.data.presentToast(res.msg);
                    }else{
                        loading.dismiss();this.data.presentToast(res.msg);
                    }
//                }else{
//                    loading.dismiss();this.data.presentToast(dataa.statusText);
//                }
            });

        }else this.data.presentToast("Please enter all the fields values.");
    }
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
    email:string;
    oldPass:string;
    newPass:string;
    user_id:string;

    constructor(public navCtrl: NavController, public navParams: NavParams,public data: DataService, public loadingCtrl: LoadingController) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('name');
        //       let name = navParams.get('name'); 
        console.log('this.selectedItem '+JSON.stringify(this.selectedItem));

        this.title='Change Passwprd';
        this.user_id = navParams.get('user_id');



    }
    changePass(){
        let parames : Array<Param>=new Array<Param>();
        console.log(this.email+":"+this.oldPass);
        if(this.email!=null&&this.oldPass!=null&&this.newPass!=null){
            parames.push({'key':'user_id','value':this.user_id});
            parames.push({'key':'email','value':this.email});
            parames.push({'key':'old_pwd','value':this.oldPass});
            parames.push({'key':'new_pwd','value':this.newPass});
            parames.push({'key':'device_type','value':CONSTANT.device});
            parames.push({'key':'device_token_id','value':CONSTANT.defaultToken});
            let loading = this.loadingCtrl.create({
                content: 'Please wait...'
            });

            loading.present();
            this.data.postData(parames,"changepwd",(dataa) => {
                // do something here
                let res =JSON.parse(dataa._body)
                console.log(res);
                if(res.Ack==1){
                    loading.dismiss() ;
                    this.data.presentToast(res.msg);
                }else{
                    loading.dismiss();this.data.presentToast(res.msg);
                }
            });

        }else this.data.presentToast("Please enter all the fiels values.");
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
