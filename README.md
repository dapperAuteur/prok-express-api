## ProKickballer.com
This is a passion project. I am the world's first professional kickball player. I managed an adult kickball league for [WAKA](http://bit.ly/2Z3kKuw). I created this application so that players and fans. It's ESPN.com for kickball. Users will be able to see match scores and match status in real-time.
This project was bootstrapped with [Node Express](http://bit.ly/2U6uy33).

The is the front end of the app is a [Create React App](https://github.com/facebook/create-react-app) and may be used with the [Express](http://bit.ly/2YnxYln) or [Java Spring](http://bit.ly/2Z1VZyT) backend. The Express backend is further along than the Java Spring backend at the moment. This is the repo for the Express backend.

### `Tech Used`
Other than the React, you may find the following tools used in this repo:
- bcrypt: encrypt strings, specifically passwords
- body-parser: to consume and read data in the body of HTTP requests
- connect-mongo: to connect to mongodb
- cors: to resolve CORS issues and allow the front end to communicate with the back end
- dotenv: to allow api to manage environment variables
- express: to quickly build a node server
- express-session: to quickly create/manage/track sessions for authentication/authorization
- mongoose: to persist data, database

### `Current Status`
- Quasi complete
  - it stores data and only allows those with proper credentials to access and manipulate it

### `Next Steps`
- Add user roles and add constraints to user roles

### `To Get Started`
- `git clone` the repo
- `cd prok-express-api`
- `npm install` to add project dependencies
- `node index.js` will run the project on `port 8080`
- it will communicate with the ui on `port 3000`
- current named version of the api is `/api/ver0001/...`
