import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StartComponent } from './start/start.component';
import { HabitFarmComponent } from './habit-farm/habit-farm.component';
import { HomeComponent } from './home/home.component';
import { MyHomeComponent } from './my-home/my-home.component';
import { QuestscapeComponent } from './questscape/questscape.component';
import { IntellibraryComponent } from './intellibrary/intellibrary.component';

export const routes: Routes = [
    { path: '', component: StartComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'my-home', component: MyHomeComponent },
    { path: 'habit-farm', component: HabitFarmComponent },
    { path: 'intelligence-library', component: IntellibraryComponent },
    { path: 'schedule-quest', component: QuestscapeComponent },
    // Thêm các routes khác nếu cần
  ];;
