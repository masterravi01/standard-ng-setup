import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentComponent } from './parent/parent.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MytooltipDirective } from './mytooltip.directive';
import { SampleDirective } from './sample.directive';
import { ChildComponent } from './child/child.component';
import { MybtnComponent } from './mybtn/mybtn.component';
import { SpeedComponent } from './speed/speed.component';
import { ReuseAlertComponent } from './reuse-alert/reuse-alert.component';
import { LearnNewComponent } from './learn-new/learn-new.component';

const routes: Routes = [
  { path: '', redirectTo: 'parent', pathMatch: 'full' },
  {
    path: 'parent',
    component: ParentComponent,
  },
  {
    path: 'speed',
    component: SpeedComponent,
  },
  {
    path: 'learn',
    component: LearnNewComponent,
  },
];

@NgModule({
  declarations: [
    ParentComponent,
    MytooltipDirective,
    SampleDirective,
    ChildComponent,
    MybtnComponent,
    ReuseAlertComponent,
    SpeedComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
})
export class LearingModule {}
