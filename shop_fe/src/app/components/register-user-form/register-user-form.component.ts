import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { addUser } from '../../shared/actions/user.action';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrl: './register-user-form.component.css',
})
export class RegisterUserFormComponent implements OnInit {
  registerForm: FormGroup;
  users$: Observable<User[]>;

  employees: User[] = [
    { id: 1, name: 'John Doe', position: 'Developer' },
    { id: 2, name: 'Jane Doe', position: 'Designer' },
    // ...
  ];

  constructor(
    private fb: FormBuilder,
    private store: Store<{ users: User[] }>
  ) {
    this.registerForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      position: ['', Validators.required],
    });
    this.users$ = this.store.select('users');
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', [Validators.required]],
    });
  }

  getFormControl(employeeId: number, controlName: string) {
    const employeeControl = this.registerForm.get(employeeId.toString());
    return employeeControl as FormControl<any>;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.registerForm.valid) {
      this.saveUser();
    } else {
      console.log('Form không hợp lệ');
    }
  }

  saveUser() {
    this.getNextId().subscribe((nextId) => {
      const newUser: User = {
        id: nextId,
        name: this.registerForm.value.name,
        position: this.registerForm.value.position,
      };

      this.store.dispatch(addUser({ user: newUser }));
      this.initForm();
    });
  }

  getNextId(): Observable<number> {
    return this.store.select('users').pipe(
      map((users) => users.map((user) => user.id)),
      map((ids) => Math.max(...ids, 0) + 1),
      first()
    );
  }

  exportToPDF() {
    const pdf = new jsPDF();

    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .replace(/[-:]/g, '')
      .slice(0, 14);

    this.users$.subscribe((users) => {
      users.forEach((user, index) => {
        const yPos = index * 10 + 20;
        pdf.text(`${user.name} - ${user.position}`, 10, yPos);
      });

      const fileName = `userList${formattedDate}.pdf`;

      pdf.save(fileName);
      console.log(`export PDF file complete: ${fileName}`);
    });
  }
}
