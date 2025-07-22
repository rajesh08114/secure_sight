import React from 'react';
import ThreatIcons from './icons/ThreatIcons';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">SecureSight</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Dashboard</span>
          <span className="text-sm">Settings</span>
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <ThreatIcons type="Face Recognised" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;