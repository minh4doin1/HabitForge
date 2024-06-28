import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone:true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports:[CommonModule,]
})
export class HomeComponent {
showDescription(arg0: string) {
throw new Error('Method not implemented.');
}
hideDescription() {
throw new Error('Method not implemented.');
}
  characterStyle = {};
characterTop: any;
characterLeft: any;

  constructor(private router: Router) {}

  showTooltip(landId: string) {
    const tooltip = document.getElementById(`tooltip-${landId}`);
    if (tooltip) tooltip.style.display = 'block';
  }

  hideTooltip(landId: string) {
    const tooltip = document.getElementById(`tooltip-${landId}`);
    if (tooltip) tooltip.style.display = 'none';
  }

  navigateTo(landId: string) {
    // Animate character movement
    const character = document.querySelector('.character') as HTMLElement;
    const land = document.getElementById(landId) as HTMLElement;

    if (character && land) {
      const landRect = land.getBoundingClientRect();
      character.style.left = `${landRect.left}px`;
      character.style.top = `${landRect.top}px`;

      setTimeout(() => {
        // Navigate after animation
        switch (landId) {
          case 'my-home':
            this.router.navigate(['/my-home']);
            break;
          case 'habit-farm':
            this.router.navigate(['/habit-farm']);
            break;
          case 'intelligence-library':
            this.router.navigate(['/intelligence-library']);
            break;
          case 'schedule-quest':
            this.router.navigate(['/schedule-quest']);
            break;
        }
      }, 1000); // Adjust timeout based on animation duration
    }
  }
}
