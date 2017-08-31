import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DataService} from '../../service/dataservice';
import {Param} from '../../service/dataservice';
import { CONSTANT} from '../constant';

@Component({
    selector: 'page-forgot',
    templateUrl: 'forgot.html',
    providers: [DataService]
})
export class ForgotPassPage {
    selectedItem: any;
    title:string;
    email:string;
    phone:string;
    user_id:string;

    constructor(public navCtrl: NavController, public navParams: NavParams,public data: DataService ) {
        this.selectedItem = navParams.get('name');

        this.title='Forgot Password';
         


    }
    resetPass(){
        let parames : Array<Param>=new Array<Param>();
        console.log(this.email+":"+this.phone);
        if(this.email!=null&&this.phone!=null ){
            parames.push({'key':'user_id','value':this.user_id});
            parames.push({'key':'email','value':this.email});
            parames.push({'key':'mobile','value':this.phone});
            parames.push({'key':'device_type','value':CONSTANT.device});
            parames.push({'key':'device_token_id','value':CONSTANT.defaultToken});
            let loading = this.data.getLoading("");

            loading.present();
            this.data.postData(parames,"forgetpassword",(dataa) => {
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
