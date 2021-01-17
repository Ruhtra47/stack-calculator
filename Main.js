import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import { pressNum, enter, operation, clear, swap, toggleNegative } from './modules';
import Button from './Button';
import { TouchableOpacity } from 'react-native-gesture-handler';

class App extends React.Component {
  render() {
    const {
      calculatorState: { stack, inputState },
      operationAction,
      pressNumWithDispacth,
      enterAction,
      clearAction,
      swapAction,
      toggleNegativeAction,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TouchableOpacity style={styles.bottomBorder} onPress={() => toggleNegativeAction(2)}>
            <Text numberOfLines={1} style={styles.append}>
              {'  '}
              {stack[2] || 0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBorder} onPress={() => toggleNegativeAction(1)}>
            <Animatable.Text numberOfLines={1} style={styles.append}>
              {'  '}
              {stack[1] || 0}
            </Animatable.Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleNegativeAction(0)}>
            <Animatable.Text
              ref={ref => {
                this.text1 = ref;
              }}
              numberOfLines={1}
              style={styles[inputState]}>
              {'  '}
              {stack[0] || 0}
            </Animatable.Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <View style={styles.row}>
            <Button text='clear' onPress={(x) => { clearAction(); this.text1.flash(500); }} />
            <Button text='pow' onPress={(x) => { operationAction(x); this.text1.flash(500); }} />
            <Button text='swap' onPress={swapAction} />
            <Button text='/' onPress={(x) => {
              operationAction(x);
              this.text1.flash(500);
            }} />
          </View>
          <View style={styles.row}>
            <Button text='9' onPress={pressNumWithDispacth} />
            <Button text='8' onPress={pressNumWithDispacth} />
            <Button text='7' onPress={pressNumWithDispacth} />
            <Button text='X' onPress={(x) => {
              operationAction(x)
              this.text1.flash(500);
            }} />
          </View>
          <View style={styles.row}>
            <Button text='6' onPress={pressNumWithDispacth} />
            <Button text='5' onPress={pressNumWithDispacth} />
            <Button text='4' onPress={pressNumWithDispacth} />
            <Button text='-' onPress={(x) => {
              operationAction(x)
              this.text1.flash(500);
            }} />
          </View>
          <View style={styles.row}>
            <Button text='3' onPress={pressNumWithDispacth} />
            <Button text='2' onPress={pressNumWithDispacth} />
            <Button text='1' onPress={pressNumWithDispacth} />
            <Button text='+' onPress={(x) => {
              operationAction(x)
              this.text1.flash(500);
            }} />
          </View>
          <View style={styles.row}>
            <Button text='0' onPress={pressNumWithDispacth} />
            <Button text='.' onpress={pressNumWithDispacth} />
            <Button text='enter' onPress={enterAction} special />
          </View>
        </View>

      </View>
    );
  }
}


const baseNumber = {
  color: '#2E71E5',
  backgroundColor: '#333',
  textAlign: 'right',
  padding: 10,
  fontSize: 40,
};

const styles = StyleSheet.create({
  bottomBorder: {
    borderBottomWidth: 1,
    borderColor: '#fff',
  },

  container: {
    flex: 1,
  },

  top: {
    backgroundColor: '#333',
    padding: Platform.OS === 'ios' ? 32 : 20,
  },

  bottom: {
    flex: 1,
  },

  append: {
    ...baseNumber,
    color: '#fff',
  },

  replace: {
    ...baseNumber,
    color: '#2E71E5',
  },

  push: {
    ...baseNumber,
    color: '#9bc23c',
  },


  row: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
});

export default connect(
  state => ({ calculatorState: state }),
  dispatch => bindActionCreators(
    {
      pressNumWithDispacth: pressNum,
      enterAction: enter,
      operationAction: operation,
      clearAction: clear,
      swapAction: swap,
      toggleNegativeAction: toggleNegative,
    }, dispatch),
)(App);
