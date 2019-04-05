# Walk and Talk

Walk and Talk is a mobile application that brings together women in menopause transition or postmenopause who are interested to try walking as a means to socialize and to alleviate their symptoms.



## 📋 Requirements
This particular react-native app targets for following: iOS 9.0 and Android 6.0 (API 23) or newer. You may use Windows, macOS, or Linux as your development operating system, though building and running iOS apps is limited to macOS.
```
nodejs - version > 8

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
The backend has 3 different states: testing, development and production. JWT auth is used for securing the API endpoints. Sqlite is used for the database, with various policies/services to be used as hooks. The design style is one of MVC, with the Models and Controllers existing in the backend with various cron jobs.

Below is the primary stack of libraries utilized 
```
express - 4.16
sequelize - 4.37
nodejs - 8.11.3

```
## 📂 Folder Structure
This backend has 4 main directories:

- api - for controllers, models, services, policies etc
- config - for routes, database, etc.
- db - holds the sqlite database (this is empty when the server is NOT deployed)
- test - contains all tests, uses [Jest](https://github.com/facebook/jest)

## Running the server

Ensure you are in the ```walk-and-talk\backend``` directory

Running the server locally

``` 
npm install
npm start
```

Running the server in production mode

```
npm install
npm run production
```

Running the server in development mode

```
npm install
npm run dev
```

## Hosting the Backend

The following assumes you are hosting it on Cybera, using Ubuntu 16.04 and NGINX

```
1) SSH into the server
2) Install nodejs (version > 8) 
3) Install npm (version > 6)
The following is a link for the above https://websiteforstudents.com/install-the-latest-node-js-and-nmp-packages-on-ubuntu-16-04-18-04-lts/
4) Pull the Repo and run via NGINX https://www.phusionpassenger.com/library/walkthroughs/deploy/nodejs/ownserver/nginx/oss/xenial/deploy_app.html
```

## Run backend tests

Ensure you are in the ```walk-and-talk\backend``` directory

```
npm install
npm test
```

## Other backend commands

Ensure you are in the ```walk-and-talk\backend``` directory

```
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

## Create a Model

The naming convenction to follow is`Model.js` and uses [Sequelize](http://docs.sequelizejs.com/) to define the Models, further information can be found @[Docs](http://docs.sequelizejs.com/).

Example User Model:

```js
const Sequelize = require('sequelize');

// encrypt the passwords
const bcryptSevice = require('../services/bcrypt.service');

// DB connection
const sequelize = require('../../config/database');

// hooks are functions that can run before or after a specific event
const hooks = {
  beforeCreate(user) {
    user.password = bcryptSevice.password(user);
  },
};

// naming the table in DB
const tableName = 'users';

// model
const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
}, { hooks, tableName });

// omit information before sending back
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

// export the model
module.exports = User;
```

## Create a Controller

The naming convention to follow is `ModelnameController.js`. It also uses an object factory design pattern.
[Sequelize](http://docs.sequelizejs.com/) is used as an ORM, for further information read [Docs](http://docs.sequelizejs.com/).

Example Controller for all **CREATE** in **CRUD** oparations:

```js
const Model = require('../models/Model');

const ModelController = () => {
  const create = async (req, res) => {
    // body is part of a form-data
    const { value } = req.body;

    try {
      const model = await Model.create({
        key: value
      });

      if(!model) {
        return res.status(400).json({ msg: 'Bad Request: Model not found' });
      }

      return res.status(200).json({ model });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  // 
  // return the functions
  return {
    create,
  };
};

model.exports = ModelController;
```
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

Example service used in this app is to create a Researcher account upon initializing the db. 

Note: This is simply an example @Daniel.

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

There are 3 types of routes, public, private and researcher. A private route requires authentication (through a JWT policy), whereas a public route is accesible by all. Only researchers have access to the researcher route. 

```Note: Only supported Methods are POST, GET, PUT, and DELETE.```

An example of public routes.

```js
const publicRoutes = {
  // User routes
  "POST /user": "UserController.register",
  "POST /register": "UserController.register", // alias for POST /user
  "POST /login": "UserController.login",
  "POST /validate": "UserController.validate",
}
```


