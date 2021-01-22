/* eslint-disable react/jsx-no-target-blank */

import React from 'react';
import MultiTree from '@hyrule/util/src/struct/multiTree';
import treeData from '@hyrule/util/test/treeData.mock';
import treeData2 from '@hyrule/util/test/treeData2.mock';
import _get from 'lodash';

const entity = new MultiTree(treeData2, {
  childrenKey: 'children',
  routeKey: 'id',
});

console.log(
  entity.map(item => {
    return {
      ...item,
      aaa: 1111,
    };
  }),
);
// debugger

export default () => {
  return <div />;
};
