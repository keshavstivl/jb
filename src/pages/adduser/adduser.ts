import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { ListuserPage } from '../listuser/listuser';
import {Param} from '../../service/dataservice';
import { CONSTANT} from '../constant';
import {DataService} from '../../service/dataservice';

@Component({
    selector: 'page-adduser',
    templateUrl: 'adduser.html'
})
export class AddUserPage {
    selectedItem: any;
    title:string;
    user_id:string;
    email:string;
    pass:string;
    name:string;
    type:string;

    constructor(public navCtrl: NavController, public navParams: NavParams,public data: DataService,public loadingCtrl: LoadingController) {
        this.selectedItem = navParams.get('name');
        this.user_id = navParams.get('user_id');

        this.title='Add User';
        this.type="SE";


    }
    openUsers(){
        this.navCtrl.push(ListuserPage,{name:3,user_id:this.user_id});

    }
    onChange(op1) {
        console.log(op1);

        if(op1=="u1"){
            this.type="SE";
        }else if(op1=="u2"){
            this.type="EX";
        }else if(op1=="u3"){
            this.type="E";
        } 
    }

    addUser(){
        let parames : Array<Param>=new Array<Param>();
        console.log(this.email+":"+this.pass);
        if(this.email!=null&&this.pass!=null&&this.name!=null){
            parames.push({'key':'user_id','value':this.user_id});
            parames.push({'key':'email','value':this.email});
            parames.push({'key':'full_name','value':this.name});
            parames.push({'key':'password','value':this.pass});
            parames.push({'key':'user_type','value':this.type});
            parames.push({'key':'word_no','value':"0"});
            parames.push({'key':'device_type','value':CONSTANT.device});
            parames.push({'key':'device_token_id','value':CONSTANT.defaultToken});
            let loading = this.loadingCtrl.create({
                content: 'Please wait...'
            });

            loading.present();
            this.data.postData(parames,"createUser",(dataa) => {
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
