const AdminBro = require('admin-bro');
const { Admin } = require('../../models/Admin');


const {
  after: passwordAfterHook,
  before: passwordBeforeHook,
} = require('../actions/password.hook');

/** @type {AdminBro.ResourceOptions} */

const options = {
  properties: {
    encryptedPassword: {
      isVisible: false,
    },
    password: {
      type: 'password',
      isVisible: {
        list: false, edit: true, filter: false, show: false,
      },
    },
    _id: {
      isVisible: { list: false, edit: false, filter: false, show: false },
    },
    fullName: {
      position: -1,
    }
  },
  actions: {
    new: {
      after: async (response, request, context) => {
        return passwordAfterHook(response, request, context);
      },
      before: async (request, context) => {
        return passwordBeforeHook(request, context);
      },
    },
    edit: {
      after: async (response, request, context) => {
        return passwordAfterHook(response, request, context);
      },
      before: async (request, context) => {
        return passwordBeforeHook(request, context);
      },
    },
  }
};

module.exports = {
  options,
  resource: Admin,
};