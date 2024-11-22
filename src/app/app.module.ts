import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TreemapComponent } from './treemap/treemap.component';

@NgModule({
  //her eklenen komponent declerations a gelecek
  declarations: [
    AppComponent,
    TreemapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  //başlangıç komponenttir
  bootstrap: [AppComponent]
})
export class AppModule { }
