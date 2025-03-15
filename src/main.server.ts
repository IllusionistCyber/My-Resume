import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import {AppModule} from "./app/app.module";

const bootstrap = () => bootstrapApplication(AppModule, config);

export default bootstrap;
