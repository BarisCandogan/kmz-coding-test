import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

type Props = {
  onPress?: () => void;
  radius: number;
  textColor: string;
  backgroundColor: string;
  text: string;
};

const Button = ({onPress, radius, textColor, backgroundColor, text}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.buttonContainer,
        {
          opacity: pressed ? 0.5 : 1,
          borderRadius: radius,
          backgroundColor: backgroundColor,
        },
      ]}>
      <Text style={[styles.buttonText, {color: textColor}]}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 50,

    justifyContent: 'center',
    alignItems: 'center',

    height: 50,
    width: 250,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
