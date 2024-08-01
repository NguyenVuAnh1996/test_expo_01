# INSTRUCTIONS

Hello, I am Vu Anh and this is my project to practice creating a cross platform mobile app with EXPO, a libary for React Native.

I have created some customed components (in the ***components/main folder***) so you can copy them into your own projects.

Note that I have not tested these component with an IOS build, as I only tested them on Expo Go.

Regarding the datetimepicker components, the ***DateTimePickerLib01RHF*** is the most functional one.

Instead of default expo-router that uses file-based routing, I use react-navigation/native for routing. If you want to do the same as me:

- in package.json file: change "main":"expo-router/entry" to ***"main":"node_modules/expo/AppEntry.js"***
- create an **App.tsx** file at the top folder level. This file is used as the starting point of your app
  
I have created a ***customed hook*** to handle pending state. Unlike nextjs, useTransition cannot handle async here in React Native, so I have to make my own.

The ***no_expo_go*** folder contains 3rd-party libraries that do not work with Expo Go. You can turn on/ off these libraries in the config file inside this folder.