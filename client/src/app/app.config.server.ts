import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { AccountService } from './account.service';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), AccountService],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
