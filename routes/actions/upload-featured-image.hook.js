const path = require('path');
const fs = require('fs');
const AdminBro = require('admin-bro');


/** @type {AdminBro.After<AdminBro.ActionResponse>} */
const after = async (response, request, context) => {
  const { record, uploadFeaturedImage } = context;

  if (record.isValid() && uploadFeaturedImage) {
    const filePath = path.join('uploads', record.id().toString(), uploadFeaturedImage.name);
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

    await fs.promises.rename(uploadFeaturedImage.path, filePath);

    await record.update({ featuredPhotoLocation: `/${filePath}` });
  }
  return response;
};

/** @type {AdminBro.Before} */
const before = async (request, context) => {
  if (request.method === 'post') {
    const { uploadFeaturedImage, ...otherParams } = request.payload;

    // eslint-disable-next-line no-param-reassign
    context.uploadFeaturedImage = uploadFeaturedImage;

    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};

module.exports = { after, before };