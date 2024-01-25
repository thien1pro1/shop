import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { EditorModule } from 'primeng/editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterUserFormComponent } from './components/register-user-form/register-user-form.component';
import { StoreModule } from '@ngrx/store';
import { UserListTableComponent } from './components/user-list-table/user-list-table.component';
import { userReducer } from './shared/reducer/user.reducer';
import { ReportTableComponent } from './components/report-table/report-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    RegisterUserFormComponent,
    UserListTableComponent,
    ReportTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    RatingModule,
    TagModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(
      {
        users: userReducer,
      },
      {}
    ),
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
