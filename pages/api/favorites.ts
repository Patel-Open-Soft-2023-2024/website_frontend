import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import { axiosMainServerInstance } from "@/libs/axiosInstance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res);
    console.log("fav",currentUser.email);
    const favoritedMovies = await axiosMainServerInstance.post('/favourites/next',{email:currentUser.email})
    console.log("favNEXT",favoritedMovies.data);
    return res.status(200).json(favoritedMovies);
  } catch (error) {
    // console.log(error);
    return res.status(500).end();
  }
}
