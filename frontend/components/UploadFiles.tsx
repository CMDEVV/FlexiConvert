"use client";

import { useState, useRef } from "react";
import { FiUpload, FiFile } from "react-icons/fi";
import { AiOutlineFile, AiOutlineClose } from "react-icons/ai";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { ConvertDropdown } from "./ConvertDropdown";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, Download } from "lucide-react";
import { ImagePopup } from "./ImagePopup";
// import { useRouter } from "next/router";

// type Props = {
//   param: MyData;
// };

// type MyData = {
//   id: number;
//   name: string;
//   convertFrom: string;
//   convertTo: string;
// };

const convertImages = async (images) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/convert-file/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ images }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error converting images", error);
  }
};

function UploadFiles({ data }) {
  console.log("ParmsForUpload", data.convertFrom);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const updatedFiles = files.map((file) => ({
      file,
      isValid: file.type === `image/${data.convertFrom.toLowerCase()}`,
      // image: [],
    }));

    setSelectedFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
    setError(null); // Clear previous errors
  };

  // const handleFileChange = (event) => {
  //   const files = Array.from(event.target.files); // Convert FileList to array of File objects
  //   console.log("Selected files:", files); // Debug: should log an array of File objects
  //   setSelectedFiles(files); // Update state with File objects directly
  // };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Convert selected files to Base64
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      console.log("Converting file:", file); // Log the file
      if (!file || !(file instanceof Blob)) {
        reject(new Error("Invalid file type. Expected a Blob or File object."));
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Remove Base64 prefix
      reader.onerror = (error) => reject(error);
    });

  // Download a file
  const downloadFile = (base64Data, fileName, format) => {
    const link = document.createElement("a");
    link.href = `data:image/${format.toLowerCase()};base64,${base64Data}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!selectedFiles || selectedFiles.length === 0) {
        throw new Error("No files selected for conversion.");
      }

      const images = await Promise.all(
        selectedFiles.map(async ({ file, isValid, image }) => {
          // Validate file type
          if (!isValid) {
            console.error("Invalid file type:", file.name);
            throw new Error(`Invalid file type for ${file.name}.`);
          }

          // Convert the valid file to Base64
          const base64Image = await convertToBase64(file);
          return {
            conversion_type:
              file.type === "image/png" ? "png_to_jpeg" : "jpeg_to_png",
            image: base64Image,
            quality: 80,
          };
        })
      );

      // Call the API
      const response = await fetch("http://localhost:8000/api/convert-file/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images }),
      });

      if (!response.ok) {
        throw new Error("Failed to convert images");
      }

      const result = await response.json();
      console.log("DataResult", result.results[0]?.image);
      // Update `selectedFiles` with the converted images
      const updatedFiles = selectedFiles.map((fileObj, index) => ({
        ...fileObj,
        convertedImage: result.results[index]?.image || null,
        convertedFormat: result.results[index]?.format?.toLowerCase() || null,
      }));
      setSelectedFiles(updatedFiles);

      console.log("UploadFilesResult", result);
      console.log("SelectedFilesAfterUpload", selectedFiles);

      // Automatically download converted images
      // result.results.forEach((img, index) => {
      //   if (img.image) {
      //     const fileName = `converted_image_${
      //       index + 1
      //     }.${img.format.toLowerCase()}`;
      //     downloadFile(img.image, fileName, img.format);
      //   } else {
      //     console.error(`Error for image ${index + 1}: ${img.error}`);
      //   }
      // });
    } catch (error) {
      console.error("Error during image conversion:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  // Determine if all selected files are valid
  const allFilesMatch = selectedFiles.every(({ isValid }) => isValid);

  console.log("AllSelectedImages", selectedFiles);
  // if (!router.isReady) {
  //   return <p> Loading...</p>;
  // }

  return (
    // <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="mt-8 ">
      <div className="max-w-3xl mx-auto p-2  ">
        {/* <div className="w-96 bg-green-300"> */}
        <div className="  rounded-lg shadow-md p-6 border-2 border-black border-dashed">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Upload Your Files
            </h2>
            <div className="mt-4">
              <input
                type="file"
                multiple
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleFileSelect}
                ref={fileInputRef}
                aria-label="File upload input"
              />
              <button
                onClick={handleUploadClick}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <FiUpload className="mr-2" />
                Upload Files
              </button>
            </div>
          </div>
        </div>
        {selectedFiles.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700 ">
                Selected Files ({selectedFiles.length})
              </h3>

              <div className="space-x-3">
                <Button className="text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                  Download All
                </Button>

                <Button
                  disabled={!allFilesMatch}
                  onClick={handleSubmit}
                  className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md ${
                    allFilesMatch
                      ? "text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Convert Files
                </Button>
              </div>
            </div>

            <div className="space-y-3 mt-10">
              {error && <p className="mt-2 text-md text-red-500">{error}</p>}

              {selectedFiles.map(
                ({ file, isValid, convertedImage, convertedFormat }, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-4 bg-gray-50 rounded-lg transition-colors duration-150 ${
                      isValid ? "" : "border-2 border-red-500"
                    }`}
                  >
                    <FiFile className="text-gray-500 w-6 h-6 mr-3" />
                    {/* <div className="flex-1"> */}
                    <div className="flex-1">
                      <span className="text-sm text-red-500">
                        {isValid
                          ? ""
                          : `Only ${data.convertFrom} files are allowed`}
                      </span>
                      <p className="text-sm font-medium text-gray-900">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <ArrowRightIcon className="h-4" />
                    <span className="flex-1 ml-10">
                      <ConvertDropdown data={data.convertTo} />
                    </span>

                    <div className="flex space-x-1 items-center">
                      <ImagePopup data={{ convertedImage, convertedFormat }} />
                      {/* <Button variant="outline">
                      <Eye />
                      <span>Preview</span>
                    </Button> */}

                      <Button variant="outline">
                        <Download />
                        <span>Download</span>
                      </Button>
                      <Button
                        onClick={() => removeFile(index)}
                        variant="outline"
                        size="icon"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadFiles;
