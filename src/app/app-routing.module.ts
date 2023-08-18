import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContainerComponent } from './container/container.component';
import { InventorySectorsComponent } from './pages/inventory-sectors/inventory-sectors.component';
import { AddSectorComponent } from './pages/add-sector/add-sector.component';
import { SectorComponent } from './pages/sector/sector.component';
import { InventoryObjectsComponent } from './pages/inventory-objects/inventory-objects.component';
import { ObjectComponent } from './pages/inventory-objects/object/object.component';
import { ProductionLinesComponent } from './pages/production-lines/production-lines.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  // { path: '',   redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    component: ContainerComponent,
    children: [
      { path: 'inventory-sectors', component: InventorySectorsComponent },
      { path: 'sector/:id', component: SectorComponent },
      { path: 'object/:id', component: ObjectComponent },
      { path: 'inventory-objects', component: InventoryObjectsComponent, children: [
        {
          path: 'object/:id', // child route path
          component: ObjectComponent, // child route component that the router renders
        }, 
      ]
      },
    
      { path: 'production-lines', component: ProductionLinesComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
