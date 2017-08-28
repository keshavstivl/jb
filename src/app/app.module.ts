import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ListNoticePage } from '../pages/listnotice/listnotice';
import { ListFeedbacksPage } from '../pages/listfeedback/listfeedback';
import { FeedbackDetPage } from '../pages/listfeedback/listfeedback';
import { FeedbackAssignPage } from '../pages/listfeedback/listfeedback';
import { ListuserPage } from '../pages/listuser/listuser';
import { AboutPage } from '../pages/listuser/listuser';
import { SettingsPage } from '../pages/listuser/listuser';
import { LoginPage } from '../pages/login/login';
import { ForgotPassPage } from '../pages/forgot/forgot';

import { AddSpeechPage } from '../pages/addspeech/addspeech';
import { AddEventPage } from '../pages/addevent/addevent';
import { AddMediaPage } from '../pages/addmedia/addmedia';
import { AddNoticePage } from '../pages/addnotice/addnotice';
import { AddUserPage } from '../pages/adduser/adduser';

import { TestPage } from '../pages/test/test';
//import { ListprodPage } from '../pages/listprod/listprod';
import { NoticedetPage } from '../pages/listnotice/listnotice';
//import { ModalAttachPage } from '../pages/listnotice/listnotice';
import { MyprofilePage } from '../pages/myprofile/myprofile';
import { EditProfPage } from '../pages/myprofile/myprofile';
import { ChangePassPage } from '../pages/myprofile/myprofile'; 
import { EventdetPage } from '../pages/list/list';
import { MediadetPage } from '../pages/list/list';
import { SpeechdetPage } from '../pages/list/list';
//import { ListReportDVPage } from '../pages/report/reports';
//import { ListStockLowPage } from '../pages/report/reports';
//import { ListTallyPage } from '../pages/report/reports';

import {DataService} from '../service/dataservice';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
    @NgModule({
        declarations: [
            MyApp,HomePage,ListPage,AddMediaPage,ListFeedbacksPage,AddUserPage,ListuserPage,AboutPage,SettingsPage,MyprofilePage,EditProfPage,ChangePassPage,FeedbackDetPage,AddEventPage,ListNoticePage,TestPage,AddSpeechPage,AddNoticePage,LoginPage,ForgotPassPage,FeedbackAssignPage,EventdetPage,SpeechdetPage,MediadetPage,NoticedetPage
        ],
        imports: [
            BrowserModule,HttpModule,
            IonicModule.forRoot(MyApp),TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: (createTranslateLoader),
                    deps: [Http]
                }
            })
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,HomePage,ListPage,AddMediaPage,ListFeedbacksPage,AddUserPage,ListuserPage,AboutPage,SettingsPage,MyprofilePage,EditProfPage,ChangePassPage,FeedbackDetPage,AddEventPage,ListNoticePage,TestPage,AddSpeechPage,AddNoticePage,LoginPage,ForgotPassPage,FeedbackAssignPage,EventdetPage,SpeechdetPage,MediadetPage,NoticedetPage
        ],
        providers: [
            StatusBar,SplashScreen,NativeStorage,
            {provide: ErrorHandler, useClass: IonicErrorHandler}
        ]
    })
export class AppModule {}
