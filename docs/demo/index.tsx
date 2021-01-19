/* eslint-disable react/jsx-no-target-blank */

import React from 'react';
import MultipleTree from '@hyrule/util/src/MultipleTree';
import treeData from '@hyrule/util/test/treeData.mock';
import _get from 'lodash';

const entity = new MultipleTree(treeData, {
  childrenKey: 'child',
  routeKey: 'id',
});
debugger;
const result = entity.filter(item => {
  // @ts-ignore
  return _get(item, 'name') === '剔库规则表100' || _get(item, 'name') === 'VB你1';
});

const result2 = entity.filter(item => {
  return {
    ...item,
  };
});
console.log(result);

export default () => {
  return <div />;
};
