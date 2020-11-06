/* eslint-disable react/jsx-no-target-blank */

import React from 'react';
import jenkinsSvg from '../icon/jenkins.svg';

const NAVIGATIONS = [
  {
    name: 'Sinopia',
    link: 'https://umijs.org',
    logo:
      'https://gw.alipayobjects.com/zos/bmw-prod/598d14af-4f1c-497d-b579-5ac42cd4dd1f/k7bjua9c_w132_h130.png',
  },
  {
    name: 'Jenkins',
    link: 'http://jenkins.zn.hy.com/',
    logo: jenkinsSvg,
  },
  {
    name: 'Yapi',
    link: 'http://jenkins.zn.hy.com/',
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
