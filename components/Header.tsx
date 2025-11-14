import React, { useState } from 'react';
import type { View } from '../types';
import { ShieldCheckIcon, DocumentTextIcon, UsersIcon, MenuIcon, XIcon } from './icons';

interface HeaderProps {
  activeView: View;
  setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, setView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'My Data Dashboard', icon: <UsersIcon /> },
    { id: 'audit', label: 'Audit Trail', icon: <DocumentTextIcon /> },
    { id: 'compliance', label: 'For Organizations', icon: <ShieldCheckIcon /> },
  ];

  const handleNavClick = (view: View) => {
    setView(view);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-brand-blue shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-white flex items-center space-x-2">
              <ShieldCheckIcon className="h-8 w-8 text-brand-green" />
              <span className="text-xl font-bold">DataGuardian</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id as View)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeView === item.id
                      ? 'bg-brand-green text-white'
                      : 'text-gray-300 hover:bg-white hover:bg-opacity-20 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-brand-blue inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-blue focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id as View)}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  activeView === item.id
                    ? 'bg-brand-green text-white'
                    : 'text-gray-300 hover:bg-white hover:bg-opacity-20 hover:text-white'
                }`}
                aria-current={activeView === item.id ? 'page' : undefined}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;