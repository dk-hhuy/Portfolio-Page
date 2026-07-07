import React, { useEffect, useMemo, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { HiDownload, HiMail, HiViewGrid } from 'react-icons/hi';

import { AppWrap } from '../../wrapper';
import OptimizedImage from '../../components/OptimizedImage';
import { images } from '../../constants';
import { CV_DOWNLOAD_QUERY, client, resolveCvDownload } from '../../client';
import { headerTechIcons, profile } from '../../data/cvData';
import HeroStats from './HeroStats';
import './Header.scss';

const staticHeroActions = [
  {
    id: 'projects',
    href: '#work',
    label: 'View Projects',
    icon: HiViewGrid,
    variant: 'primary',
  },
  {
    id: 'contact',
    href: '#contact',
    label: 'Contact Me',
    icon: HiMail,
    variant: 'ghost',
  },
];

const Header = () => {
  const [cvDownload, setCvDownload] = useState(() => resolveCvDownload(null, profile));

  useEffect(() => {
    client
      .fetch(CV_DOWNLOAD_QUERY)
      .then((data) => setCvDownload(resolveCvDownload(data, profile)))
      .catch(() => setCvDownload(resolveCvDownload(null, profile)));
  }, []);

  const heroActions = useMemo(() => {
    const cvAction = {
      id: 'cv',
      href: cvDownload.url,
      label: 'Download CV',
      icon: HiDownload,
      variant: 'outline',
      ...(cvDownload.isExternal
        ? { external: true }
        : { download: cvDownload.fileName }),
    };

    return [
      staticHeroActions[0],
      cvAction,
      staticHeroActions[1],
    ];
  }, [cvDownload]);

  return (
    <div className="app__header app__flex">
      <div className="app__header-info">
        <div className="app__header-badge">
          <div className="badge-cmp">
            <span className="badge-cmp__wave" aria-hidden>👋</span>
            <div className="badge-cmp__content">
              <p className="badge-cmp__greeting">Hello, I am</p>
              <h1 className="badge-cmp__name">{profile.firstName}</h1>
            </div>
          </div>

          <div className="tag-cmp app__flex">
            <TypeAnimation
              sequence={[
                profile.tagline,
                2000,
                'React · Next.js · Node.js',
                2000,
              ]}
              wrapper="p"
              className="p-text tag-cmp__typing"
              speed={50}
              repeat={Infinity}
            />
            <p className="p-text">{profile.subtitle}</p>
          </div>

          <div className="app__header-cta app__flex">
            {heroActions.map((action, index) => {
              const Icon = action.icon;

              return (
                <a
                  key={action.id}
                  href={action.href}
                  className={`hero-icon-btn hero-icon-btn--${action.variant}`}
                  style={{ animationDelay: `${0.82 + index * 0.12}s` }}
                  aria-label={action.label}
                  title={action.label}
                  {...(action.download ? { download: action.download } : {})}
                  {...(action.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <span className="hero-icon-btn__icon-wrap" aria-hidden="true">
                    <Icon className="hero-icon-btn__icon" />
                  </span>
                  <span className="hero-icon-btn__label">{action.label}</span>
                </a>
              );
            })}
          </div>

          <HeroStats />
        </div>
      </div>

      <div className="app__header-img">
        <div className="app__header-img-ring" aria-hidden="true">
          <OptimizedImage
            src={images.circle}
            alt=""
            fill
            className="overlay_circle"
            objectFit="contain"
            sizes="(max-width: 1200px) 90vw, 820px"
          />
        </div>
        <div className="app__header-img-profile">
          <OptimizedImage
            src={images.profile}
            alt={profile.displayName}
            priority
            fill
            sizes="(max-width: 1200px) 90vw, 820px"
            objectFit="contain"
          />
        </div>
      </div>

      <div className="app__header-circles">
        {headerTechIcons.map((icon, index) => (
          <div className="circle-cmp app__flex" key={`circle-${index}`}>
            <OptimizedImage src={icon} alt="tech" width={60} height={60} objectFit="contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppWrap(Header, 'home', 'app__section-white');
