import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form:FormGroup;
  submitted = false;
  data:any;
  token:any;

  constructor(private dataService:DataService,private toastr:ToastrService,private formBuilder:FormBuilder,private router:Router) { }

  loginForm(){
    this.form = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }
  ngOnInit(): void {

    this.loginForm();
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    this.dataService.login(this.form.value).subscribe(res =>{
      this.data =res;
      if(this.data.status === 1){
         this.token = this.data.data.token;
         localStorage.setItem('token',this.token);
         this.router.navigate(['/dashboard']);
         this.toastr.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
           timeOut:2000,
           progressBar:true
         });
      }else if(this.data.status === 0){
        this.toastr.error(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
          timeOut:2000,
          progressBar:true
        });
      }
      // console.log(res);
      
    });
  }

}
