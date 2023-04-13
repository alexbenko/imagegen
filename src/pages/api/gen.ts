// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import generateImage from '../../../lib/image';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST'){
    const { text } = req.body;
    const links = await generateImage(text,4, "512x512")
    return res.send({links})
  }
}