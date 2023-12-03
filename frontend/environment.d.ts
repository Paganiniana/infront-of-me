declare global {
    namespace NodeJS {
      interface ProcessEnv {
        FRONTEND_URL: string, // used by CORS to get the security right
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}
  