import React from "react";

const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-70 transition-all duration-300"
      style={{
        backdropFilter: "blur(2px)",
      }}
    >
      {children}
    </div>
  );
};

export default Background;
