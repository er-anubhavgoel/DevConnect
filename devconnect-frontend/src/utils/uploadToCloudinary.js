const cloud_name = "dodfitymp";
const upload_preset = "dev-connect";

export const uploadToCloudinary = async (pics, fileType) => {
  if (pics && fileType) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
      { method: "post", body: data }
    );
    console.log("response", response);

    const fileData = await response.json();
    console.log("fileData", fileData.url);

    return fileData.url;
  } else {
    console.log("Error...");
  }
};
