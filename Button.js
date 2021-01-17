import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const baseContainer = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#fff',
}

const baseText = {
    fontSize: 36,
}

class Button extends React.Component {
    render() {
        const { text, special, onPress } = this.props;
        return (
            <TouchableOpacity
                onPress={() => {
                    this.text.rubberBand(400);
                    onPress(text);
                }}
                style={special ? styles.specailContainer : styles.container}
            >
                <Animatable.Text ref={ref => {
                    this.text = ref;
                }} style={special ? styles.specialText : styles.text}>
                    {text}
                </Animatable.Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        ...baseContainer,
    },

    specailContainer: {
        flex: 2,
        backgroundColor: '#9bc23c',
        color: 'white',
        ...baseContainer
    },

    text: {
        ...baseText,
    },

    specialText: {
        ...baseText,
        color: '#fff',
    }
});


export default Button;
