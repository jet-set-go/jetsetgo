declare module '*.css' {
  const content: any;
  export = content;
}

import 'express-session';
declare module 'express-session' {
  export interface SessionData {
    userId: string;
  }
}
