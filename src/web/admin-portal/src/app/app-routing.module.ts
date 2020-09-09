import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodayQueueComponent } from './today-queue/today-queue.component';
import { TodayAppointmentsAddComponent } from './today-appointments-add/today-appointments-add.component';

const routes: Routes = [
  { path: '', component: TodayQueueComponent },
  { path: 'add/:collectionName', component: TodayAppointmentsAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
