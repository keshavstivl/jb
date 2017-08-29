import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DataService} from '../../service/dataservice';
import { ForgotPassPage } from '../forgot/forgot';
import {Param} from '../../service/dataservice';
import { CONSTANT} from '../constant';
import { ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [DataService]
})
export class LoginPage {
    selectedItem: any;
    title:string;
    email:string;
    pass:string;
    data:DataService;

    constructor(public navCtrl: NavController, public navParams: NavParams,data: DataService,private toastCtrl: ToastController,
                 public storage: Storage) {
        this.selectedItem = navParams.get('name');
        this.data=data;
        this.title='Login';
        this.email="chairman@jb.com";
        this.pass="123456";

    }

    openForgot(){
        this.navCtrl.push(ForgotPassPage,{name:3});

    }

    login(){
        let parames : Array<Param>=new Array<Param>();
        console.log(this.email+":"+this.pass);
        if(this.email!=null&&this.pass!=null){
            parames.push({'key':'email','value':this.email});
            parames.push({'key':'password','value':this.pass});
            parames.push({'key':'device_type','value':CONSTANT.device});
            parames.push({'key':'device_token_id','value':CONSTANT.defaultToken});
            parames.push({'key':'pn_id','value':'0'});
            parames.push({'key':'user_type','value':CONSTANT.userType});


            this.data.postData(parames,"appsignin",(dataa) => {
                // do something here
                let res =JSON.parse(dataa._body)
                console.log(res);

                if(res.Ack==1){
                    this.storage.set('user', res)
                        .then(() => {console.log('Stored user Data!')
                                     this.navCtrl.setRoot(HomePage,{name:3});
                                    }, 
                              error => console.error('Error storing lang', error));

                }else{
                    this.presentToast(res.msg);
                }
            });
        }else this.presentToast("Please enter email and password.");
    }
    presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }
}
