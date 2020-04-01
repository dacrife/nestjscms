import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

    if (isDevelopmentEnv) {
      const envFilePatch = __dirname + '/../../.env';
      const existsPatch = fs.existsSync(envFilePatch);

      if (!existsPatch) {
        console.log('.env file does not exists');
        process.exit(0);
      }
      this.envConfig = parse(fs.readFileSync(envFilePatch));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
      };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
