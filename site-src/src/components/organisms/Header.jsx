import { useState } from 'react';
import { Link } from 'react-router-dom';
import { navigation } from '../../data/navigation';
import { IconImage } from '../atoms/IconImage';
import { NavItem } from '../molecules/NavItem';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="relative z-30 bg-white">
      <div className="mx-auto flex h-[88px] max-w-[920px] items-center justify-between px-page-x md:translate-x-[28px] md:justify-start md:gap-[140px]">
        <Link className="logo-link block h-[54px] w-[57px]" to="/" aria-label="Techreate home" onClick={closeMenu}>
          <IconImage className="h-full w-full object-contain" name="logo.png" />
        </Link>

        <button
          className="menu-button md:hidden"
          type="button"
          aria-expanded={isOpen}
          aria-controls="site-navigation"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
          <span className="sr-only">Menu</span>
        </button>

        <nav
          id="site-navigation"
          className={`${isOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-[88px] flex-col gap-2 border-y border-black bg-white px-page-x py-4 md:static md:flex md:flex-row md:items-center md:gap-[94px] md:border-0 md:p-0`}
          aria-label="サイト"
        >
          {navigation.map((item) => (
            <NavItem key={item.label} item={item} onNavigate={closeMenu} menuOpen={isOpen} />
          ))}
        </nav>
      </div>
    </header>
  );
}
