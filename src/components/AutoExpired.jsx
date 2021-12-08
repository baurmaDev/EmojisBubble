import React, { Fragment, useState, useEffect } from "react";

const AutoExpire = ({ children }) => {
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsExpired(true);
    }, 6000);
  }, []);

  if (isExpired) {
    return null;
  }
  return <Fragment>{children} </Fragment>;
};

export default AutoExpire;
