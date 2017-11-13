import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { StudentService } from '../services/student.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  student = {};
  students = [];
  isLoading = true;
  isEditing = false;

  addStudentForm: FormGroup;
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  program = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  phone = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);


  constructor(private studentService: StudentService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getStudents();
    this.addStudentForm = this.formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      program: this.program,
      address: this.address,
      phone: this.phone,
      age: this.age,
    });
  }

  getStudents() {
    this.studentService.getStudents().subscribe(
      data => this.students = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addStudent() {
    this.studentService.addStudent(this.addStudentForm.value).subscribe(
      res => {
        const newStudent = res.json();
        this.students.push(newStudent);
        this.addStudentForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(student) {
    this.isEditing = true;
    this.student = student;
  }

  cancelEditing() {
    this.isEditing = false;
    this.student = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the students to reset the editing
    this.getStudents();
  }

  editStudent(student) {
    this.studentService.editStudent(student).subscribe(
      res => {
        this.isEditing = false;
        this.student = student;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteStudent(student) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.studentService.deleteStudent(student).subscribe(
        res => {
          const pos = this.students.map(elem => elem._id).indexOf(student._id);
          this.students.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
