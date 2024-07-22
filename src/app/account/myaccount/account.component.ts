import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TOKEN_NAME, USERID, USERNAME } from 'src/app/constants/app.constants';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  accountForm!: FormGroup;
  resetPwForm!: FormGroup;
  profilePictureBase64: string | null = null;
  userId = localStorage.getItem(USERID);
  username = localStorage.getItem(USERNAME);
  loading = false;
  loadingMain = false;

  dataUser: User = {
    id: 0,
    username: '',
    email: '',
    status: 'Available',
    first_name: '',
    last_name: '',
    profile_picture: '',
    gender: ''
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService : AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadingMain=true;
    this.loading=true;
    this.accountForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      profilePicture: ['']
    });

    this.resetPwForm = this.fb.group({
      oldPassword: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    });

    if (this.userId) {
      this.userService.getUserProfil(this.userId).subscribe((user: any) => {
        this.dataUser = user.user;
        this.accountForm.patchValue({
          username: this.dataUser.username,
          email: this.dataUser.email,
          first_name: this.dataUser.first_name,
          last_name: this.dataUser.last_name,
          gender: this.dataUser.gender,
          profilePicture: this.dataUser.profile_picture
        });

        if (this.dataUser.profile_picture) {
          this.profilePictureBase64 = this.dataUser.profile_picture;
        }

        this.loading=false;
        this.loadingMain=false;

      },error => {
        this.loading = false;
        console.error('Error loading objects', error);
      });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.profilePictureBase64 = reader.result as string;
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
    }
  }

  logout(): void {
    this.authService.logout().subscribe(response => {
      this.toastrService.success(response.message);
      localStorage.setItem(TOKEN_NAME, '');
      this.router.navigate(['/auth/login']);
    }, error => {
      this.toastrService.error(error);
    });
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      this.loading=true;
      const formData = {
        ...this.accountForm.value,
        profile_picture: this.profilePictureBase64
      };
      if (this.userId) {
        this.userService.updateUserProfile(this.userId, formData).subscribe(response => {
          this.loading=false;
        }, error => {
          console.error('ERROR', error);
        });
      }
    }
  }

  onSubmitRestPassword() : void {
    if (this.resetPwForm.valid) {
      this.loading=true;
      const formData = {
        ...this.resetPwForm.value
      };
      if (this.userId) {
        this.userService.updateUserProfile(this.userId, formData).subscribe(response => {
          this.loading=false;
          this.resetPwForm.reset();
        }, error => {
          this.loading=false;
          this.resetPwForm.reset();
        });
      }
    }
  }
}
