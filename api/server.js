const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/user-router');

const sessionOptions = {
	name: 'userCookie',
	secret: 'secretCookie',
	cookie: {
	  maxAge: 1000 * 60 * 60,
	  secure: false,
	  httpOnly: true, 
	},
	resave: false,
	saveUninitalized: false,
  
	store: new knexSessionStore({
	  knex: require('../data/db-Config'),
	  tableName: 'sessions',
	  sidfieldname: 'sid',
	  createtable: true,
	  clearTinterval: 1000 * 60 * 60
	})
  };
  

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionOptions));

server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, usersRouter);

server.get("/", (req, res) => {
	res.json({ message: "Its Alive!" });
});

module.exports = server;
