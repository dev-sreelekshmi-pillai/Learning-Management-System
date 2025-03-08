import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainAt(control: AbstractControl) {
  if (control.value.includes('@')) {
    return null
  }
  return { noAtSymbol: true }
}

// Trying out async validation
// (instead of dummy data - use HTTP calls and response data)
// Async valdiators should send observable - so using "of" keyword or RXJS operators
function uniqueEmail(control: AbstractControl) {
  if (control.value != 'test@example.com') {
    return of(null)
  }
  return of({ notUnique: true })
}

let userNameInitialValue = ''
const savedForm = window.localStorage.getItem("formData")
if (savedForm) {
  const parsedFormData = JSON.parse(savedForm)
  userNameInitialValue = parsedFormData.userName

}



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    const savedForm = window.localStorage.getItem("formData")
    if (savedForm) {
      const parsedFormData = JSON.parse(savedForm)
      this.loginForm.patchValue({
        userName: parsedFormData.userName
      })
    }

    const formSub = this.loginForm.valueChanges.pipe(debounceTime(500)).subscribe({
      next: formValue => {
        window.localStorage.setItem("formData", JSON.stringify({ userName: formValue.userName }))
      }
    })
    this.destroyRef.onDestroy(() => { formSub.unsubscribe() })
  }

  private loginService = inject(LoginService)

  loginForm = new FormGroup(
    {
      userName: new FormControl(userNameInitialValue, {
        validators: [Validators.required],
        asyncValidators: [uniqueEmail]
      }),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12), mustContainAt

      ]),

    }
  )

  callLogin() {
    console.log(`Form: ${this.loginForm.value}`)
    console.log(`userName: ${this.loginForm.value.userName}`)
    this.loginService.checkUserLogin(this.loginForm).subscribe((userData) => {
      console.log(`Usrer : ${userData.message}`);
    });
  }

  get userNameInvalid() {
    return this.loginForm.controls.userName.touched && this.loginForm.controls.userName.dirty && this.loginForm.controls.userName.invalid
  }

  get passwordInvalid() {
    return this.loginForm.controls.password.touched && this.loginForm.controls.password.dirty && this.loginForm.controls.password.invalid
  }
}
