const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
require('dotenv').config();
module.exports = { express, cors, jwt, bodyParser, mongodb, nodemailer, bcrypt, shortid };