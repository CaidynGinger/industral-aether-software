import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
})
export class CreateJobComponent {
  constructor(private readonly userService: UsersService) {}

  public jobFormGroup = new FormGroup({
    jobTitle: new FormControl<any>('new job'),
    jobType: new FormControl<any>('Import'),
    ForUser: new FormControl<any>(''),
  });

  public UserList: User[] = [];
  public UserListOriginal: User[] = [];

  public selectedJobType: string = 'Import';

  public jobTypes = ['Production', 'Export', 'Import', 'Stock Update'];

  public inputShowJobTypesDropdown = {
    show: false,
  };
  public inputShowUsersDropdown: boolean = false;

  inputDropDownActive(dropdown: any) {
    dropdown = {
      show: true,
    }
  }

  showUsersDropDown() {
    this.inputShowUsersDropdown = true;
  }

  ngOnInit() {
    this.userService.getUserList().subscribe((UserList) => {
      console.log('UserList', UserList);
      UserList.forEach((User) => {
        this.UserListOriginal.push(User);
        this.UserList.push(User);
      });
    });
    
  }

  refreshUserList() {
    this.UserList = [];
    this.UserListOriginal = [];
    this.userService.getUserList().subscribe((UserList) => {
      UserList.forEach((User) => {
        this.UserListOriginal.push(User);
        this.UserList.push(User);
      });
    });
  }

  inputUserDropDownActive() {}

  dropDownNonActive(dropdown: any) {
    setTimeout(() => {
      dropdown = {
        show: false,
      };
    }, 100);
  }

  HideUsersDropDown() {
    setTimeout(() => {
      this.inputShowUsersDropdown = false;
    }, 100);
  }

  SelectJobTypeHandler(jobType: string) {
    this.jobFormGroup.controls.jobType.setValue(jobType);
    this.selectedJobType = jobType;
  }

  SelectUserInputsHandler(id: string) {
    this.inputShowUsersDropdown = false;
    const userSelected = this.UserListOriginal.find(
      (user) => user._id === id
    );
    if (userSelected) {
      this.jobFormGroup.controls.ForUser.setValue(userSelected.username);
    }
  }
  onSearchUserList() {
    this.UserList = this.UserListOriginal.filter((user) =>
      user.username
        .toLowerCase()
        .includes(this.jobFormGroup.controls.ForUser.value.toLowerCase())
    );
  }

  onSubmit() {
    console.log(this.jobFormGroup.value);
  }
}
