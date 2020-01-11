import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AddVideoComponent} from "./components/add-video-component/add-video.component";
import {PlayListComponent} from "./components/play-list-component/play-list.component";
import {ReactiveFormsModule} from "@angular/forms";
import {PlayListService} from "./services/play-list.service";
import { HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    AddVideoComponent,
    PlayListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [PlayListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
