const AdminBro = require('admin-bro');
const { SubCategory } = require('../../models/SubCategory');
const { sort, timestamps } = require('../sort');

/** @type {AdminBro.ResourceOptions} */

const options = {
    properties: {
        ...timestamps,
        _id: {
            isVisible: { list: false, edit: false, filter: false, show: false},
        },
        shortDescription: {
            components: {
                edit: AdminBro.bundle('../components/custom-fonts.edit.tsx')
            }
        },
    },
};


module.exports = {
    options,
    resource: SubCategory,
};

