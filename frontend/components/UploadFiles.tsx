// @ts-nocheck

"use client";

import { useState, useRef } from "react";
import { FiUpload, FiFile } from "react-icons/fi";
import { AiOutlineFile, AiOutlineClose } from "react-icons/ai";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { ConvertDropdown } from "./ConvertDropdown";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, Download, Pencil } from "lucide-react";
import { ImagePopup } from "./ImagePopup";
import { EditImage } from "./EditImage";
// import ImageConversionPopup from "./ImageConversionPopup";

import serviceCalls from "../services/service";

type uploadDataType = {
  convertFrom: string;
  convertTo: string | { id: number; name: string }[];
  href: string;
  id: number;
  name: string;
};

type UploadDataMainProp = {
  data: uploadDataType;
};

// function getCookie(name) {
//   console.log("Checking for cookie:", document.cookie); // Debugging
//   let cookieValue = null;
//   if (document.cookie && document.cookie !== "") {
//     const cookies = document.cookie.split(";");
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
//       if (cookie.startsWith(name + "=")) {
//         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//         break;
//       }
//     }
//   }
//   console.log("CSRF Token Found:", cookieValue); // Debugging
//   return cookieValue;
// }

const getCsrfTokenFromCookie = () => {
  const cookies = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("csrftoken="));
  return cookies ? cookies.split("=")[1] : null;
};

function UploadFiles({ data }: UploadDataMainProp) {
  // console.log("CSRTOKENNNNN", getCookie("csrftoken"));
  // console.log("dataaUpload", data);
  // const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fileToEdit, setFileToEdit] = useState(null);

  // const openPopup = (fileIndex) => {
  //   setFileToEdit(fileIndex);
  //   setIsPopupOpen(true);
  // };

  fetch("https://server-production-24fc.up.railway.app/api/get_csrf_token/", {
    credentials: "include",
  })
    .then(() => handleSubmit())
    .catch((err) => console.error("CSRF fetch error:", err));

  //@ts-ignore
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);

    const updatedFiles = files.map((file) => ({
      file,
      // isValid: file.type === `image/${data.convertFrom.toLowerCase()}`,
      isValid:
        data.name === "Custom" ||
        //@ts-ignore
        file.type === `image/${data.convertFrom.toLowerCase()}`,

      // image: [],
    }));
    //@ts-ignore
    setSelectedFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
    setError(null); // Clear previous errors
  };

  const handleUploadClick = () => {
    //@ts-ignore
    fileInputRef.current.click();
  };
  //@ts-ignore
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Convert selected files to Base64
  //@ts-ignore
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      console.log("Converting file:", file); // Log the file
      if (!file || !(file instanceof Blob)) {
        reject(new Error("Invalid file type. Expected a Blob or File object."));
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      //@ts-ignore
      reader.onload = () => resolve(reader.result.split(",")[1]); // Remove Base64 prefix
      reader.onerror = (error) => reject(error);
    });

  // Download All
  const downloadAllFiles = () => {
    // Filter out files that haven't been converted
    //@ts-ignore
    const convertedFiles = selectedFiles.filter((file) => file.convertedImage);

    if (convertedFiles.length === 0) {
      alert("No converted images available for download.");
      return;
    }

    // Loop through the converted files and download each one
    convertedFiles.forEach(
      ({ file, convertedImage, convertedFormat }, index) => {
        //@ts-ignore
        const fileName = `${file.name.split(".")[0]}.${convertedFormat}`;
        downloadFile(convertedImage, fileName, convertedFormat);
      }
    );
  };

  //@ts-ignore
  const downloadFile = (base64Data, fileName, format) => {
    if (!base64Data) {
      alert("No converted image to download.");
      return;
    }

    const link = document.createElement("a");
    link.href = `data:image/${format.toLowerCase()};base64,${base64Data}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle form submission
  //@ts-ignore
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setProgress(0);

    const csrfToken = getCsrfTokenFromCookie();
    if (!csrfToken) {
      console.error("CSRF token missing");
      return;
    }

    try {
      const filesToConvert = selectedFiles.filter(
        //@ts-ignore
        (file) => !file.convertedImage
      );
      const totalFiles = filesToConvert.length;

      if (totalFiles === 0) {
        alert("All selected files have already been converted.");
        setLoading(false);
        return;
      }

      const images = await Promise.all(
        filesToConvert.map(
          async (
            { file, isValid, customQuality, customWidth, customHeight },
            index
          ) => {
            if (!isValid) {
              //@ts-ignore
              throw new Error(`Invalid file type for ${file.name}.`);
            }

            // Convert the valid file to Base64
            const base64Image = await convertToBase64(file);
            // Update progress after each successful conversion
            setProgress(((index + 1) / totalFiles) * 100);

            return {
              originalFile: file,
              conversion_type:
                //@ts-ignore
                file.type === "image/png" ? "png_to_jpeg" : "jpeg_to_png",
              image: base64Image,
              quality: customQuality || 90,
              width: customWidth || undefined,
              height: customHeight || undefined,
            };
          }
        )
      );

      // console.log("convertedImagesData", images);
      serviceCalls;
      // Call the API
      const response = await fetch(`${serviceCalls.baseURL}api/convert-file/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken, // Function to get CSRF cookie
        },
        credentials: "include",
        body: JSON.stringify({ images }),
      });

      if (!response.ok) {
        throw new Error("Failed to convert images");
      }

      const result = await response.json();

      // console.log("resultOFData", result);

      // Update `selectedFiles` with the converted images and mark them as converted
      const updatedFiles = selectedFiles.map((fileObj, index) => {
        const convertedResult = result.results.find(
          //@ts-ignore
          (res, resIndex) =>
            //@ts-ignore
            fileObj.file.name === images[resIndex].originalFile.name
        );
        if (convertedResult) {
          return {
            //@ts-ignore
            ...fileObj,
            convertedImage: convertedResult.image || null,
            convertedFormat: convertedResult.format?.toLowerCase() || null,
            converted: true, // Mark as converted
          };
        }
        return fileObj;
      });
      //@ts-ignore
      setSelectedFiles(updatedFiles);
    } catch (error) {
      console.error("Error during image conversion:", error);
    } finally {
      setLoading(false);
    }
  };

  //@ts-ignore
  const removeFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  // Determine if all selected files are valid
  const allFilesMatch = selectedFiles.every(({ isValid }) => isValid);
  //@ts-ignore
  const updateFileSettings = (fileIndex, quality, width, height) => {
    const updatedFiles = [...selectedFiles];
    //@ts-ignore
    updatedFiles[fileIndex] = {
      //@ts-ignore
      ...updatedFiles[fileIndex],
      customQuality: quality,
      customWidth: width,
      customHeight: height,
    };
    setSelectedFiles(updatedFiles);
    setIsPopupOpen(false); // Close popup after updating
  };

  // console.log("JustRandomThing", selectedFiles);
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

              <h3 className="mt-4">Max file size 20MB</h3>
            </div>
          </div>
        </div>
        {selectedFiles.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700 ">
                Selected Files ({selectedFiles.length})
              </h3>

              <div className="flex space-x-2">
                <Button
                  className="text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  onClick={downloadAllFiles}
                  //@ts-ignore
                  disabled={!selectedFiles.some((file) => file.convertedImage)}
                >
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
                (
                  { file, isValid, convertedImage, convertedFormat, converted },
                  index
                ) => (
                  <div key={index}>
                    <div
                      className={`flex flex-col sm:flex-row sm:items-start md:items-center lg:items-center p-4 bg-gray-50 rounded-lg transition-colors duration-150 ${
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

                      <div className="flex-1 ml-1">
                        <span>Convert to:</span>
                        {/* <span className="flex-1 ml-1"> */}
                        <span>
                          {data.name == "Custom" ? (
                            <>
                              <ConvertDropdown data={data.convertTo} />
                            </>
                          ) : (
                            <>
                              <ConvertDropdown data={data.convertTo} />
                            </>
                          )}
                        </span>
                      </div>

                      {/* <div className="flex  space-x-1 items-center"> */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-2 space-y-2 sm:space-y-0 lg:items-center mt-2">
                        {convertedImage ? (
                          <>
                            <ImagePopup
                              data={{ convertedImage, convertedFormat }}
                            />
                            <Button
                              variant="outline"
                              onClick={() =>
                                downloadFile(
                                  convertedImage,
                                  `${
                                    file.name.split(".")[0]
                                  }.${convertedFormat}`,
                                  convertedFormat
                                )
                              }
                            >
                              <Download />
                            </Button>
                          </>
                        ) : (
                          <>
                            <EditImage
                              // file={selectedFiles[index]}
                              onSave={(quality, width, height) =>
                                updateFileSettings(
                                  index,
                                  quality,
                                  width,
                                  height
                                )
                              }
                              onClose={() => setIsPopupOpen(false)}
                            />
                          </>
                        )}

                        <Button
                          className="w-full md:w-10 lg:w-10"
                          onClick={() => removeFile(index)}
                          variant="outline"
                          size="icon"
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    {converted ? (
                      <div className="w-full bg-gray-200 rounded h-1">
                        <div
                          className={`h-1 rounded-full transition-all duration-300 ${
                            progress === 100 ? "bg-green-500" : "bg-blue-500"
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {/* {isComplete && (
                      <p className="text-sm text-green-600 mt-2">
                        Conversion Complete!
                      </p>
                    )} */}
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

// Download file
// const downloadFile = (base64Data, fileName, format, index) => {
//   if (!base64Data) {
//     alert("No converted image to download.");
//     return;
//   }

//   // Initialize progress for this file
//   setDownloadProgress((prev) => ({ ...prev, [index]: 0 }));

//   // Simulate the download progress
//   const interval = setInterval(() => {
//     setDownloadProgress((prev) => {
//       const currentProgress = prev[index] || 0;
//       if (currentProgress >= 100) {
//         clearInterval(interval);

//         // Trigger the actual download
//         const link = document.createElement("a");
//         link.href = `data:image/${format};base64,${base64Data}`;
//         link.download = fileName;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       }
//       return { ...prev, [index]: currentProgress + 20 };
//     });
//   }, 200); // Update progress every 200ms
// };

// const convertImages = async (images) => {
//   try {
//     const response = await fetch("http://127.0.0.1:8000/api/convert-file/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ images }),
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("Error converting images", error);
//   }
// };
