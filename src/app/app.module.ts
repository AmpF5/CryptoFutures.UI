import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostPositionComponent } from './components/post-position/post-position.component';
import { FormsModule } from '@angular/forms';
import { PositonsTableComponent } from './components/positons-table/positons-table.component';
import { PairsAutoRefreshComponent } from './components/pairs-auto-refresh/pairs-auto-refresh.component';

@NgModule({
  declarations: [
    AppComponent,
    PostPositionComponent,
    PositonsTableComponent,
    PairsAutoRefreshComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
