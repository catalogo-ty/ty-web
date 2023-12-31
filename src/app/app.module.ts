import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(
      {
        "projectId": "ty-db-37cc0",
        "appId": "1:723328757151:web:a7740e865be35f4fa321aa",
        "storageBucket": "ty-db-37cc0.appspot.com",
        "apiKey": "AIzaSyApZ7wZ2MV7UebsHIbtF4hmscGExM1Tg9o",
        "authDomain": "ty-db-37cc0.firebaseapp.com",
        "messagingSenderId": "723328757151"
      }
    )),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage( ()=> getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
