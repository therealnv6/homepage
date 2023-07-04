import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const unsplashResponse = await fetch(
      "https://api.unsplash.com/photos/random?query=forest",
      {
        headers: {
          "Authorization": `Client-ID ${process.env.UNPLASH_TOKEN}`,
        },
      },
    );

    if (!unsplashResponse.ok) {
      await alt_wallhaven(req, res);
      return;
    }

    const { urls } = await unsplashResponse.json();
    res.status(200).json({ path: urls.regular });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to get random picture from Unsplash!",
    });
  }
}

export async function alt_wallhaven(
  _: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const query = "forest";
    const response = await fetch(
      `https://wallhaven.cc/api/v1/search?q=${query}&purity=100&sorting=random`,
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
