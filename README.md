# Walk and Talk

Walk and Talk is a mobile application that brings together women in menopause transition or postmenopause who are interested to try walking as a means to socialize and to alleviate their symptoms.

## 📂 Folder Structure
Walk and Talk is divided into two directories: the frontend and backend. React-native is used to develop the frontend with nodejs/express/sequalize stack used to develop the backend. It also includes the integration of RedCap (a 3rd party API for healthcare database) and Cybera as our server host.

- backend 
    - api - for controllers, models, services, etc
    - config - for routes, database, etc.
    - db - contains the sqlite database
    - test - contains all tests, uses [Jest](https://github.com/facebook/jest)
- walkandtalk 
    - android - java compiled JS code
    - ios - c# compiled JS code
    - test - contains all tests
    - src - holds the below directories and a main/navigation file
        - actions - performs redux logic for models
        - assets - holds all icons/images
        - components - contains all views/logic
        - constants - stylesheets, colors, fonts 
        - reducers - redux 


## 📋 Requirements
React Native apps may target iOS 9.0 and Android 4.1 (API 16) or newer. You may use Windows, macOS, or Linux as your development operating system, though building and running iOS apps is limited to macOS.
```
nodejs - version > 9

npm - version > 6
```

## 🚀 Run the App!
## Git Clone


```
git clone https://github.com/cmput401-winter2019/walk-and-talk.git

cd walkandtalk
```

## Running the server

Ensure you are in the ```walk-and-talk``` directory

``` 
cd backend
npm install
npm start
```

## Run the app

Ensure you are in the ```walk-and-talk/walkandtalk``` directory

```
npm install

# to run Android
react-native run-android

# to run IOS
react-native run-ios

```

## Run backend tests

Ensure you are in the ```walk-and-talk``` directory

```
cd backend
npm install
npm test
```



