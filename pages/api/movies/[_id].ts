import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import {axiosMainServerInstance} from "@/libs/axiosInstance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const { _id } = req.query;

    if (typeof _id !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!_id) {
      throw new Error('Missing Id');
    }
    const movie=await axiosMainServerInstance.get(`/movie/${_id}`);
    return res.status(200).json(movie.data.data[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
