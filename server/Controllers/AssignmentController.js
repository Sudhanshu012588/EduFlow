import cloudinary from 'cloudinary';

// Set up Cloudinary configuration
cloudinary.config({
    cloud_name: 'daaskuv7y',
    api_key: '563947455864559',
    api_secret: 'kfJulPOq_fgblhVIAbBRPGpTHjQ', // Replace with your Cloudinary API secret
});

// Controller function for uploading assignments
export const uploadAssignment = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        // Create a Cloudinary upload stream
        const stream = cloudinary.v2.uploader.upload_stream(
            {
                resource_type: 'auto', // Automatically detect whether it's an image, video, or document
                public_id: `assignments/${Date.now()}`, // Public ID for the uploaded file
                folder: 'assignments', // Optional folder where the assignment will be stored
            },
            (error, result) => {
                if (error) {
                    // Log the error to get more information
                    console.error('Cloudinary upload error:', error);
                    return res.status(500).json({ message: 'Error uploading file', error });
                }
                // Send back the file URL (accessible publicly)
                res.json({
                    message: 'Assignment uploaded successfully!',
                    fileUrl: result.secure_url, // Cloudinary URL of the uploaded file
                });
            }
        );

        // Pipe the file buffer from the request to Cloudinary upload stream
        req.file.stream.pipe(stream);

    } catch (error) {
        console.error('Error uploading assignment:', error);
        res.status(500).json({ message: 'Error uploading assignment', error });
    }
};
