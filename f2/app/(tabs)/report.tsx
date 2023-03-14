import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const ReportPage = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [50, 30, 70, 45, 80, 55],
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // blue
      },
    ],
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={700}
        height={500}
        yAxisSuffix="hrs"
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726', // orange
          },
        }}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    marginVertical: 20,
  },
});

export default ReportPage;
