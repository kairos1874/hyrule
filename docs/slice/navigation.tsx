/* eslint-disable react/jsx-no-target-blank */

import React from 'react';
import jenkinsSvg from '../icon/jenkins.svg';
import verdaccioIcon from '../icon/verdaccio.png';

const NAVIGATIONS = [
  {
    name: 'verdaccio',
    link: 'http://172.16.119.192:4873',
    logo: verdaccioIcon,
  },
  {
    name: 'Jenkins',
    link: 'http://172.16.119.192:8080',
    logo: jenkinsSvg,
  },
];

export default () => {
  return (
    <ul
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        margin: 0,
        padding: 0,
        listStyle: 'none',
      }}
    >
      {NAVIGATIONS.map((user, i) => (
        <li
          key={user.link}
          style={{
            width: 224,
            marginRight: i === NAVIGATIONS.length - 1 ? 0 : 16,
            marginBottom: 8,
            border: '1px solid #eee',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 600,
            borderRadius: 2,
          }}
        >
          <a
            style={{ display: 'block', color: '#666', padding: '18px 32px' }}
            target="_blank"
            href={user.link}
          >
            <img
              width={(user.name && 32) || undefined}
              height={(!user.name && 32) || undefined}
              style={{ verticalAlign: '-0.32em', marginRight: 8 }}
              src={user.logo}
              alt={user.name}
            />
            {user.name}
          </a>
        </li>
      ))}
    </ul>
  );
};
