import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function equalPassword(control: AbstractControl) {
  const password = control.get('password')?.value
  const confirmPassword = control.get('confirmPassword')?.value
  if (password === confirmPassword) {
    return null
  }
  return { passwordNotSame: true }
}

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value
    const val2 = control.get(controlName2)?.value
    if (val1 === val2) {
      return null
    }
    return { passwordNotSame: true }
  }



}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(12)]
      })
    }, {
      // validators: [equalPassword]
      validators: [equalValues('password', 'confirmPassword')]
    }),

    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormGroup({
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      postalcode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', [Validators.required]),
    agree: new FormControl(false, {
      validators: [Validators.required]
    })
  })

  updateProfile() {
    if (this.profileForm.invalid) {
      console.log("Invalid form");

      return
    }
    console.log(this.profileForm);

  }

  onReset() {
    this.profileForm.reset()
  }

}
