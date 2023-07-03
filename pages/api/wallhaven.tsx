import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const query = "forest";
    const response = await fetch(
      `https://wallhaven.cc/api/v1/search?q=${query}&purity=111&sorting=random`,
      {
        credentials: "include",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0",
        },
      },
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
