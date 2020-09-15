const AdminBro = require('admin-bro');
const { Blog } = require('../../models/Blog');
const { sort, timestamps } = require('../sort');

const {
    after: uploadAfterHook,
    before: uploadBeforeHook,
} = require('../actions/upload-image.hook');

const {
    after: uploadFeaturedAfterHook,
    before: uploadFeaturedBeforeHook,
} = require('../actions/upload-featured-image.hook');



/** @type {AdminBro.ResourceOptions} */
const options = {
    name: 'Blog (customize field)',
    sort,
    properties: {
        ...timestamps,
            // updatedAt: {
            //     isVisible: { list: true, show: true, edit: false},
            //     components: {
            //         //show: boolean,
            //         list: AdminBro.bundle('../components/created-date-persian.tsx')
            //     }
            // },
            // createdAt: {
            //     isVisible: { list: true, show: true, edit: false},
            //     components: {
            //         //show: boolean,
            //         list: AdminBro.bundle('../components/created-date-persian.tsx')
            //     }
            // },
        slug: {
            position: 0,
        },
        description: {
            isVisible: {list: false, edit: true, filter: false, show: true},
            position: 1,
            components: {
                edit: AdminBro.bundle('../components/custom-fonts.edit.tsx')
            }
        },
        uploadThumbnailImage: {
            components: {
                edit: AdminBro.bundle('../components/upload-image.edit.tsx'),
                list: AdminBro.bundle('../components/upload-image.list.tsx')
            },
            isVisible: {list: true, edit: true, filter: false, show: true},
            position: 2
        },
        thumbnailPhotoLocation: {
            isVisible: {list: false, edit: true, filter: false, show: false},
            position: 3
        },
        thumbnailImageAlt: {
            position: 4,
            isVisible: {list: false, edit: true, filter: false, show: true}
        },
        uploadFeaturedImage: {
            components: {
                edit: AdminBro.bundle('../components/upload-featured-image.edit.tsx'),
                list: AdminBro.bundle('../components/upload-featured-image.list.tsx')
            },
            isVisible: {list: false, edit: true, filter: false, show: true},
            position: 5
        },
        featuredPhotoLocation: {
            isVisible: {list: false, edit: true, filter: false, show: false},
            position: 6
        },
        featuredImageAlt: {
            position: 7,
            isVisible: {list: false, edit: true, filter: false, show: true}
        },
        tags: {
            isVisible: {list: false, edit: true, filter: true, show: true},
            position: 8
        },
        keywords: {
            isVisible: {list: false, edit: true, filter: true, show: true},
            position: 9
        },
        draftMode: {
            isVisible: {list: true, edit: true, filter: true, show: true},
        },
        _id: {
            isVisible: { list: false, edit: false, filter: false, show: false},
        },
    },
    actions: {
        new: {
            after: async (response, request, context) => {
                const modifiedResponse = await uploadFeaturedAfterHook(response, request, context);
                return uploadAfterHook(modifiedResponse, request, context);
            },
            before: async (request, context) => {
                const modifiedRequest = await uploadFeaturedBeforeHook(request, context);
                return uploadBeforeHook(modifiedRequest, context);
            },
        },
        edit: {
            after: async (response, request, context) => {
                const modifiedResponse = await uploadFeaturedAfterHook(response, request, context);
                return uploadAfterHook(modifiedResponse, request, context);
            },
            before: async (request, context) => {
                const modifiedRequest = await uploadFeaturedBeforeHook(request, context);
                return uploadBeforeHook(modifiedRequest, context);
            },
        },
        show: {
            isVisible: true,
        },
    },
};

module.exports = {
    options,
    resource: Blog,
};