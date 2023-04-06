import { Text } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryPie, VictoryTooltip } from 'victory-native';

export const ChartContainer = ({ infoTransactions }) => {
  return (
    <View style={styles.chartContainer}>
      {infoTransactions?.length > 0 ? (
        <VictoryPie
          data={infoTransactions}
          x="type"
          y="value"
          width={350}
          innerRadius={70}
          padAngle={5}
          animate={{
            duration: 2000,
            easing: 'bounce',
          }}
          colorScale={infoTransactions.map((element) =>
            element.type == 'Receitas' ? '#40B67A' : '#FF5555'
          )}
          style={{
            labels: {
              fill: 'red',
            },
            data: {
              stroke: ({ datum }) => (datum.type == 'Receitas' ? '#40B67A' : '#FF5555'),
              strokeWidth: 5,
            },
          }}
          labelComponent={<VictoryTooltip renderInPortal={false} />}
        />
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    marginTop: -25,
    minHeight: 350,
    justifyContent: 'center',
  },
});
