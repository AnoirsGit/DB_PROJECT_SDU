import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-welcome',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  selectedMode="login";

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.router.navigate(['./main']);
  }

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
      
    });
  }

  changeMode(): void{
    if(this.selectedMode == 'login'){
      this.selectedMode = "reg";
      this.validateForm.addControl('mobileNumber', new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]));
      this.validateForm.addControl('mobilePrefix', new FormControl(8));
    }
    else{
      this.selectedMode = "login"
      this.validateForm.removeControl("mobileNumber");
      this.validateForm.removeControl("mobilePrefix");
    }
  }
}
