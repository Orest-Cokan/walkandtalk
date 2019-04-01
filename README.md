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

# Frontend


## Clone the pp


```
git clone https://github.com/cmput401-winter2019/walk-and-talk.git

cd walkandtalk
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
# 🎱Backend 

The backend has 3 different states: testing, development and production. Sqlite is used for the database, with 
## Running the server

Ensure you are in the ```walk-and-talk``` directory

Running the server locally
``` 
cd backend
npm install
npm start
```

Running the server in production mode
```
cd backend
npm install
npm run production
```

Running the server in development mode
```
cd backend
npm install
npm run dev
```

## Hosting the Backend

The following assumes you are hosting it on Cybera, using Ubuntu 16.04 and NGINX

```
1) SSH into the server
2) Install nodejs (version > 9) 
3) Install npm (version > 6)
The following is a link for the above https://websiteforstudents.com/install-the-latest-node-js-and-nmp-packages-on-ubuntu-16-04-18-04-lts/
4) Pull the Repo and run via NGINX https://www.phusionpassenger.com/library/walkthroughs/deploy/nodejs/ownserver/nginx/oss/xenial/deploy_app.html
```

## Run backend tests

Ensure you are in the ```walk-and-talk``` directory

```
cd backend
npm install
npm test
```

## Other backend commands

Ensure you are in the ```walk-and-talk``` directory

```
cd backend
npm install
npm test
```

```npm run dev``` - simply start the server without a watcher

```npm run create-sqlite-db``` - creates the sqlite database

```npm run drop-sqlite-db``` - drops ONLY the sqlite database

```npm run lint``` - linting with eslint

```npm run nodemon``` - same as `npm start`

```npm run prepush``` - a hook wich runs before pushing to a repository, runs npm test and npm run dropDB

```pretest``` - runs linting before npm test

```test-ci``` - only runs tests, nothing in pretest, nothing in posttest, for better use with ci tools

## Policies

Policies are middleware functions that can run before hitting a apecific or more specified route(s).

For example, this policy will only allow the user to access specific routes if they're researchers

```js
module.exports = (req, res, next) => {
  if(req.body.userrole === 'admin') {
    // do some verification stuff
    const verified = verifyResearcher(req.body.researcher);

    if(verified) {
      return next();
    }

    return res.status(401).json({ msg: 'Unauthorized' });
  }

  return res.status(401).json({ msg: 'Unauthorized' });
};
```

You can apply this policy to all routes or specific one

api.js

```js
const researcherPolicy = require('./policies/researcher.policy');

app.all('/researcher/*', (req, res, next) => researchPolicy(req,res,next));
```

or for a single route if wanted

```js
const researcherPolicy = require('./policies/research.policy');

app.get('/researcher/myroute',
  (req, res, next) => researcherPolicy(req,res,next),
  (req, res) => {
  //do some fancy stuff
});
```

## Services

Services are little useful snippets, or calls to another API that are not the main focus of your API.

Example service used in this app is to create Researcher accounts upon initializing the db.

```js
// initialize all the required researches upon initializing the DB.
const initializeResearchers = () =>
  User.create(
    {
      fullname: "Researcher Account",
      email: "ResearcherAccount@gmail.com",
      password: "ResearcherAccount",
      password2: "ResearcherAccount",
      dob: "Researcher Account",
      menopausal_stage: "Researcher Account",
      registered: 1,
      researcher: 1,
      preference: {
        intensity: "Researcher Account",
        venue: "Researcher Account",
        distance: 0,
        duration: 0,
        location: "Researcher Account"
      },
      picture: {}
    },
    {
      include: [Preference, Picture, Redcap]
    }
  );

module.exports = initializeResearchers;
```

## Create Routes

There are 2 route modes, public and private. A private route requires authentication (through a policy), whereas a public route is accesible by all.
```Note: Only supported Methods are POST, GET, PUT, and DELETE.```

An example of public routes.

```js
const publicRoutes = {
  // User routes
  "POST /user": "UserController.register",
  "POST /register": "UserController.register", // alias for POST /user
  "POST /login": "UserController.login",
  "POST /validate": "UserController.validate",
  "GET /users": "UserController.getAll",
  "GET /user/:email": "UserController.getUser",
  "PUT /user": "UserController.updateUser",
}
```


