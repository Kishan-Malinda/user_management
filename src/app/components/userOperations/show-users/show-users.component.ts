import { Component, OnInit , ViewChild} from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
//Material Table
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
//Notifications Module
import { ToastrService } from 'ngx-toastr';

import { DialogBoxService } from 'src/app/services/dialog-box.service';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})

export class ShowUsersComponent implements OnInit {
  displayedColumns: string[] = ['userID', 'userName', 'dob', 'city','gender', 'active','Options']; 
  dataSource!: MatTableDataSource<any>;
  displayAddEditCmp : Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  responseObj : any = {};
  constructor(private userService : UserServiceService, private toastr : ToastrService,
    private dialogBoxService : DialogBoxService, private addEditDialog : MatDialog ) {} 

  ngOnInit(): void {
    this.getUserList();
  }
  getUserList(){
    this.userService.getUserList()
    .subscribe( {
      next : (data) => {
        var obj = JSON.parse(JSON.stringify(data));
        this.dataSource = new MatTableDataSource(obj.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort  = this.sort;
      },
      error : (err) =>{
        console.log('Error Occured');
      }
    })
  }
  deleteClicked(userID : any){
    this.openDialog(userID);
  }
  openDialog(userID:any){
    let dialogRef = this.dialogBoxService.confirmDialog({
      title : "Delete Confirm",
      message : "Are You really want to Delete this User ?",
      confirmText : "Yes",
      cancelText : "No",
    })
    dialogRef.afterClosed().subscribe(res =>{
      if(res.result){
        this.userService.deleteUser(userID).subscribe({
          next : (response) => {
            this.responseObj = response;
            console.log(this.responseObj.message);
            if(this.responseObj.message === 'Success' ){
              this.toastr.error("Student Deleted Successfully !!!");  
              this.getUserList();
            }
          },
          error : (error)=>{
            this.toastr.error("Error Occured...");
          }
        });
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addBtnClicked(){
    this.displayAddEditCmp = !this.displayAddEditCmp;
    this.addEditDialog.open(AddEditUserComponent, {
      width: '45%'
    }).afterClosed().subscribe(val => {
      if(val==='save'){
        this.getUserList();
      }
    }) ;
  }
  editUser(user : any){
    this.addEditDialog.open(AddEditUserComponent,{
      width : '45%',
      data : user
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getUserList();
      }
    })
  }
}
