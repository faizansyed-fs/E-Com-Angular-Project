import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
// [x: string]: any;
productData:undefined | product;
productQuantity:number=1;
removeCart=false;
cartData:product|undefined;
id: product|undefined;


	// images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProducts:undefined|product[];
  trendyProducts:undefined | product[];
cart: undefined | product;
  constructor(private activeRoute:ActivatedRoute, private product:ProductService) {}


  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      console.warn(data)
      this.popularProducts=data;
    })
    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    })

    //;;;;;;;;;;;;;;;;;;;;;;;;;;Start..................

    let productId= this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productData= result;

   
      })
      
    }
  
      
    

    //.........................end................
    
  

  


  addToCart(){
      if(this.productData){
        this.productData.quantity = this.productQuantity;
        if(!localStorage.getItem('user')){
           this.product.localAddToCart(this.productData)
           this.removeCart=true
          }else{
            let user = localStorage.getItem('user');
            let userId= user && JSON.parse(user).id;
            let cartData:cart={
              ...this.productData,
              productId:this.productData.id,
              userId
            }
            delete cartData.id;
            this.product.addToCart(cartData).subscribe((result)=>{
              if(result){
               this.product.getCartList(userId);
               this.removeCart=true
              }
            })        
          }
          
        } 
      }
  removeToCart(productId:number){
    if(!localStorage.getItem('user')){
      this.product.removeItemFromCart(productId)
      this.removeCart=false
          }else{
            console.warn("cartData", this.cartData);
            
            this.cartData && this.product.removeToCart(this.cartData.id)
            .subscribe((result)=>{
              let user = localStorage.getItem('user');
              let userId= user && JSON.parse(user).id;
              this.product.getCartList(userId)
            })
          }
          this.removeCart=false
        }
}
