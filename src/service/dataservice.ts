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

    postData(){
        var json = JSON.stringify({ email: 'a@hotmail.com', password: 'root'});
        var params = 'json=' + json;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //    let options = new RequestOptions({ headers: headers });
        let opts:RequestOptionsArgs = { headers: headers };

        this.http.post('http://stivl.com/apps/jb/service/api/appsignin',params, opts).subscribe(
         data => console.log(data),
         err => console.log(err.json().message),
         () => console.log('Authentication Complete'));
    
//            .map(res => res.json())
//            .toPromise();
    }
}