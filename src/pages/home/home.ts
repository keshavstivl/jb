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


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    title:string;
    lang:string;

    constructor(platform: Platform,public navCtrl: NavController,public translate: TranslateService,public nativeStorage: NativeStorage) {
        console.log('CONSTANT.message2: '+ CONSTANT.message2);
        this.title='HOME';
        platform.ready().then((readySource) => {
            console.log('Platform ready from', readySource);
            // Platform now ready, execute any required native code
            if (platform.is('cordova')) {
                // You're on a device, call the native plugins. Example: 
                nativeStorage.getItem('lang')
                    .then( data => {
                    console.log(data)
                    this.lang=data;
                this.translate.use(this.lang);
                }, error => console.error(error));
                if(this.lang==null){
                    translate.setDefaultLang('bn');
                    nativeStorage.setItem('lang', "bn")
                        .then(() => console.log('Stored lang Data!'), 
                              error => console.error('Error storing lang', error));
                }
            } else {
                // You're testing in browser, do nothing or mock the plugins' behaviour.
                console.log('Native pluging will not work on browser!')
            }
        });


    }
    viewSup(i) {
        // That's right, we're pushing to ourselves!
        console.log('viewSup: '+i);
        if(i==1)
            this.navCtrl.push(MyprofilePage,{name:3});
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
         this.nativeStorage.setItem('lang', "en")
             .then(() => {console.log('Stored lang Data!')
                          this.nativeStorage.getItem('lang')
                              .then( data => {
                              console.log(data)
                              this.lang=data;
                          }, error => console.error(error));
                         }, 
                   error => console.error('Error storing lang', error));
        }// use it to change the lang
        else 
        {this.translate.use('bn');
         this.nativeStorage.setItem('lang', "bn")
             .then(() => {console.log('Stored lang Data!')
                          this.nativeStorage.getItem('lang')
                              .then( data => {
                              console.log(data)
                              this.lang=data;
                          }, error => console.error(error));}, 
                   error => console.error('Error storing lang', error));
        }
    }
}
