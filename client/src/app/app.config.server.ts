import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideHttpClient } from '@angular/common/http';
import { TimeagoModule } from 'ngx-timeago';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), provideHttpClient()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
