import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { JobsService } from 'src/app/services/jobs.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
})
export class CreateJobComponent {
  constructor(
    private readonly userService: UsersService,
    private readonly jobsService: JobsService,
    private readonly _router: Router
  ) {}

  public jobFormGroup = new FormGroup({
    jobTitle: new FormControl<any>(''),
    jobType: new FormControl<any>(''),
    for: new FormControl<any>(''),
    jobDetails: new FormControl<any>({}),
  });

  public UserList: User[] = [];
  public UserListOriginal: User[] = [];

  public selectedJobType: string = '';

  public jobTypes = ['Production', 'Export', 'Import', 'Stock Update'];

  public jobTypeDropdown: boolean = false;
  public inputShowUsersDropdown: boolean = false;

  public selectedUserId: string = '';

  onSubmit() {
    this.jobsService
      .createJob({
        ...this.jobFormGroup.value,
        for: this.selectedUserId,
        sectorId: this._router.url.split('/')[2],
      })
      .subscribe((data) => {
        console.log('Success!', data);
      location.reload();

      });
  }

  showJobTypeDropdown() {
    this.jobTypeDropdown = true;
  }

  showUsersDropDown() {
    this.inputShowUsersDropdown = true;
  }

  ngOnInit() {
    this.userService.getUserList().subscribe((UserList) => {
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

  hideJobTypeDropdown() {
    setTimeout(() => {
      this.jobTypeDropdown = false;
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
    const userSelected = this.UserListOriginal.find((user) => user._id === id);
    if (userSelected) {
      console.log(userSelected);

      this.jobFormGroup.controls.for.setValue(userSelected.username);
      console.log(this.jobFormGroup.value);

      this.selectedUserId = userSelected._id;
    }
  }
  onSearchUserList() {
    this.UserList = this.UserListOriginal.filter((user) =>
      user.username
        .toLowerCase()
        .includes(this.jobFormGroup.controls.for.value.toLowerCase())
    );
  }
}
