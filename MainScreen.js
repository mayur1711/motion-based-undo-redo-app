import { Accelerometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-root-toast';

const THRESHOLD = 200;
let prevTime = 0;

export default MainScreen = () => {
  const [textInputFull, setTextInputFull] = useState('');
  const [textInput, setTextInput] = useState('');
  const [textInputIndex, setTextInputIndex] = useState(-1);
  const [undoRedoFlag, setUndoRedoFlag] = useState(true);
  const [shakeFlag, setShakeFlag] = useState(false);
  const [toast, setToast] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [accelerometerData, setAccelerometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, [accelerometerData, textInputFull, textInput, textInputIndex, toast, undoRedoFlag, shakeFlag]);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(onChangeAccelerometer));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const onChangeAccelerometer = (data) => {
    const { x, y, z } = data;
    const currTime = Date.now();
    let speed;
    if (currTime - prevTime > 100) {
      let diffTime = currTime - prevTime;
      prevTime = currTime;
      speed = (Math.abs(x + y + z - accelerometerData.x - accelerometerData.y - accelerometerData.z) / diffTime) * 10000;
      if (speed > THRESHOLD) {
        onShakeTextInput();
      }
    }

    if (speed < 50) {
      const { width, height } = Dimensions.get('window');
      const portrait = width > height ? false : true;
      const roll = Math.atan2(y, z) * 57.3;
      const pitch = Math.atan2(-1 * x, Math.pow(y * y + z * z, 0.5)) * 57.3;
      const tilt = portrait ? pitch : roll;

      if (tilt >= 30 && undoRedoFlag) {
        setUndoRedoFlag(false);
        onRedoTextInput();
      }
      if (tilt <= -30 && undoRedoFlag) {
        setUndoRedoFlag(false);
        onUndoTextInput();
      }
      if (tilt > -8 && tilt < 8) {
        setUndoRedoFlag(true);
      }
    }
    setAccelerometerData(data);
  };

  const onUndoTextInput = () => {
    if (!shakeFlag) {
      const newIndex = textInputIndex >= 0 ? textInputIndex - 1 : -1;
      setTextInput(textInputFull.substring(0, newIndex + 1));
      setTextInputIndex(newIndex);
      if (newIndex !== textInputIndex) {
        toast && Toast.hide(toast);
        setToast(Toast.show('Text Undo', { duration: Toast.durations.SHORT, ...toastStyles }));
      }
    }
  };

  const onRedoTextInput = () => {
    let newIndex;
    if (shakeFlag) {
      setShakeFlag(false);
      setTextInput(textInputFull);
      setTextInputIndex(textInputFull.length - 1);
    } else {
      newIndex = textInputIndex >= textInputFull.length - 1 ? textInputIndex : textInputIndex + 1;
      setTextInput(textInputFull.substring(0, newIndex + 1));
      setTextInputIndex(newIndex);
    }
    if (newIndex !== textInputIndex) {
      toast && Toast.hide(toast);
      setToast(
        Toast.show('Text Redo', {
          duration: Toast.durations.SHORT,
          ...toastStyles,
        })
      );
    }
  };

  const onShakeTextInput = () => {
    if (textInput != '') {
      setTextInputFull(textInput);
      setTextInput('');
      setTextInputIndex(-1);
      setUndoRedoFlag(true);
      setShakeFlag(true);
      if (textInput != '') {
        toast && Toast.hide(toast);
        setToast(Toast.show('Text cleared', { duration: Toast.durations.SHORT, ...toastStyles }));
      }
    }
  };

  const onChangeTextInput = (text) => {
    setTextInputFull(text);
    setTextInput(text);
    setTextInputIndex(text.length - 1);
    setShakeFlag(false);
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Type something..." value={textInput} onChangeText={onChangeTextInput} style={styles.textInput} />
      <Text style={styles.staticText}>Tilt phone left to undo text</Text>
      <Text style={styles.staticText}>Tilt phone right to redo text</Text>
      <Text style={styles.staticText}>Shake phone to clear text</Text>
    </View>
  );
};

const toastStyles = {
  backgroundColor: '#708090',
  shadow: false,
  textColor: '#ffffff',
  containerStyle: { borderRadius: 20, paddingHorizontal: 20 },
  textStyle: { fontFamily: 'Montserrat' },
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  textInput: {
    width: '100%',
    backgroundColor: '#e1f5fe',
    padding: 20,
    borderRadius: 15,
    borderColor: '#fa8072',
    borderWidth: 2,
    marginBottom: 30,
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  staticText: {
    fontSize: 16,
    margin: 5,
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: '600',
  },
});
