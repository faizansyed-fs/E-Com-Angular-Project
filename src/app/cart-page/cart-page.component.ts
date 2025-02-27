import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
  //  this.product.currentCart().subscribe((result)=>{
  //   this.cartData=result
  //   let price=0;
  //   result.forEach((item)=>{
  //     price = price + ( + item.price)
  //   })
  //   console.warn(price)
  //  })
  this.product.currentCart().subscribe((result) => {
    this.cartData = result;
    console.warn(this.cartData);
    let price = 0;
    result.forEach((item) => {
      if (item.quantity) {
        price = price + (+item.price * +item.quantity)
      }
    })
       this.priceSummary.price=price;
       this.priceSummary.discount = price / 5;
       this.priceSummary.tax = price / 10;
       this.priceSummary.delivery = 60, "Free";
       this.priceSummary.total = price - (price / 5) + 0 + (price / 10);
       console.warn(this.priceSummary)
           if(!this.cartData.length){
      this.router.navigate(['/'])
    }
    })
  }
  removeToCart(cartId:number|undefined){
    cartId && this.cartData && this.product.removeToCart(cartId)
    .subscribe((result)=>{
      this.loadDetails();
    })
  }
  checkout() {
    this.router.navigate(['/checkout'])
  }
  loadDetails(){
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      console.warn(this.cartData);
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);

    if(!this.cartData.length){
      this.router.navigate(['/'])
    }

    })
  }
}































// import { Component } from '@angular/core';
// import { ProductService } from '../services/product.service';
// import { Router } from 'express';
// import { cart, pricesummary } from '../data-type';

// @Component({
//   selector: 'app-cart-page',
//   templateUrl: './cart-page.component.html',
//   styleUrl: './cart-page.component.css'
// })
// export class CartPageComponent {
//   cartData: cart[] | undefined;
//   priceSummary: pricesummary = {
//     price: 0,
//     discount: 0,
//     tax: 0,
//     delivery: 0,
//     total: 0
//   }
//   router: any;
  
//   constructor(private product: ProductService, router: Router) { }
//   ngOnInit(): void {

//     this.loadDetails()

//   }

//   removeToCart(cartId:number|undefined){
//     cartId && this.cartData && this.product.removeToCart(cartId)
//     .subscribe((result)=>{
//       this.loadDetails();
//     })
//   }

//   loadDetails(){
//     this.product.currentCart().subscribe((result) => {
//       this.cartData = result;
//       console.warn(this.cartData);
//       let price = 0;
//       result.forEach((item) => {
//         if (item.quantity) {
//           price = price + (+item.price * +item.quantity)
//         }
//       })
//       this.priceSummary.price = price;
//       this.priceSummary.discount = price / 10;
//       this.priceSummary.tax = price / 10;
//       this.priceSummary.delivery = 100;
//       this.priceSummary.total = price + (price / 10) + 100 - (price / 10);
//       console.warn(this.priceSummary)
//     if(!this.cartData.length){
//       this.router.navigate(['/'])
//     }

//     })
//   }
//   checkout() {
//     this.router.navigate(['/checkout'])
//   }

// }



