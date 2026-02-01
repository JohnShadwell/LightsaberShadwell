# Lightsaber App

## Running the Application

This app is designed to run on a **physical mobile device** using **Expo Go**, as it relies on the phone’s accelerometer and audio output.

1. Open the Expo Snack link in your browser:  
   https://snack.expo.dev/@johnshadwell/lightsaberappshadwell  

2. Install the **Expo Go** app on your phone (iOS or Android).

3. Scan the QR code on the Snack page or open the project directly in Expo Go.

4. **How the app works (important):**
   - Hold your phone **face up** and press the **Power** button to turn the lightsaber **on**.
   - Flip your phone **face down** and press the **Power** button to turn the lightsaber **off**.
   - Once powered on, **swing the phone** to trigger lightsaber swing sounds.
   - Abruptly stopping a swing will trigger a **crash/clash sound**.

> ⚠️ This app will **not function correctly in a browser emulator** because accelerometer data is required.

---

## Overview

The Lightsaber App is an interactive mobile application that simulates a lightsaber using the phone’s orientation, motion sensors, and audio playback. The app responds to device orientation for powering on and off, and uses real-time accelerometer data to detect swings and impacts.

---

## Features

- Orientation-based power control (face up to turn on, face down to turn off)
- Real-time accelerometer motion detection
- Swing sound effects triggered by rapid motion
- Clash sound effects triggered by abrupt stops after a swing
- Dynamic background color to represent lightsaber state
- Audio feedback for power on/off, swing, and crash events

---

## Technology Stack

- **Framework:** React Native  
- **Platform:** Expo  
- **Languages:** JavaScript  
- **APIs & Libraries:**  
  - `expo-sensors` (Accelerometer)  
  - `expo-av` (Audio playback)  
  - React Hooks (`useState`, `useEffect`)  

---

## Implementation Details

- Uses the `Accelerometer` API to continuously track x, y, and z acceleration values.
- Phone orientation is determined by checking acceleration thresholds on each axis.
- The lightsaber:
  - Turns **on** when the phone is face up and the power button is pressed.
  - Turns **off** when the phone is face down and the power button is pressed.
- Swing detection is based on the magnitude of the acceleration vector:
  \[
  \sqrt{x^2 + y^2 + z^2}
  \]
- Different acceleration thresholds trigger:
  - Swing sounds for high acceleration
  - Crash sounds when motion suddenly stops after a swing
- A `swung` state variable prevents repeated crash sounds from triggering incorrectly.
- Audio playback is carefully managed to avoid sounds being cut off prematurely.

---

## Learning Outcomes

- Learned to work with mobile device sensors in React Native
- Implemented real-time motion detection using vector magnitude calculations
- Gained experience synchronizing sensor data with sound playback
- Improved understanding of React hooks and state-driven side effects
- Built an interactive, sensor-based mobile experience

---

## Future Improvements

- Add selectable lightsaber colors
- Include haptic feedback for swings and clashes
- Add visual blade animations instead of background color only
- Implement sensitivity controls for motion detection
- Support multiplayer dueling via device-to-device interaction

---

## Portfolio Context

This project demonstrates my ability to integrate hardware sensors, real-time data
