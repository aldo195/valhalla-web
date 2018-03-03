// @flow
import React from 'react';
import './GlobalFooter.css';
import classNames from 'classnames';

type Props = {
  className: string,
  links: Array<{
    key: string,
    href: string,
    title: string,
  }>,
  copyright: string,
};

const GlobalFooter = (props: Props) => {
  const {className, links, copyright} = props;

  const clsString = classNames('global-footer', className);
  return (
    <div className={clsString}>
      {links && (
        <div className={'links'}>
          {links.map(link => (
            <a key={link.key} target={link.blankTarget ? '_blank' : '_self'} href={link.href}>
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && <div className={'copyright'}>{copyright}</div>}
    </div>
  );
};

export default GlobalFooter;
