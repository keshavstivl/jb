import {Injectable} from "@angular/core";
import {Http,RequestOptionsArgs,Headers } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class DataService {
    data:any;
    http:Http
    constructor( http: Http) {
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

    postData(params:Array<Param>,suburl:string,callback: (data) => void){
        //        var json = JSON.stringify({ email: 'a@hotmail.com', password: 'root'});
        //        var params = 'json=' + json;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //    let options = new RequestOptions({ headers: headers });
        //        let opts:RequestOptionsArgs = { headers: headers };
        let body = new FormData();
        //        body.append('email', 'a@hotmail.com');
        //        body.append('password', 'root');
        console.log(JSON.stringify(params));
        //        for (let p in params) {
        //            body.append(p.key,p.value);
        //        }
        params.forEach(p=>{ 
            body.append(p.key,p.value);

        });

        this.http.post('http://stivl.com/apps/jb/service/api/'+suburl,body, headers).subscribe(
            data =>{ console.log(data);
                    callback(data)},
            err => console.log(err.json().message),
            () => console.log('Authentication Complete'));

        //            .map(res => res.json())
        //            .toPromise();
    }
}

export interface Param{
    key:string;
    value:string;
}