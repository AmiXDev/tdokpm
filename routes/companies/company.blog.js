const AdminBro = require('admin-bro');
const { Blog } = require('../../models/Blog');
const { sort, timestamps } = require('../sort');
const uploadFeature = require('@admin-bro/upload');


/** @type {AdminBro.ResourceOptions} */
const options = {
    sort,
    properties: {
        ...timestamps,
        slug: {
            position: 0,
        },
        description: {
            isVisible: { list: false, edit: true, filter: false, show: true },
            position: 1,
            components: {
                edit: AdminBro.bundle('../components/custom-fonts.edit.tsx')
            }
        },
        tags: {
            isVisible: { list: false, edit: true, filter: true, show: true },
            position: 8
        },
        keywords: {
            isVisible: { list: false, edit: true, filter: true, show: true },
            position: 9,
            type: [String],
        },
        draftMode: {
            isVisible: { list: true, edit: true, filter: true, show: true }
        },
        _id: {
            isVisible: { list: false, edit: false, filter: false, show: false },
        },
    }
};

module.exports = {
    options,
    features: [
        uploadFeature({
            provider: { local: { bucket: 'public/uploads' } },
            properties: {
                key: 'uploadedFile.path',
                bucket: 'uploadedFile.folder',
                mimeType: 'uploadedFile.type',
                size: 'uploadedFile.size',
                filename: 'uploadedFile.filename',
                file: 'uploadFile',
            }
        })
    ],
    resource: Blog,
};