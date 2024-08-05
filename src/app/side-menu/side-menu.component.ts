import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
@Component({
  standalone:true,
  imports:[CommonModule,FormsModule,MatListModule,MatIconModule,RouterModule],
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  isExpanded: boolean = false;

user: any;

constructor(private authService: AuthService,private router: Router) {}
ngOnInit() {}

  toggleMenu(): void {
    this.isExpanded = !this.isExpanded;
  }

  navigateTo(destination: string): void {
    console.log('Navigate to:', destination);
  
    // Example navigation logic based on destination
    switch (destination) {
      case 'Habit Farm':
        // Navigate to Habit Farm component or route
        // Replace 'your-route-path' with the actual path or component reference
        this.router.navigate(['/habit-farm']);
        break;
      case 'Intellibrary':
        // Navigate to Intellibrary component or route
        // Replace 'your-route-path' with the actual path or component reference
        this.router.navigate(['/intelligence-library']);
        break;
      case 'Schedule Quest':
        // Navigate to Schedule Quest component or route
        // Replace 'your-route-path' with the actual path or component reference
        this.router.navigate(['/schedule-quest']);
        break;
        case 'home':
          // Navigate to Schedule Quest component or route
          // Replace 'your-route-path' with the actual path or component reference
          this.router.navigate(['/my-home']);
          break;
      default:
        console.warn('Unknown destination:', destination);
        break;
    }
  }
  
  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
    
  }
}
