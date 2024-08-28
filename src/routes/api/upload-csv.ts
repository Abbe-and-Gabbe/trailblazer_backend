import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import * as fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing by Next.js
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(process.cwd(), '/uploads'),
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error', err);
        return res.status(500).json({ error: 'Error parsing the files' });
      }

      const file = files.file;

      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Assuming you want to pass the file to your NestJS backend:
      try {
        const filePath = path.join(process.cwd(), file.filepath);
        const data = fs.readFileSync(filePath);
        
        // Call your NestJS backend API to process this file
        // e.g., using axios or fetch
        const response = await fetch(`${process.env.BACKEND_URL}/dataset/upload-csv`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
          },
          body: data,
        });

        const result = await response.json();
        return res.status(200).json(result);

      } catch (error) {
        console.error('Error processing CSV file', error);
        return res.status(500).json({ error: 'Error processing CSV file' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
