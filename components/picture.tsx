import { useEffect, useState } from "react";

export default function PictureComponent() {
  const [picture, setPicture] = useState("");

  const MAX_RETRIES = 5; // Maximum number of retries
  const RETRY_DELAY = 1000; // Delay between retries in milliseconds

  const fetchPicture = (retries = 0) => {
    fetch("/api/picture")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to get random picture from Wallhaven!");
        }
        return response.json();
      })
      .catch((error) => {
        console.error(error);
        if (retries < MAX_RETRIES) {
          setTimeout(() => fetchPicture(retries + 1), RETRY_DELAY);
        }
      })
      .then((data) => setPicture(data.path));
  };

  useEffect(() => {
    fetchPicture();
  }, []);

  return (
    <>
      <div>
        <img
          src={picture}
          style={{
            width: "240px",
            height: "360px",
            objectFit: "cover",
          }}
        />
      </div>
    </>
  );
}
