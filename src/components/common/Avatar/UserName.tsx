import React from "react";

const UserName = ({ children }: { children: React.ReactNode | string }) => {
  return <p className="w-full text-sm font-bold">{children}</p>;
};

export default UserName;
