import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from './src/components/Button';
import {Display} from './src/components/Display';

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operation, setOperation] = useState(null);
  const [clearDisplay, setClearDisplay] = useState(false);
  const [current, setCurrent] = useState(0);
  const [values, setValues] = useState([0, 0]);

  const clearMemory = () => {
    setDisplayValue('0');
    setOperation(null);
    setClearDisplay(false);
    setCurrent(0);
    setValues([0, 0]);
  };

  const addDigit = ParamNumero => {
    const clear = displayValue === '0' || clearDisplay;

    if (displayValue.includes('.') && ParamNumero === '.' && !clearDisplay) {
      return;
    }

    const currentValue = clear ? '' : displayValue;
    const display = currentValue + ParamNumero;
    setDisplayValue(display);
    setClearDisplay(false);

    if (ParamNumero !== '.') {
      const newValue = parseFloat(display);
      const newValues = [...values];
      newValues[current] = newValue;
      setValues(newValues);
    }
  };

  // versao 1 da logica das operacoes
  const MyVersionOfclickOperation = paramOperation => {
    if (operation && values[1] !== 0) {
      if (operation === '+') {
        const result = values.reduce((a, b) => a + b, 0);
        setDisplayValue(String(result));
        const newValues = [result, 0];
        setValues(newValues);
      } else if (operation === '-') {
        const result = values.reduce((total, num) => {
          return (total = total - num);
        });
        setDisplayValue(String(result));
        const newValues = [result, 0];
        setValues(newValues);
      } else if (operation === '*') {
        const result = values.reduce((total, num) => {
          return (total = total * num);
        });
        setDisplayValue(String(result));
        const newValues = [result, 0];
        setValues(newValues);
      } else if (operation === '/') {
        const result = values.reduce((total, num) => {
          return (total = total / num);
        });
        setDisplayValue(String(result));
        const newValues = [result, 0];
        setValues(newValues);
      }
      setOperation(paramOperation);
      setClearDisplay(true);
      setCurrent(1);
    } else {
      setClearDisplay(true);
      setOperation(paramOperation);
      setCurrent(1);
    }
  };

  // versao 2 da logica das operacoes
  const clickOperation = paramOperation => {
    if (current === 0) {
      setOperation(paramOperation);
      setClearDisplay(true);
      setCurrent(1);
    } else {
      const equals = paramOperation === '=';
      const currentValues = [...values];
      try {
        currentValues[0] = eval(
          `${currentValues[0]} ${operation} ${currentValues[1]} `,
        );
      } catch (err) {
        currentValues[0] = values[0];
      }
      setDisplayValue(String(currentValues[0]));
      setOperation(equals ? null : paramOperation);
      setCurrent(equals ? 0 : 1);
      setClearDisplay(true);
      setValues(currentValues);
    }
  };

  return (
    <View style={styles.container}>
      <Display value={displayValue} operation={operation} resu={values[0]} />
      <View style={styles.buttons}>
        <Button
          label="AC"
          triple={true}
          operation={true}
          onClick={clearMemory}
        />
        <Button
          label="/"
          operation={true}
          onClick={() => clickOperation('/')}
        />
        <Button label="7" onClick={() => addDigit(7)} />
        <Button label="8" onClick={() => addDigit(8)} />
        <Button label="9" onClick={() => addDigit(9)} />
        <Button
          label="*"
          operation={true}
          onClick={() => clickOperation('*')}
        />
        <Button label="4" onClick={() => addDigit(4)} />
        <Button label="5" onClick={() => addDigit(5)} />
        <Button label="6" onClick={() => addDigit(6)} />
        <Button
          label="-"
          operation={true}
          onClick={() => clickOperation('-')}
        />
        <Button label="1" onClick={() => addDigit(1)} />
        <Button label="2" onClick={() => addDigit(2)} />
        <Button label="3" onClick={() => addDigit(3)} />
        <Button
          label="+"
          operation={true}
          onClick={() => clickOperation('+')}
        />
        <Button label="0" double={true} onClick={() => addDigit(0)} />
        <Button label="." onClick={() => addDigit('.')} />
        <Button
          label="="
          operation={true}
          onClick={() => clickOperation('=')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default App;
