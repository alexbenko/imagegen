import { Configuration, CreateImageRequestSizeEnum, OpenAIApi } from 'openai'

export default async function generateImage(prompt: string, amount = 1, size: CreateImageRequestSizeEnum = "256x256"){
  if(!process.env.API_KEY){
    throw new Error('No API KEY FOUND')
  }
  const configuration = new Configuration({
    apiKey: process.env.API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: prompt,
    n: amount,
    size: size,
  });
  const links = response.data.data;
  return links
}