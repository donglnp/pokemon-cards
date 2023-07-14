import * as process from 'process';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

window['process'] = process;
process.env['POKEMONTCG_API_KEY'] = "64aefb2b-8ecd-4481-bab9-3b61645f6705"
console.log(process.env)

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
