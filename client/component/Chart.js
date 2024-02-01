import { View, Dimensions } from "react-native";
import React from "react";
import { PieChart } from "react-native-chart-kit";
import { colors } from "../styles/common";

const screenWidth = Dimensions.get("screen").width - 40 - 75;

const Chart = ({ inStock = 120000000, outOfStock = 200000000 }) => {
  const data = [
    {
      name: "Out of Stock",
      population: outOfStock,
      //   color: colors.color1_light,
      color: "red",
      //   legendFontColor: colors.color2,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "In Stock",
      population: inStock,
      //   color: colors.color1_light2,
      color: "green",
      //   legendFontColor: colors.color2,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  //

  const data2 = [
    {
      name: "Seoul",
      population: 1000000,
      color: "rgba(131, 167, 234, 1)",
      //   color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    color: (opacity = 1) => `rgba(26,255,146,${opacity})`,
    // color: (opacity = 1) => `rgba(26,255,146,${opacity})`,
  };

  return (
    <View>
      <PieChart
        // data={data}
        data={data2}
        width={screenWidth}
        height={150}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={colors.color3}
        absolute
      />
    </View>
  );
};

export default Chart;
