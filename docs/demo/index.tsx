/* eslint-disable react/jsx-no-target-blank */

import React from 'react';
import MultiTree from '@hyrule/util/src/struct/MultiTree';
import treeData from '@hyrule/util/test/treeData.mock';
import treeData2 from '@hyrule/util/test/treeData2.mock';
import _get from 'lodash';

const entity = new MultiTree(treeData2, {
  childrenKey: 'children',
  routeKey: 'label',
  targetChildrenKey: 'children',
});
debugger;

console.log(
  entity.map((item, structData, vm) => {
    return {
      ...item,
      ...structData,
    };
  }),
);

console.log(
  entity.pick((item, structData, vm) => {
    // @ts-ignore
    return item.label.includes('电影');
  }),
);

console.log(
  entity.filter((item, structData, vm) => {
    // @ts-ignore
    return item.label.includes('公司');
  }),
);
// debugger

export default () => {
  return <div />;
};
