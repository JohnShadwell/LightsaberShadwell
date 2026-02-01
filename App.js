import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Audio } from 'expo-av';

export default function App() {
  const [color, setColor] = useState("white")
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [swung, setSwung] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [sound, setSound] = useState();

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);
  const [isOn, setIsOn] = useState(false);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(setData)
    );
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          this.setTimeout( () => {
          sound.unloadAsync();
        },1000);
        }
      : undefined;
  }, [sound]);

/*
  Comment:
  When I first started implementing the on and off features, I was gathering data from the gyroscope rather than the accelerometer, thinking that it would make more sense since a gyroscope measures rotational motion and we were calculating the rotation of the phone. Then, I realized that the accelerometer measures the direction of the normal force as you hold your phone to oppose gravity. This means that you can determine that the phone is facing upward when a force of about 1g acts on the phone in the y-direction. I used this knowledge to approximate when the phone is facing upward or downward based on the y-value of the accelerometer. Then, I realized that I should make sure the lightsaber is not turned on when the phone is moving, as this means the user can tilt the phone and still turn it on. So, I added the x-value and z-value of the accelerometer into my equation. After a small amount of tweaking to account for human error and make sure the user can reasonably turn the lightsaber on and off, I arrived at the functions below. The display change I used is a simple change in background color.
*/

  const turnOn = async () => {
    if (isOn == false && y < 1.05 && y > 0.95 && x < 0.15 && x > -0.15 && z < 0.15 && z > -0.15)
    {
      console.log('on');
      setIsOn(true);
      setColor("red");
      const { sound } = await Audio.Sound.createAsync( require('./assets/saber_on.mp3')
    );
    setSound(sound);
    await sound.playAsync();
    }
    else if (isOn == true && y > -1.05 && y < -0.95 && x < 0.15 && x > -0.15 && z < 0.15 && z > -0.15)
    {
      console.log('off');
      setIsOn(false);
      setColor("white");
      const { sound } = await Audio.Sound.createAsync( require('./assets/saber_off.mp3')
    );
    setSound(sound);
    await sound.playAsync();
    }
  }

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

/*
  Comment:
  I struggled a lot with this part of the assignment initially. When I began, I tried to create an interval inside a useEffect that would check the acceleration of the lightsaber after a set amount of time. However, I realized that I implemented this incorrectly, and that my accelerometer data would never update because I never reached the end of the useEffect. So, I decided to approach the issue another way and remove the interval. Instead, I put the accelerometer data in the depenencies of the useEffect so that it would check the acceleration every time the data is updated. In the useEffect, I placed an async function (checkAcc) that analyzes the data and determines when a crash or swing sound should be played. This worked very well. To determine the acceleration of the phone, I found the sum of the acceleration's component vectors by the equation used below. Different sounds are played for different acceleration values. I also added a "swung" variable, which makes sure that the crash sound is only played after the user swings and makes an abrupt stop. I also made a slight change to the sound-playing function by adding a timeout that stops sounds from being cut-off if a new sound is started. Lastly, I tweaked the values that determine when each sound should be played to make sure they work properly.
*/

  const checkAcc = async() => {
    if (isOn) {
      if (Math.sqrt((x*x) + (y*y) + (z*z)) < 1.22 && Math.sqrt((x*x) + (y*y) + (z*z)) > 0.78 && swung)
      {
        const { sound } = await Audio.Sound.createAsync( require('./assets/saber_crash.mp3')
    );
    setSound(sound);
    await sound.playAsync();
    setSwung(false);
      }
        else if (Math.sqrt((x*x) + (y*y) + (z*z)) > 2)
        {
          const { sound } = await Audio.Sound.createAsync( require('./assets/saber_swing.mp3')
    );
    setSound(sound);
    await sound.playAsync();
    setSwung(true);
        }
        else {
          setSwung(false);
        }
        console.log(Math.sqrt((x*x) + (y*y) + (z*z)))
    }
  }

  useEffect(() => {
    checkAcc();
  }, [x, y, z]);

  return (
    <View style={{
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    backgroundColor: color}}>
        <TouchableOpacity onPress={turnOn} style={styles.button}>
          <Text>Power</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: "20%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
});
