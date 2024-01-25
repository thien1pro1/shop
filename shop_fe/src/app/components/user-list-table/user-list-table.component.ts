// user-list-table.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-user-list-table',
  templateUrl: './user-list-table.component.html',
  styleUrls: ['./user-list-table.component.css'],
})
export class UserListTableComponent implements OnInit {
  employeeForm: FormGroup;
  employees$: Observable<User[]>;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ users: User[] }>
  ) {
    this.employeeForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      position: ['', Validators.required],
    });

    this.employees$ = this.store.select('users');
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const formControls: { [key: string]: any } = {};
    this.employees$.subscribe((employees) => {
      employees.forEach((employee) => {
        formControls[employee.id.toString()] = this.fb.control(
          employee.name,
          Validators.required
        );
      });
      this.employeeForm = this.fb.group(formControls);
    });
  }

  getFormControl(employeeId: number, controlName: string) {
    const employeeControl = this.employeeForm.get(employeeId.toString());
    return employeeControl as FormControl<any>;
  }

  onEditComplete(employee: User) {
    console.log('Chỉnh sửa hoàn tất cho nhân viên:', employee);
  }

  onSubmit() {
    // Xử lý khi submit form, nếu cần
  }
}
