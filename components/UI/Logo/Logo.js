import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import LogoArea from './Logo.style';

const LogoNext = ({ className, withLink, linkTo, title, src, imageOnly }) => {
  return (
    <LogoArea className={className}>
      {imageOnly ? (
        src && <img src={src} alt="Image" />
      ) : (
        withLink ? (
          <Link href={linkTo}>
            <a>
              {src && <img src={src} alt="white" />}
              {title && <h3>{title}</h3>}
            </a>
          </Link>
        ) : (
          <Fragment>
            {src && <img src={src} alt="color" />}
            {title && <h3>{title}</h3>}
          </Fragment>
        )
      )}
    </LogoArea>
  );
};

LogoNext.propTypes = {
  className: PropTypes.string,
  withLink: PropTypes.bool,
  linkTo: PropTypes.string,
  title: PropTypes.string,
  src: PropTypes.string,
  imageOnly: PropTypes.bool, // Don't forget to declare all props
};

export default LogoNext;
