import React from 'react';
import PropTypes from 'prop-types';
import { ThemeConsumer } from '../contexts/theme';

export default function Card({
  header,
  subheader,
  avatar,
  href,
  name,
  children
}) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`card bg-${theme}`}>
          {/* header */}
          <h4 className='header-lg center-text'>{header}</h4>

          {/* avatar */}
          <a href={href}>
            <img className='avatar' src={avatar} alt={`Avatar for ${name}`} />
          </a>

          {/* subheader */}
          {subheader && <h4 className='center-text'>{subheader}</h4>}

          {/* link */}
          <h2 className='center-text'>
            <a className='link' href={href}>
              {name.length > 21 ? name.substring(0, 18) + '...' : name}
            </a>
          </h2>
          {children}
        </div>
      )}
    </ThemeConsumer>
  );
}

Card.propTypes = {
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subheader: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  avatar: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
