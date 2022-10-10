import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  display: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'flex-end',
  },
  displayValue: {
    fontSize: 60,
    color: '#fff',
  },
  smallDisplayValue: {
    fontSize: 20,
    color: '#fff',
  },
});

const Display = props => {
  return (
    <View style={styles.display}>
      {props.operation && props.operation !== '=' && (
        <Text style={styles.smallDisplayValue}>
          {props.resu} {props.operation}
        </Text>
      )}
      <Text style={styles.displayValue}>{props.value}</Text>
    </View>
  );
};

export {Display};
