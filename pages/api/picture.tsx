import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  fetch(
    "https://api.unsplash.com/photos/random?query=forest",
    {
      headers: {
        "Authorization": `Client-ID ${process.env.UNPLASH_TOKEN}`,
      },
    },
  )
    .then((unsplashResponse) => {
      if (!unsplashResponse.ok) {
        return alt_wallhaven(req, res);
      }

      return unsplashResponse.json();
    })
    .then(({ urls }) => res.status(200).json({ path: urls.regular }))
    .catch((error) =>
      res.status(500).json({
        error: `Failed to get random picture from Unsplash! ${error.message}`,
      })
    );
}

async function alt_wallhaven(
  _: NextApiRequest,
  res: NextApiResponse,
) {
  return fetch(
    `https://wallhaven.cc/api/v1/search?q=forest&purity=100&sorting=random`,
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0",
      },
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to get random picture from Wallhaven!");
      }

      return response.json();
    })
    .then((data) => res.status(200).json({ path: data.data[0].path }))
    .catch((error) => res.status(500).json({ error: error.message }));
}
