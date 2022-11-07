// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const ReplayParser = require("w3gjs/dist/lib/parsers/ReplayParser").default;

import fs from "fs";

import middleware from "../../middleware/middleware";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const files = req.files;
    const body = req.body;

    console.log(files, body);

    // do stuff with files and body
    res.status(200).json({});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};