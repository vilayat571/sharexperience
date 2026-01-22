import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full absolute bottom-6">
      <div className="flex items-center justify-center">
        <h2 className=" text-gray-700">Bye</h2>
      </div>
      <p className="text-gray-400 text-center text-sm">
        built with coffee and stress ☕
      </p>
    </footer>
  );
};

export default Footer;
