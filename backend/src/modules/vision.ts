import OpenAI from "openai";

const SYSTEM_PROMPT = `
You are a helpful assistant, providing information about the current environment
to users with diminished eye sight. Your answers should be succinct and helpful.

If something in the scene is potentially unsafe, emphasize it.
`

const IMAGE_SUMMARY_PROMPT = `
What is in front of me in this scene?
`

/**
 * If the image can't be used as an OpenAI upload by this point, something went horribly wrong...
 */
export async function summarizeImage(serializedImage: string) {
    // 0. confirm the key exists
    let key = process.env.OPENAI_KEY;
    if (!key || !key.length) throw new Error("No OpenAI API Key was provided in the environment.");

    // 1. initialize API
    let openai = new OpenAI({ apiKey: key });

    // 2. make the request
    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
              role: "system",
              content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: [
              { type: "text", text: IMAGE_SUMMARY_PROMPT },
              {
                type: "image_url",
                image_url: {
                  "url": serializedImage,
                }
              },
            ],
          },
        ],
      });

      // 3. extract text response
      let text = response.choices[0].message.content;
      return text;
}

