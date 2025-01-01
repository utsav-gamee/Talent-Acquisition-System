import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidatesComponent } from './candidates.component';

const routes: Routes = [
  {
    path: '',
    component: CandidatesComponent,
    data: {
      title: 'Candidates'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatesRoutingModule {}
