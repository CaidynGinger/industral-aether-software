import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContainerComponent } from './container/container.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { InventorySectorsComponent } from './pages/inventory-sectors/inventory-sectors.component';
import { TableComponent } from './components/table/table.component';
import { BtnComponent } from './components/UI/btn/btn.component';
import { AddSectorComponent } from './pages/add-sector/add-sector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SectorComponent } from './pages/sector/sector.component';
import { InventoryObjectsComponent } from './pages/inventory-objects/inventory-objects.component';
import { ProductionLinesComponent } from './pages/production-lines/production-lines.component';
import { AddObjectComponent } from './pages/inventory-objects/add-object/add-object.component';
import { ObjectComponent } from './pages/inventory-objects/object/object.component';
import { AddProductionLineComponent } from './pages/production-lines/add-production-line/add-production-line.component';
import { CreateJobComponent } from './pages/sector/create-job/create-job.component';
import { DeliveryComponent } from './pages/sector/create-job/delivery/delivery.component';
import { ProductionLineComponent } from './pages/production-lines/production-line/production-line.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ContainerComponent,
    SideNavComponent,
    MainNavComponent,
    InventorySectorsComponent,
    TableComponent,
    BtnComponent,
    AddSectorComponent,
    SectorComponent,
    InventoryObjectsComponent,
    ProductionLinesComponent,
    AddObjectComponent,
    ObjectComponent,
    AddProductionLineComponent,
    CreateJobComponent,
    DeliveryComponent,
    ProductionLineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
