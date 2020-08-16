const AdminBro = require('admin-bro');
const { Category } = require('../../models/Category');
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
        'subCategoryArray.subCategoryShortDescription' : {
            components: {
                edit: AdminBro.bundle('../components/custom-fonts.edit.tsx')
            }
        },

    },
};


module.exports = {
    options,
    resource: Category,
};

