# Backend

The backend for the *Infront-of-me* app relies on OpenAI's GPT4v API. It takes a `POST` request, with the data `image` attached to its body. It returns a single JSON object:

```json
{ "message": "Some message string" }
```

If the backend is successful in parsing the image, it will return a summary. If it is unsuccessful, it will indicate as much in its message.

#### API Endpoint
The API endpoint is found simply at `/analyze/image`.

### Image Processing
The image is parsed using a simple prompt, asking the GPT4v API to simple "summarize the scene in front of" the user. This requires serializing the image, making it compatible with the GPT4v image interface.

### Error Handling
The API will account for the following errors:

1. No image is provided
2. An unexpected event occurs in (a) parsing or (b) OpenAI interactions
3. The user is not authenticated

More extensive errors are handled on the frontend.

### Unit Tests
Initial backend tests, used in iterative development, are supplied in `/backend/tests/scripts`. The `/frontend` directory is 

### Security
As mentioned above, authentication is a prerequisite for use. This application uses Firebase's authentication service.

### Performance
The application is built to run on Google's *App Engine* service, making it resilient for large loads.