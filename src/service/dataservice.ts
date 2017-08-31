import {Injectable} from "@angular/core";
import {Http,RequestOptionsArgs,Headers } from "@angular/http";
import 'rxjs/Rx';
import { ToastController,LoadingController } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class DataService {
    data:any;
    http:Http;
    loading:any;

    constructor( http: Http,private toastCtrl: ToastController,public loadingCtrl: LoadingController) {
        this.http = http;
        this.data = null;
    }

    retrieveData() {
        this.http.get('./mocks/test.json')
            .subscribe(data => {
            this.data = data;
        });
    }

    getData() {
        return this.data;
    }

    postData(params:Array<Param>,suburl:string,callback: (dataa) => void){
        //        var json = JSON.stringify({ email: 'a@hotmail.com', password: 'root'});
        //        var params = 'json=' + json;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //    let options = new RequestOptions({ headers: headers });
        //        let opts:RequestOptionsArgs = { headers: headers };
        let body = new FormData();

        console.log(JSON.stringify(params));

        params.forEach(p=>{ 
            body.append(p.key,p.value);

        });

        this.http.post('http://stivl.com/apps/jb/service/api/'+suburl,body, headers).catch((error: any) => {
            if (error.status < 400 ||  error.status ===500) {
                console.log(error.status);
                let data={ok:false,status:error.status,_body:{Ack:0,msg:'Unknown Network error'}};
                console.log('Unknown Network error');
                error._body=JSON.stringify({Ack:0,msg:error.statusText});
                callback(error);
                return Observable.throw(new Error(error.status));
            }
        }).subscribe(
            data =>{
                console.log(data);
                callback(data);
            },
            err =>{
//                let data={ok:false,status:err.status,_body:{Ack:0,msg:'Unknown Network error1'}};
                console.log('Unknown Network error1');
//                callback(data);
            },
            () => console.log('Authentication Complete'));

        //            .map(res => res.json())
        //            .toPromise();
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
    getLoading(msg) {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        return this.loading;
    }
}

export interface Param{
    key:string;
    value:string;
}
