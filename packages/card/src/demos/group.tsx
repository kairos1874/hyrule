import React from 'react';
import ProCard from '@hyrule-ui/card';

export default () => {
  return (
    <>
      <ProCard title="卡片组展开" ghost gutter={8} collapsible>
        <ProCard layout="center" bordered>
          卡片内容
        </ProCard>
        <ProCard layout="center" bordered>
          卡片内容
        </ProCard>
        <ProCard layout="center" bordered>
          卡片内容
        </ProCard>
      </ProCard>
    </>
  );
};
