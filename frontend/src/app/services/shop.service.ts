import { Injectable } from "@angular/core";
import {
    HttpClient,
} from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
    providedIn: "root"
})
export class ShopService {
    url = "http://localhost:3000/shop/";

    constructor(private http: HttpClient) { }

    posts: Observable<any>;

    public register(username: string, password: string): Observable<any> {
        return this.http.post(this.url + "register", { username, password });
    }
}
