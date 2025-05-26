import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  imports: [ FormsModule, CommonModule, RouterModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  showSearch = false;
  searchText = '';
  showDropdown = false;
  closeTimeout: any;
  dropdownCloseTimeout: any;

  constructor(private router: Router, private authService: AuthService) { }


  closeMobileMenu() {
    const element = document.getElementById('navbarSupportedContent');
    if (element?.classList.contains('show')) {
      const collapse = new bootstrap.Collapse(element, { toggle: false });
      collapse.hide();
    }
  }
  openDropdown() {
    clearTimeout(this.dropdownCloseTimeout);
    this.showDropdown = true;
  }
  closeDropdown() {
    this.dropdownCloseTimeout = setTimeout(() => {
      this.showDropdown = false;
    }, 300);
  }
  isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
