import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import { axiosMainServerInstance } from "@/libs/axiosInstance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("/subscribe visited")
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res);
    const {id:plan} = req.body;

    const { data } = await axiosMainServerInstance.post('/subscribe?plan=' + plan);
    
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
