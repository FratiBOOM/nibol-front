import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      category: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
  if (this.contactForm.valid) {
    console.log('Message sent:', this.contactForm.value);

    this.translate.get(['CONTACT.SUCCESS_TITLE', 'CONTACT.SUCCESS_TEXT']).subscribe(t => {
      Swal.fire({
        icon: 'success',
        title: t['CONTACT.SUCCESS_TITLE'],
        text: t['CONTACT.SUCCESS_TEXT'],
        confirmButtonColor: '#3085d6'
      });
    });

    this.contactForm.reset();
  } else {
    this.translate.get(['CONTACT.ERROR_TITLE', 'CONTACT.ERROR_TEXT']).subscribe(t => {
      Swal.fire({
        icon: 'error',
        title: t['CONTACT.ERROR_TITLE'],
        text: t['CONTACT.ERROR_TEXT']
      });
    });
  }
}

}
