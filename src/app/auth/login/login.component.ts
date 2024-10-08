import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { AuthService} from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TOKEN_NAME,USERID,USERNAME } from 'src/app/constants/app.constants';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isShowPass = false;
  error: string = ""; 
  loading= false;

  handleShowPass () {
    this.isShowPass = !this.isShowPass;
  }

  public loginForm!: FormGroup;
  public formSubmitted = false;

  constructor(
    private toastrService: ToastrService,
    private authService : AuthService,
    private router: Router
  ) { 
  }

  ngOnInit () {
    this.loginForm = new FormGroup({
      email:new FormControl(null,[Validators.required]),
      password:new FormControl(null,[Validators.required]),
    })
  }

  onInputChange(): void {
    this.error = '';
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.loading=true;
      this.authService.log(this.email?.value, this.password?.value)
          .subscribe((result: any) => {
            this.toastrService.success(result.message);
            this.error = "";
            const now = new Date();
            localStorage.setItem('date_expiry', (now.getTime() + 24 * 60 * 60 * 1000).toString());
            localStorage.setItem(USERNAME, result.user.username);
            localStorage.setItem(TOKEN_NAME, result.user.token);
            localStorage.setItem(USERID, result.user.id);
            this.loginForm.reset();
            this.formSubmitted = false;
            this.loading=false;
            this.router.navigate(['/']).then(() => {
              window.location.reload();
          });
          },
          (error: any) => {
            this.error = error.error.error || 'Erreur inconnue';
            this.loginForm.reset();
            this.formSubmitted = false;
            this.loading=false;
          }); 
    }
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
}
