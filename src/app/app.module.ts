import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { MenuComponent } from "./menu/menu.component";
import { MainRulingComponent } from "./main-ruling/main-ruling.component";
import {
  IgxCardModule,
  IgxIconModule,
  IgxButtonModule,
  IgxRippleModule,
  IgxProgressBarModule 
} from "igniteui-angular";
import { VoteComponent } from './vote/vote.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    MainRulingComponent,
    VoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IgxCardModule,
    IgxIconModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
