import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CityService } from 'src/app/services/city.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit{
  cityList : string[] = [];
  genderOptions : string[]= ['Male','Female','Prefer Not to Say'];
  userRegForm !: FormGroup;
  responseObj : any;
  saveOrUpdateBtn : string = 'Save';
  constructor(private cityService : CityService, private formBuilder: FormBuilder, private userService : UserServiceService,
              private dialogRef : MatDialogRef<AddEditUserComponent>, private toastr : ToastrService,
              @Inject(MAT_DIALOG_DATA) public editUser: any){}
  ngOnInit(): void {
    this.cityService.getCityList().subscribe({
      next : res =>{
        var obj = JSON.parse(JSON.stringify(res));
        for(let i=0;i<obj.data.length;i++){
          this.cityList.push(obj.data[i].cityName);
        }
      }
    })
    this.userRegForm = this.formBuilder.group({
      userName : ['',Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9_ -]*')])], 
      DOB :  ['',[Validators.required]],
      city :  ['',[Validators.required]],
	    gender :  ['',[Validators.required]],
	    password : ['',Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword : ['',[Validators.required,Validators.minLength(8), Validators.maxLength(20)]],
	    active: [''],
    },
    {
      validators : this.mustMatchPwd('password','confirmPassword')
    });
    if(this.editUser){
      this.saveOrUpdateBtn = 'Update';
      this.userRegForm.controls['userName'].setValue(this.editUser.userName);
      this.userRegForm.controls['DOB'].setValue(this.editUser.dob);
      this.userRegForm.controls['city'].setValue(this.editUser.city);
      this.userRegForm.controls['gender'].setValue(this.editUser.gender);
      this.userRegForm.controls['active'].setValue(this.editUser.active);
    }
  }
  SaveOrUpdateClicked(){
    delete this.userRegForm.value.confirmPassword;
    if(!this.editUser){
      if(this.userRegForm.valid){
        if(this.userRegForm.value.active===''){
          this.userRegForm.value.active = 'false'
        }
        console.log(this.userRegForm.value);
        
        this.userService.addUser(this.userRegForm.value).subscribe({
          next : (res)=>{
            this.responseObj = res;
            this.userRegForm.reset();
            this.dialogRef.close('save');
            if(this.responseObj.message==='Success'){
              this.toastr.success("User Addedd Successfully...",'Inserted');
            }
          },
          error : ()=>{
            this.toastr.error("Error Occured","Error");
          }
        })
      }
    }else{
      this.updateUser();
    }
  }
  updateUser(){
    this.userRegForm.value["userID"]= this.editUser.userID;
    delete this.userRegForm.value.password;
    console.log(this.userRegForm.value.DOB);
    
    this.userService.updateUser(this.userRegForm.value).subscribe({
      next: (res) =>{
        this.responseObj = res;
        this.userRegForm.reset();
        this.dialogRef.close('update');
        if(this.responseObj.message==='Success'){
          this.toastr.success("User Updated Successfully...",'Updated');
        }
      },
      error : (err)=>{
        this.toastr.error("Error Occured","Error");
      }
    });    
  }
  mustMatchPwd(password : any, confirmPassword :any ) {
    return (formGroup : FormGroup)=>{
      const passwordControl = formGroup.controls[password];
      const conPasswordControl = formGroup.controls[confirmPassword];

      if(conPasswordControl.errors && !conPasswordControl.errors['mustMatchPwd']){
        return;
      }
      if(passwordControl.value !== conPasswordControl.value){
        conPasswordControl.setErrors({mustMatchPwd : true});
      }else{
        conPasswordControl.setErrors(null);
      }

    }
  }
}
