// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const W3GReplay = require("w3gjs").default;
import multer from "multer";
const parser = new W3GReplay();

import nextConnect from "next-connect";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

const uploadMiddleware = upload.any();

const handler = nextConnect();

handler.use(uploadMiddleware);

handler.post(async (req: any, res: any) => {
  try {
    const file = req.files[0];
    const gamedatablock = [];
    let basic_info = {};
    parser.on("basic_replay_information", (info) => (basic_info = info));

    parser.on("gamedatablock", (block) => {
      gamedatablock.push(block);
    });
    const result = await parser.parse(file.buffer);

    // do stuff with files and body
    res.status(200).json({ result, gamedatablock, basic_info });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
    responseLimit: false,
  },
};
