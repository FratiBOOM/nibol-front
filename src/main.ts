import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core'; // ✅ aggiunto
import { HttpClientModule } from '@angular/common/http'; // ✅ aggiunto

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    importProvidersFrom(HttpClientModule) // ✅ aggiunto per usare HttpClient
  ]
}).catch((err) => console.error(err));
