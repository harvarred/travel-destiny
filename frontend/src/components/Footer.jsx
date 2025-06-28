import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div>
        <p className="mb-1">🌍 TravelDestiny &copy; {new Date().getFullYear()}</p>
        <div>
          <a href="https://github.com/harvarred" target="_blank" rel="noopener noreferrer" className="text-white me-3">
            GitHub
          </a>
          <a href="#about" className="text-white me-3">About</a>
          <a href="#contact" className="text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
