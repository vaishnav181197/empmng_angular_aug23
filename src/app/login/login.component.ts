import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string=""
  password:string=""

  constructor(private toastr:ToastrService,private admin:AdminService,private r:Router){

  }

  login(){
    if(this.email && this.password){
      this.admin.getAdminDetails().subscribe((res:any)=>{
        if(res.email==this.email && res.password==this.password){
          this.toastr.success("Login Successfull!!")
          const adminUser=JSON.stringify(res)
          sessionStorage.setItem("adminUser",adminUser)
          this.r.navigateByUrl("/home")
          sessionStorage.setItem("adminDetails",JSON.stringify(res))
        }
        else{
          this.toastr.error("Invalid Email/Password")

        }
      })
    }
    else{
      this.toastr.info("Login Failed!! Enter Valid Data!!")
    }
  }

}
