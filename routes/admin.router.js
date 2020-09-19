const { default: AdminBro } = require('admin-bro');
const { buildAuthenticatedRouter } = require('@admin-bro/express');
const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


const { Admin } = require('../models/Admin');
/**
 * 
 * @param {AdminBro} admin 
 * @return {express.Router} router
 */


// Build and use a router which will handle all AdminBro routes
const buildAdminRouter = (admin) => {
    const router = buildAuthenticatedRouter(admin, {
      cookieName: 'admin-bro',
      cookiePassword: 'superlongandcomplicatedname',
      authenticate: async (email, password) => {
        const admin = await Admin.findOne({ email });
        if (admin) {
            const matched = await bcrypt.compare(password, admin.encryptedPassword)
            if (matched) {
              return admin
            }
          }
        return null;
      },
    }, null, {
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    });
    return router;
  };
  
  module.exports = buildAdminRouter;
