import { View, Dimensions } from "react-native";
import React from "react";
import { PieChart } from "react-native-chart-kit";
import { colors } from "../styles/common";

const screenWidth = Dimensions.get("screen").width - 40 - 75;

const Chart = ({ inStock = 90, outOfStock = 10 }) => {
  const data = [
    {
      name: "Out of Stock",
      population: outOfStock,
      color: colors.color1_light,
      legendFontColor: colors.color2,
      legendFontSize: 15,
    },
    {
      name: "In Stock",
      population: inStock,
      color: colors.color1_light2,
      legendFontColor: colors.color2,
      legendFontSize: 15,
    },
  ];

  //
  const chartConfig = {
    color: (opacity = 1) => `rgba(26,255,146,${opacity})`,
  };

  return (
    <View>
      <PieChart
        data={data}
        // data={data2}
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
