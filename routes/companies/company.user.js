const AdminBro = require('admin-bro');
const { User } = require('../../models/User');

/** @type {AdminBro.ResourceOptions} */

const options = {
    properties: {
        fullName: {
            position: -30,
            isTitle: true,
        },
        password: {
            type: 'password',
        },
        phoneNo: {
            position: -20,
            
        },
        address: {
            isVisible:{ list: false, edit: true, filter: false, show: true}
        },
        _id: {
            isVisible: { list: false, edit: false, filter: false, show: false }
        },
        hash: {
            isVisible: { list: false, edit: false, filter: false, show: false }
        },
        salt: {
            isVisible: { list: false, edit: false, filter: false, show: false }
        }
    }
};


module.exports = {
    options,
    resource: User,
};

