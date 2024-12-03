import React from "react";

const Container = ({ children }) => {
  return <div className="flex flex-row min-h-screen flex-grow">{children}</div>;
};

export default Container;
