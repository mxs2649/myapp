import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EscherService } from './eschermap/escherservice.service';
import { AppDataLoader } from './dataloader.service';
import { AppComponent } from './app.component';
import { MetaboliteVisualizationComponent } from './eschermap/eschermap.component';
import { D3Service } from 'd3-ng2-service';

@NgModule({
  declarations: [
    AppComponent,
    MetaboliteVisualizationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ EscherService, AppDataLoader, D3Service ],
  bootstrap: [AppComponent]
})
export class AppModule { }
