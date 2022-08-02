/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 *
 */

import { Timestamp } from "mongodb";
import { connectToDatabase } from "../../../util/monogodb";

export default async function handler(req, res) {
  const { method, body } = req;

  const { db } = await connectToDatabase();

  switch (method) {
    case "GET":
      try {
        const posts = await db
          .collection("posts")
          .find()
          .sort({ timestamp: -1 })
          .toArray();
        res.status(200).json(posts);
      } catch (err) {
        res.status(500).json(err);
      }
      break;
    case "POST":
      try {
        const post = await db
          .collection("posts")
          .insertOne({ ...body, timestamp: new Timestamp() });
        res.status(201).json(post);
      } catch (err) {
        res.status(500).json(err);
      }
      break;

    default:
      res.status(500).json({ success: false });
      break;
  }
}
