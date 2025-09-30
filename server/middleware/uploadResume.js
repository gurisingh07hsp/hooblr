const multer = require("multer");
const B2 = require("backblaze-b2");
const storage = multer.memoryStorage();

const b2 = new B2({
  applicationKeyId: process.env.B2_KEY_ID,
  applicationKey: process.env.B2_APPLICATION_KEY,
});

const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } });  


// Upload resume
const uploadResume = async (req,res,next) => {
  try {
    if (!req.file) {
      return next();
    }

    await b2.authorize();

      if (req.user.profile && req.user.profile.resume) {
      try {
        const oldFileName = req.user.profile.resume.split('/').pop();
        
        const response = await b2.listFileVersions({
          bucketId: process.env.B2_BUCKET_ID,
          startFileName: oldFileName,
          maxFileCount: 1,
          prefix: oldFileName
        });

        if (response.data.files.length > 0) {
          await b2.deleteFileVersion({
            fileId: response.data.files[0].fileId,
            fileName: oldFileName
          });
          console.log('Old resume deleted');
        }
      } catch (deleteErr) {
        console.error('Error deleting old resume:', deleteErr);
        // Continue with upload even if delete fails
      }
    }

    // Get upload URL
    const uploadData = await b2.getUploadUrl({
      bucketId: process.env.B2_BUCKET_ID,
    });

    // Upload file
    const data = await b2.uploadFile({
      uploadUrl: uploadData.data.uploadUrl,
      uploadAuthToken: uploadData.data.authorizationToken,
      fileName: `${Date.now()}-${req.file.originalname}`,
      data: req.file.buffer,
    });

    // Construct file URL
    const fileUrl = `https://f005.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${data.data.fileName}`;

    req.fileUrl = fileUrl;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {upload, uploadResume}



