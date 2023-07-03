import React, { useEffect, useState } from "react";

const DateComponent: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatDate = (date: Date): string => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString(
      undefined,
      options as Intl.DateTimeFormatOptions,
    );
  };

  return (
    <>
      {formatDate(currentTime)}
    </>
  );
};

export default DateComponent;
