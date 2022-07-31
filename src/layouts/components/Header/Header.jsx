import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useState } from 'react';

import BrandLogo from 'src/components/BrandLogo';
import Button from 'src/components/Button';
import { CaretDownIcon, SearchIcon } from 'src/components/Icons';
import styles from './Header.module.css';
import { navCta, navLink } from './nav-config';

const mk = classNames.bind(styles);

export default function Header() {
  const [iconDirection, setIconDirection] = useState('up');

  const { pathname } = useRouter();

  return (
    <header className={mk('header')}>
      <nav className={mk('nav')}>
        <ul className="flex gap-10 mb-12">
          {navLink.map((item, index) => (
            <li key={index} className="flex items-center gap-14-px">
              <Button text internalLink={item.path} title={mk({ active: pathname === item.path })}>
                {item.title}
              </Button>
              {index === 1 && (
                <CaretDownIcon
                  direction={iconDirection}
                  className="cursor-pointer"
                  handleClick={() =>
                    setIconDirection((preState) => (preState === 'up' ? 'down' : 'up'))
                  }
                />
              )}
            </li>
          ))}
        </ul>
        <BrandLogo />
        <div className="flex">
          <div className="flex relative mr-8">
            <input placeholder="Tìm kiếm" className={mk('input-search')} />
            <SearchIcon className={mk('search-icon')} />
          </div>
          <ul className="flex gap-8 mb-12">
            {navCta.map((item, index) => (
              <li key={index}>
                <Button icon internalLink={item.path}>
                  {item.icon}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
