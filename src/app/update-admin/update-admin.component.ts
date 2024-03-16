import { Component, EventEmitter } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {

  profilePicture:string="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  adminStatus:boolean=false
  adminData:any={}
  @Output() adminChangeEvent:any=new EventEmitter()


  constructor(private admin:AdminService,private toastr:ToastrService){
  }

  ngOnInit() {
    this.getAdminDetails()
    

  }

  getAdminDetails(){
    this.admin.getAdmin().subscribe((res:any)=>{
      this.adminData=res
      console.log(this.adminData)
      if(res.profileImage){
        this.profilePicture=res.profileImage
      }
    })
    
  }

  getFile(event:any){
    const file=event.target.files[0]
    console.log(file)
    let fr=new FileReader()
    fr.readAsDataURL(file)
    fr.onload=(event:any)=>{
      console.log(event.target.result)
      this.profilePicture=event.target.result
      this.adminData.profileImage=event.target.result
    }

  }

  handleUpdateAdmin(){
    console.log(this.adminData)
    this.admin.updateAdmin(this.adminData).subscribe((res:any)=>{
      this.toastr.success("Admin Updated SuccessFully!!")
      this.adminStatus=false
      sessionStorage.setItem("adminDetails",JSON.stringify(this.adminData))
      this.adminChangeEvent.emit(this.adminData.username)
    },
    (err:any)=>{
      this.toastr.error(err)
    })
  }



  updateAdminConfirm(){
    this.adminStatus=true
  }

  onCancel(){
    this.adminStatus=false
  }

}
