import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { DemoRouting } from './demo.routing.module';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    DemoRouting,
  ],
  declarations: [DemoComponent]
})
export class DemoModule { }