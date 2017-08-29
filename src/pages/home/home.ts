import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { ListNoticePage } from '../listnotice/listnotice';
import { CONSTANT} from '../constant';
import { LoginPage } from '../login/login';
import { ListFeedbacksPage } from '../listfeedback/listfeedback';
import { TranslateService } from '@ngx-translate/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular';
import { MyprofilePage } from '../myprofile/myprofile';
import { Storage } from '@ionic/storage';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    title:string;
    lang:string;
    user:any;
    txt:string;

    constructor(platform: Platform,public navCtrl: NavController,public translate: TranslateService,public nativeStorage: Storage) {
        //        console.log('CONSTANT.message2: '+ CONSTANT.message2);
        this.title='HOME';
        platform.ready().then((readySource) => {
            console.log('Platform ready from', readySource);
            // Platform now ready, execute any required native code
            // You're on a device, call the native plugins. Example: 
            nativeStorage.get('lang')
                .then( data => {
                console.log(data)
                this.lang=data;
                this.translate.use(this.lang);
                if(this.lang==null){
                    translate.setDefaultLang('bn');
                    nativeStorage.set('lang', "bn")
                        .then(() => console.log('Stored lang Data!'), 
                              error => console.error('Error storing lang', error));
                }
            }, error => {console.error(error);
                         translate.setDefaultLang('bn');
                         nativeStorage.set('lang', "bn")
                             .then(() => console.log('Stored lang Data!'), 
                                   error => console.error('Error storing lang', error))});


            /*if (platform.is('cordova')) {

            } else {
                // You're testing in browser, do nothing or mock the plugins' behaviour.
                console.log('Native pluging will not work on browser!')
            }*/
            this.txt ='HELLO'

            nativeStorage.get('user')
                .then( data => {
                console.log(data)
                this.user=data;
                if(this.user!=null)
                    this.txt=this.user.UserDetails.full_name;
                else
                    this.txt ='HELLO'

            }, error => {
                console.error(error)
                this.txt ='HELLO'

            });

        });


    }
    viewSup(i) {
        // That's right, we're pushing to ourselves!
        console.log('viewSup: '+i);
        if(i==1)
           if(this.user!=null)
                    this.navCtrl.push(MyprofilePage,{name:3});
                else
                    this.navCtrl.push(LoginPage,{name:3});
        else if(i==5)
            this.navCtrl.push(ListNoticePage,{name:i});
        else if(i==6)
            this.navCtrl.push(ListFeedbacksPage,{name:i});
        else 
            this.navCtrl.push(ListPage,{name:i});


    }

    changeLang(){


        if(this.lang=='bn')
        {this.translate.use('en');
         this.nativeStorage.set('lang', "en")
             .then(() => {console.log('Stored lang Data!')
                          this.nativeStorage.get('lang')
                              .then( data => {
                              console.log(data)
                              this.lang=data;
                          }, error => console.error(error));
                         }, 
                   error => console.error('Error storing lang', error));
        }// use it to change the lang
        else 
        {this.translate.use('bn');
         this.nativeStorage.set('lang', "bn")
             .then(() => {console.log('Stored lang Data!')
                          this.nativeStorage.get('lang')
                              .then( data => {
                              console.log(data)
                              this.lang=data;
                          }, error => console.error(error));}, 
                   error => console.error('Error storing lang', error));
        }
    }
}
