# Motion Based Undo Redo App

## Summary
This application was bootstrapped using Expo, a framework for universal react native applications.
This application makes use of accelerometer to provide undo/redo capabilities while typing in a text input.

## Link to live prototype
https://exp.host/@mmule2/motion-based-undo-redo-app  
Open this link using Expo Go application (iOS or Android) to view the application

## Prototype in action
[Link to video](output/demo.mp4)

## System requirements
1. Ensure you have installed the latest version of Node.js [(Node.js LTS release)](https://nodejs.org/en/)  
  `Only Node.js LTS releases (even-numbered) are recommended. As Node.js officially states, "Production applications should only use Active LTS or Maintenance LTS releases.`
2. Recommended Tools
    - [VSCode Editor](https://code.visualstudio.com/download)
3. Expo Go App for iOS & Android
    - 🤖 [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) - Android Lollipop (5) and greater.
    - 🍎 [iOS App Store](https://apps.apple.com/app/expo-go/id982107779) - iOS 11 and greater.

## Steps to run the application
1. Clone/Download this repository
2. Open the project using VSCode
3. Navigate to the root folder of the project, i.e. the folder containing the package.json file. This folder would have name motion-based-undo-redo-app
4. When inside this folder, open command prompt or terminal. You can also use integrated terminal if you are using VSCode (VSCode shortcut: ``Ctrl + ` `` for windows users.).
5. Type the below commands in terminal
6. Run `npm install` to install all the dependencies
7. Run `npm start` to run the application in development mode
8. Once the bundle is ready, you can follow the link (e.g. http://localhost:19002/) displayed in the terminal or click `d` to open the Expo developer tools in browser.

## Instructions
- Tilt phone left to undo text
- Tilt phone right to redo text
- Shake phone to clear text

## References
- [Expo](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/docs/getting-started)
- [Splash Screen](https://docs.expo.dev/versions/latest/sdk/splash-screen/)
- [Expo Sensor Accelerometer](https://docs.expo.dev/versions/v44.0.0/sdk/accelerometer/)
- [Calculate tilt & pitch from accelerometer data](https://wiki.dfrobot.com/How_to_Use_a_Three-Axis_Accelerometer_for_Tilt_Sensing)
- [Toast](https://docs.expo.dev/ui-programming/react-native-toast/)
