import { useEffect, useState } from "react";

type ConfigData = {
  [key: string]: {
    [subKey: string]: string;
  };
};

export default function SectionComponent() {
  const [data, setData] = useState<ConfigData | null>(null);
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    fetch("sections.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setKeys(Object.keys(jsonData));
      })
      .catch((error) => {
        console.error("Error fetching JSON data:", error);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {keys.map((key) => (
          <div key={key} className="flex flex-col">
            <div className="card  p-4">
              <h2 className="text-orange-200 text-bold">{key}</h2>
              <ul>
                {Object.entries(data[key]).map(([subKey, url]) => (
                  <li key={subKey}>
                    <a href={url}>~ {subKey}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
