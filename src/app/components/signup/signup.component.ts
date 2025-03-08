import { CommonModule } from '@angular/common';
import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form = viewChild.required<NgForm>('signUpForm')
  destroyRef = inject(DestroyRef)

  constructor() {
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem("formValue")
      if (savedForm) {
        const parsedFormData = JSON.parse(savedForm)
        console.log("parsedFormData", parsedFormData);
        setTimeout(() => {
          this.form().setValue({
            emailId: parsedFormData.email,
            name: parsedFormData.name,
            password: ''
          })
        }, 1);

      }
      const formValueSubscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
        next: formValue => {
          console.log(formValue)
          window.localStorage.setItem("formValue", JSON.stringify({ email: formValue.emailId, name: formValue.name }))
        }
      })

      this.destroyRef.onDestroy(() => formValueSubscription?.unsubscribe())
    })

  }

  onSignUp(signUpForm: NgForm) {
    console.log(signUpForm.form.controls["name"].value);
    console.log(signUpForm.form.value["emailId"]);
    signUpForm.reset();

  }

}
