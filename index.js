
const jwt = require('jsonwebtoken');
const fs = require('fs')
const express = require('express')
const app = express();

const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

// Cấu hình jwt
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

    secretOrKey: 'abc123'
};

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    console.log('payload received111', jwt_payload);
    if (jwt_payload) {
        next(null, jwt_payload);
    } else {
        next(null, false);
    }
});

passport.use(strategy);
app.use(passport.initialize());

//Function này để những router nào cần xác thực thì cho vào.
const jwtAuthenticate = () => passport.authenticate('jwt', { session: false });


// sign with default (HMAC SHA256)
// jwt.sign({ foo: 'Techmaster111' }, jwtOptions.secretOrKey, { algorithm: 'HS384', audience: 'Dat', issuer: '111' }, function(err, token) {
//   if(err)
//     console.log(err)
//   console.log(token);
// });

// let a = 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJmb28iOiJUZWNobWFzdGVyMTExIiwiaWF0IjoxNTA4OTIxODk2LCJhdWQiOiJEYXQiLCJpc3MiOiIxMTEifQ.zfHLQfLF1Cx9ffHY7pI9V8SR7jw3l1wkJKEBQH0PYTiHkJsi_1dZUkTOx8MCSYer'
//
//
// jwt.verify(a, jwtOptions.secretOrKey, { algorithms: ['HS384', 'HS256'], audience: 'Dat', issuer: '111' }, function (err, payload) {
//     if(err)
//     console.log(err)
//   console.log(payload);
// });

app.get('/api/token', (req, res) => {
  jwt.sign({ foo: 'Techmaster111' }, jwtOptions.secretOrKey, { algorithm: 'HS384', audience: 'Dat', issuer: '111' }, function(err, token) {
    if(err)
      console.log(err)
    res.send(token);
  });
});

app.get('/api/users', jwtAuthenticate(), (req, res) => {
    res.json({a:1})
});

const server = app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
