import React from "react";
import { Tabs } from "antd";

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
        ></TabPane>
      );
    });
  };
  const renderCineplexs = () => {
    return cineplexs?.map((cineplexItem, index) => {
      console.log(cineplexItem);
      return (
        <TabPane
          tab={
            <img
              src={cineplexItem.cineplexLogo.imgUrl}
              alt="tab"
              className="rounded-md"
              style={{ width: "150px", height: "150px" }}
            />
          }
          key={index}
        >
          <Tabs tabPosition="left">
            {renderCinemas(
              cineplexItem.cinemas,
              cineplexItem.cineplexLogo.imgUrl
            )}
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
