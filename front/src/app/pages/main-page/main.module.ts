import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { NgAntModule } from 'src/app/ng-antd.module';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { MainRoutingModule } from './main-routing.module';
import { BasketComponent } from '../basket/basket.component'


@NgModule({
  imports: [ MainRoutingModule,CommonModule,  NgAntModule,FormsModule,ReactiveFormsModule],
  declarations: [MainPageComponent, BasketComponent ],
  exports: []
})
export class MainPageModule { }
