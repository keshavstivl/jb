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

import { CONSTANT } from '../pages/constant';
import { LoginPage } from '../pages/login/login';
import { TranslateService } from '@ngx-translate/core';
import { NativeStorage } from '@ionic-native/native-storage';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;
    pages: Array<{title: string, component: any,icon:string}>;
    lang:string;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public translate: TranslateService,public nativeStorage: NativeStorage ) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage ,icon:'home'},
            { title: 'SignIn', component: LoginPage ,icon:'contact'},
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

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
             // Platform now ready, execute any required native code
            if (this.platform.is('cordova')) {
                // You're on a device, call the native plugins. Example: 
                this.nativeStorage.getItem('lang')
                    .then( data => {
                    console.log(data);
                    this.translate.use(this.lang);
                }, error => console.error(error));
                if(this.lang==null){
                    this.translate.setDefaultLang('bn');
                    this.nativeStorage.setItem('lang', "bn")
                        .then(() => console.log('Stored lang Data!'), 
                              error => console.error('Error storing lang', error));
                }
            } else {
                // You're testing in browser, do nothing or mock the plugins' behaviour.
                console.log('Native pluging will not work on browser!')
            }
        });
    }

    openPage(page,i) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario

        this.nav.setRoot(page.component,{name:i});

        console.log(i +' -- '+CONSTANT.message2);
    }
}
