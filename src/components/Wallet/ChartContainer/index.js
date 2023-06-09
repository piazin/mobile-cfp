import { Text, Image } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryPie } from 'victory-native';
import ImgNotFound from '../../../assets/not_found.png';

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
            duration: 2500,
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
          labels={() => null}
        />
      ) : (
        <View style={styles.chartContainer}>
          <Image source={ImgNotFound} size="2xl" alt="not found transactions" />
          <Text color="muted.400" fontSize="lg" fontWeight="light" fontFamily="body">
            Nada encontrado neste mês.
          </Text>
        </View>
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
