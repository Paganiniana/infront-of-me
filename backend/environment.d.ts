declare global {
    namespace NodeJS {
      interface ProcessEnv {
        OPENAI_KEY: string,
        PORT: number | null, // used by Google App Engine in production
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}
  