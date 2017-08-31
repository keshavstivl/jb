import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ListFeedbacksPage } from '../pages/listfeedback/listfeedback';
import { AddUserPage } from '../pages/adduser/adduser';
import { AboutPage } from '../pages/listuser/listuser';
import { SettingsPage } from '../pages/listuser/listuser';
import { MyprofilePage } from '../pages/myprofile/myprofile';

import { CONSTANT } from '../pages/constant';
import { LoginPage } from '../pages/login/login';
import { TranslateService } from '@ngx-translate/core';
//import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;
    pages: Array<{title: string, component: any,icon:string}>;
    lang:string;
    txt:string;
    user:any;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public translate: TranslateService,public nativeStorage: Storage ) {
        this.initializeApp();
        this.txt ='SignIn'

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage ,icon:'home'},
            { title: this.txt, component: LoginPage ,icon:'contact'},
            { title: 'AllFeedbacks', component: ListFeedbacksPage ,icon:'list-box'},
            { title: 'PendingFeedbacks', component: ListFeedbacksPage ,icon:'list-box'},
            { title: 'ResolvedFeedbacks', component: ListFeedbacksPage ,icon:'list-box'},
            { title: 'ManageUsers', component: AddUserPage ,icon:'contact'},
            { title: 'Settings', component: SettingsPage ,icon:'settings'},
            { title: 'About', component: AboutPage,icon:'text' }
            /*
            { title: 'Service Report', component: ListServiceReportPage },
            { title: 'Receipts', component: ListReceiptsPage },
            { title: 'Taxes', component: ListTaxesPage },
            { title: 'Discounts', component: ListDiscountsPage },
            { title: 'Report: Pending DV', component: ListReportDVPage },
            { title: 'Report: Stock Low', component: ListStockLowPage },
            { title: 'Report: Tally Card', component: ListTallyPage }
*/
        ];

    }

    menuOpened() {
        console.log("menuOpened! MyApp");
        this.nativeStorage.get('user')
            .then( data => {
            this.user=data;
            console.log(data)
            //                console.log("Main user "+this.user.UserDetails.full_name)
            if(this.user!=null){
                this.txt=this.user.UserDetails.full_name;
                this.pages[1].title=this.txt;
                this.pages[1].component=MyprofilePage;
            }else{  
                this.txt ='SignIn'
                this.pages[1].title=this.txt;
                this.pages[1].component=LoginPage;
            }

        }, error => {
            console.error(error)
            this.txt ='SignIn'
            this.pages[1].title=this.txt;
            this.pages[1].component=LoginPage;
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            // Platform now ready, execute any required native code
            if (this.platform.is('cordova')) {
                // You're on a device, call the native plugins. Example: 
                this.nativeStorage.get('lang')
                    .then( data => {
                    console.log(data);
                    this.translate.use(this.lang);
                }, error => console.error(error));
                if(this.lang==null){
                    this.translate.setDefaultLang('bn');
                    this.nativeStorage.set('lang', "bn")
                        .then(() => console.log('Stored lang Data!'), 
                              error => console.error('Error storing lang', error));
                }
            } else {
                // You're testing in browser, do nothing or mock the plugins' behaviour.
                console.log('Native pluging will not work on browser!')
            }
            this.menuOpened();
        });
    }

    openPage(page,i) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if(this.user!=null){
            this.nav.setRoot(page.component,{name:i,user_id:this.user.UserDetails.user_id});
        }else{
            if(i==0||i==1)
                this.nav.setRoot(page.component,{name:i});
            else
                this.nav.setRoot(LoginPage,{name:i});
        }

        console.log(i +' -- '+CONSTANT.message2);
    }
}
