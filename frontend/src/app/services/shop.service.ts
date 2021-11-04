import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Stripe } from 'stripe-angular'
import { AuthenticationService } from "./authentication.service"
@Injectable({
    providedIn: "root"
})
export class ShopService {
    url = "http://localhost:3000/shop/"

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

    public stripe = Stripe('pk_test_51ICMVxHmOoJeDnTyyTlROjI2TYpe5JPpmeweyoOKJectQZqQevrYawhcfzOvTDScfcU1vlGDLmj0z3N68lcclW6100TpCBQNpH')

    public createCheckoutSession(itemId: string) {
        this.http.post(this.url + 'create-checkout-session', { token: this.authenticationService.getToken(), itemId: itemId }).subscribe({
            next: (res: any) => {
                return this.stripe.redirectToCheckout({ sessionId: res.id }).then(response => {
                    console.log(response);
                }).catch(error => {
                    console.log(error);
                });
            },
            error: (err: any) => {
                console.log(err);

            },
        });
    }
}
