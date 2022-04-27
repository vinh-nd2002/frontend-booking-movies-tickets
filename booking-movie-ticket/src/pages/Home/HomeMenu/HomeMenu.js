import React, { useState } from "react";
import { Tabs, Radio, Space } from "antd";

const { TabPane } = Tabs;
export const HomeMenu = () => {
  return (
    <>
      <Tabs tabPosition="left">
        <TabPane
          tab={<img src="https://picsum.photos/200" alt="tab" className="rounded-full"/>}
          key="1"
        >
          Content of Tab 1
        </TabPane>
        <TabPane
          tab={<img src="https://picsum.photos/200" alt="tab" className="rounded-full"/>}
          key="2"
        >
          Content of Tab 2
        </TabPane>
        <TabPane
          tab={<img src="https://picsum.photos/200" alt="tab" className="rounded-full"/>}
          key="3"
        >
          Content of Tab 3
        </TabPane>
      </Tabs>
    </>
  );
};
