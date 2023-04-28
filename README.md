This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

ImageGen is a Next.js web application that allows users to input a text prompt, and using OpenAI's DALL-E, generates and displays corresponding images. It's a simple and user-friendly way to explore the capabilities of DALL-E.

## Required Environment Variables

This application requires two environment variables to be set:

1. `Password`: This protects the app with a password. Set it to the desired password for accessing the application.
2. `OPEN_AI_KEY`: This is your API key from OpenAI. You can obtain it from the [OpenAI website](https://www.openai.com/).

Create a `.env.local` file in the root directory of the project and add the required environment variables:
