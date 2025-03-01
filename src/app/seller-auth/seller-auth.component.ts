import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router'; 
import { SignUp } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
constructor(private seller: SellerService, private router:Router){}
showLogin= false
authError:String='';
ngOnInit():void{
  this.seller.reloadSeller()
}
signUp(data:SignUp):void{
  console.warn(data);
  this.seller.userSignUP(data)
}
login(data:SignUp):void{
  this.authError="";
  // console.warn(data);
  this.seller.userLogin(data);
  this.seller.isLoginError.subscribe((isError)=>{
    if(isError){
      this.authError="Email or password is not correct";
    }
  })
}

openLogin(){
this.showLogin=true
}
openSingUp(){
  this.showLogin=false
}

}
