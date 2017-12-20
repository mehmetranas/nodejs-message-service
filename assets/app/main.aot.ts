import './polyfills';
import { platformBrowser } from "@angular/platform-browser";

import { AppModuleNgFactory } from './app.module.ngfactory';
import {enableProdMode} from '@angular/core';


platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);