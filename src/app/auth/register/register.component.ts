import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TOKEN_NAME, USERID, USERNAME } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  isShowPass = false;
  error= '';
  loading = false;

  handleShowPass () {
    this.isShowPass = !this.isShowPass;
  }

  public registerForm!: FormGroup;
  public formSubmitted = false;

  constructor(
    private toastr: ToastrService,
    private authService : AuthService,
    private router: Router
  ) { 
  }

  ngOnInit () {
    this.registerForm = new FormGroup({
      username:new FormControl(null,[Validators.required]),
      first_name:new FormControl(null,[Validators.required]),
      last_name:new FormControl(null,[Validators.required]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.minLength(6)]),
      gender:new FormControl("Choisissez votre genre",[Validators.required])
    })
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      this.loading = true;
      console.log('register-form-value', this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          const now = new Date();
          localStorage.setItem('date_expiry', (now.getTime() + 24 * 60 * 60 * 1000).toString());
          localStorage.setItem(USERNAME, response.username);
          localStorage.setItem(TOKEN_NAME, response.token);
          localStorage.setItem(USERID, response.id);
          this.toastr.success('Success', 'Utilisateur créé avec succès');
          console.log('Utilisateur créé avec succès', response);
          this.loading = false;
          this.router.navigate(['/']);
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de la création de l\'utilisateur', error.error);
          this.error = error.error.error;
          this.loading = false;
        }
      );
      this.registerForm.reset();
      this.formSubmitted = false;
    }
  }

  get username() { return this.registerForm.get('username') }
  get last_name() { return this.registerForm.get('last_name') }
  get first_name() { return this.registerForm.get('first_name') }
  get gender() { return this.registerForm.get('gender') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }

}
