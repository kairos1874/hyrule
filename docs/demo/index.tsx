/* eslint-disable react/jsx-no-target-blank */

import React from 'react';
import MultiTree from '@hyrule/util/src/struct/MultiTree';
import treeData from '@hyrule/util/test/treeData.mock';
import treeData2 from '@hyrule/util/test/treeData2.mock';
import _get from 'lodash';

const entity = new MultiTree(treeData2, {
  childrenKey: 'children',
  routeKey: 'label',
  targetChildrenKey: 'childs',
});

console.log(
  entity.map((item, structData, vm) => {
    return {
      ...item,
      ...structData,
    };
  }),
);
// debugger

export default () => {
  return <div />;
};
