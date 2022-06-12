import React, { Fragment } from "react";
import { Tabs } from "antd";
import { HomeSchedule } from "./HomeSchedule/HomeSchedule";

const { TabPane } = Tabs;
export const HomeMenu = (props) => {
  const { cineplexs } = props;
  const renderCinemas = (cinemas, imgUrl) => {
    return cinemas.map((cinemaItem, index) => {
      return (
        <TabPane
          tab={
            <div className="flex justify-between items-center ">
              <img
                src={imgUrl}
                alt="logo-cinema"
                style={{ width: "60px", height: "60px" }}
              />
              <div
                className="text-center tracking-tighter p-2 text-ellipsis"
                style={{ width: "400px" }}
              >
                <h1 className="text-lg text-red-800">
                  {cinemaItem.cinemaName}
                </h1>
                <h1 className="text-xs text-gray-400">
                  {cinemaItem.cinemaAddress}
                </h1>
              </div>
            </div>
          }
          key={index}
        >
          {cinemaItem.rooms?.map((roomItem, key) => {
            return (
              <Fragment key={key}>
                <HomeSchedule room={roomItem} />
              </Fragment>
            );
          })}
        </TabPane>
      );
    });
  };
  const renderCineplexs = () => {
    return cineplexs?.map((cineplexItem, index) => {
      return (
        <TabPane
          tab={
            <img
              src={cineplexItem.cineplexLogo}
              alt="tab"
              className="rounded-md"
              style={{ width: "100px", height: "100px" }}
            />
          }
          key={index}
        >
          <Tabs tabPosition="left">
            {renderCinemas(cineplexItem.cinemas, cineplexItem.cineplexLogo)}
          </Tabs>
        </TabPane>
      );
    });
  };
  return (
    <div>
      <Tabs tabPosition="left">{renderCineplexs()}</Tabs>
    </div>
  );
};
