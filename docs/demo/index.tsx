/* eslint-disable react/jsx-no-target-blank */

import React from 'react';
import MultiTree from '@hyrule/util/src/struct/multiTree';
import treeData from '@hyrule/util/test/treeData.mock';
import _get from 'lodash';

const entity = new MultiTree(treeData, {
  childrenKey: 'child',
  routeKey: 'id',
});

export default () => {
  return <div />;
};
