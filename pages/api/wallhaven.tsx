import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const query = "furry";
    const wh_api_key = "";
    const response = await fetch(
      `https://wallhaven.cc/api/v1/search?q=${query}&purity=111&sorting=random&apikey=${wh_api_key}`,
    );

    if (!response.ok) {
      throw new Error("Failed to get random picture from Wallhaven!");
    }

    const data = await response.json();
    const path = data.data[0].path;

    res.status(200).json({ path });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
