declare global {
    namespace NodeJS {
      interface ProcessEnv {
        OPENAI_KEY: string,
        PORT: number | null, // used by Google App Engine in production
        FRONTEND_URL: string, // used by CORS to get the security right
        SPECIAL_AUTH_TOKEN: string,
        ENVIRONMENT: "test" | "prod",
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}
  