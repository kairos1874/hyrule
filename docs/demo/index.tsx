/* eslint-disable react/jsx-no-target-blank */

import React from 'react';
import MultipleTree from '@hyrule/util/src/MultipleTree';
import treeData from '@hyrule/util/test/treeData.mock';

const entity = new MultipleTree(treeData, {
  childrenKey: 'child',
  routeKey: 'id',
});
debugger;
const result = entity.filter((item: { name: string }) => {
  return item.name === '剔库规则表100' || item.name === 'VB你1';
});
console.log(result);

export default () => {
  return <div />;
};
