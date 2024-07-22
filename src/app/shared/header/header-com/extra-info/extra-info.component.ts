import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TOKEN_NAME } from 'src/app/constants/app.constants';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-extra-info',
  templateUrl: './extra-info.component.html',
  styleUrls: ['./extra-info.component.scss']
})
export class ExtraInfoComponent {
  constructor(
    public sessionService: SessionService,
    private authService : AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  logout(): void {
    this.authService.logout().subscribe(response => {
      this.toastrService.success(response.message);
      localStorage.setItem(TOKEN_NAME, '');
      this.router.navigate(['/auth/login']);
    }, error => {
      this.toastrService.error(error);
    });
  }

}
