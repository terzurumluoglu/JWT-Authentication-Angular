import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { COMPONENTS,MODULES,PROVIDERS } from "./app.imports";

@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS
  ],
  imports: [
    MODULES
  ],
  providers: [
    PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }