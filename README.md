# Describe View

This project provides a web application and the backend API to support it. It will describe the view provided in the camera on the mobile device. It has two parts: a [[#Backend]] and a [[#Frontend]].

The API will do the following: take an image as part of its uploaded form and return a `{ message: <content> }` with its description.

# Backend

The backend is an Express application, running with a single endpoint. To run the project, you should acquire...

- An OpenAI [secret key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key)
- Google's [gcloud utility](https://cloud.google.com/build/docs/deploying-builds/deploy-appengine), signed in, with appropriate IAM permissions
- A Firebase Admin [SDK Key](https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments)

After that, you ***should*** be able to simply run the following! 

```bash
npm run test
```

After that, to test the endpoint, try using the test scripts found in `/backend/tests/scripts/`.

#### OpenAI

The OpenAI secret key should be placed in a `.env` file, with the following structure:

```bash
OPENAI_KEY="... your key goes here ..."
# used for CORS, change this if you deploy your own client
FRONTEND_URL="https://infront-of-me.web.app" 
SPECIAL_AUTH_TOKEN="... some special key ...";
```

#### Gcloud

Gcloud is used for deploying the project, but is not necessary for testing it, locally. See the link provided. The local `npm run deploy` project takes the `app.yaml` file and deploys it to Google's *App Engine.*

#### Firebase Admin
This is required for testing locally, as the API uses Firebase's authentication service to ensure that only authenticated users are served. You should place the contents of the file provided in file called `src/modules/firebase/credentials.json`.

# Frontend

The frontend also relies on a special configuration. This is a simple, frontend configuration file for Firebase. You can find the instructions for adding this configuration file in the [Firebase documentation](https://firebase.google.com/docs/web/setup). The file should be located at: `src/firebase/firebaseConfig.json`.

After all that, it's as simple as running:

```bash
npm run dev
```
