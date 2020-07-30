# React exercise
## Internet software engineering course

Client side of this project was created with [Create React App](https://github.com/facebook/create-react-app).\
Server side was created with [Express Generator](https://www.npmjs.com/package/express-generator)

### In order to run it you should have:

```bash
git clone https://github.com/RulyYakovson/Web-store-mock.git

cd Web-store-mock
npm install
npm run init-db  #(To insert an admin user. require mongoDB to be installed on your PC)
npm run start-all
```
Then, go to [localhost:3000](https://localhost:3000/) from your browser.\
Enter:\
&nbsp;&nbsp;username: email@gmail.com\
&nbsp;&nbsp;password: 123456

### In order to be able to upload picture and/or send emails (from "forgot password" feature):
1. add "secret" directory under the server directory
2. add "vars.js" file under the secrets directory
3. put in the vars file your secrets like the example below
```bash
module.exports = {
    MAIL_USER: 'your mail',
    MAIL_PASS: 'your mail password',
    CLOUDINARY: {
        CLOUD_NAME: 'your cloudinary name',
        API_KEY: 'your cloudinary api key',
        API_SECRET: 'your cloudinary api secret'
    }
};
```

## Available Scripts
### `npm run start-all` - run server and client
### `npm run start-server` - run server only
### `npm run start-client` - run client only
### `npm run init-db` - insert an one admin data to DB
### `npm run init-orders-db` - insert some orders to DB

