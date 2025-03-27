import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgOptimizedImage} from "@angular/common";
import {AppRoutingModule} from "./app.routing.module";
import {ResumeComponent} from "./resume/resume.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [AppComponent,ResumeComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgOptimizedImage,
        FormsModule
    ],
  providers: [

  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {

}
