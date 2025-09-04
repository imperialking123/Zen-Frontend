import resize from "react-image-file-resizer";

const imageResizer = async (file, width, height, format, quality) => {
  return new Promise((resolve) => {
    resize.imageFileResizer(
      file,
      width, 
      height, 
      format,
      quality * 100, 
      0,
      (uri) => resolve(uri),
      "base64"
    );
  });
};

export { imageResizer };
