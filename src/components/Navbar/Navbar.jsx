import React, { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

import { profile } from '../../data/cvData';
import { getNavLabel, NAV_SECTIONS } from '../../constants/navigation';
import { useActiveSection } from '../../hooks/useActiveSection';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Navbar.scss';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const activeSection = useActiveSection(NAV_SECTIONS);

  const linkClass = (item) => (activeSection === item ? 'app__navbar-link--active' : '');

  return (
    <nav className="app__navbar">
      <a href="#home" className="app__navbar-brand">
        {profile.displayName}
      </a>
      <ul className="app__navbar-links">
        {NAV_SECTIONS.map((item) => (
          <li
            className={`app__flex p-text ${linkClass(item)}`.trim()}
            key={`link-${item}`}
          >
            <div />
            <a href={`#${item}`}>{getNavLabel(item)}</a>
          </li>
        ))}
      </ul>

      <div className="app__navbar-actions app__flex">
        <ThemeToggle />
        <div className="app__navbar-menu">
          <button type="button" className="app__navbar-menu-btn" aria-label="Open menu" onClick={() => setToggle(true)}>
            <HiMenuAlt4 />
          </button>

          <AnimatePresence>
            {toggle && (
              <motion.div
                className="app__navbar-mobile"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className="app__navbar-mobile-header app__flex">
                  <ThemeToggle />
                  <button type="button" aria-label="Close menu" onClick={() => setToggle(false)}>
                    <HiX />
                  </button>
                </div>
                <ul>
                  {NAV_SECTIONS.map((item) => (
                    <li key={item} className={linkClass(item)}>
                      <a href={`#${item}`} onClick={() => setToggle(false)}>
                        {getNavLabel(item)}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
