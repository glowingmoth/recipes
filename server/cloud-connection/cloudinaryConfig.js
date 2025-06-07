import { v2 as cloudinary } from "cloudinary";

const { API_CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  api_key: API_KEY,
  api_secret: API_SECRET,
  cloud_name: API_CLOUD_NAME,
});

export default cloudinary;
