import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ResumeComponent} from "./resume/resume.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component:ResumeComponent,
  },
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
