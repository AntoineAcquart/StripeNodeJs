import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.sass']
})
export class ShopComponent implements OnInit {

  constructor(readonly shopService: ShopService, readonly authenticationService: AuthenticationService, readonly route: ActivatedRoute) { }

  loginError = false
  success = false
  cancel = false

  itemPurchased = ""

  ngOnInit() {
    this.success = this.route.snapshot.url.toString().search("success") > 0
    if (this.success) {
      this.itemPurchased = this.route.snapshot.params['itemId']
    } else {
      this.itemPurchased = ""
    }
    this.cancel = this.route.snapshot.url.toString().search("cancel") > 0
  }

  purchase(itemId: string) {
    this.loginError = false
    if (this.authenticationService.isLogged()) {
      this.shopService.createCheckoutSession(itemId)
    } else {
      this.loginError = true
    }
  }

}
