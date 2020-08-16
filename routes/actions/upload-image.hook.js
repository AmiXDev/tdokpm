const path = require('path');
const fs = require('fs');
const AdminBro = require('admin-bro');


/** @type {AdminBro.After<AdminBro.ActionResponse>} */
const after = async (response, request, context) => {
  const { record, uploadThumbnailImage } = context;

  if (record.isValid() && uploadThumbnailImage) {
    const filePath = path.join('uploads', record.id().toString(), uploadThumbnailImage.name);
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

    await fs.promises.rename(uploadThumbnailImage.path, filePath);

    await record.update({ thumbnailPhotoLocation: `/${filePath}` });
  }
  return response;
};

/** @type {AdminBro.Before} */
const before = async (request, context) => {
  if (request.method === 'post') {
    const { uploadThumbnailImage, ...otherParams } = request.payload;

    // eslint-disable-next-line no-param-reassign
    context.uploadThumbnailImage = uploadThumbnailImage;

    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};

module.exports = { after, before };