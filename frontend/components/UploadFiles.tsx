"use client";

import { useState, useRef } from "react";
import { FiUpload, FiFile } from "react-icons/fi";
import { AiOutlineFile, AiOutlineClose } from "react-icons/ai";

function UploadFiles() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // const handleFileSelect = (e) => {
  //   const files = Array.from(e.target.files);
  //   setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  // };

  // Need to grab the type of image to convert string()

  // const handleFileSelect = (e) => {
  //   const files = Array.from(e.target.files);
  //   const validFiles = [];
  //   let inValidFileFound = false;

  //   files.forEach((file) => {
  //     if (file.type === "image/png") {
  //       validFiles.push(file);
  //     } else {
  //       inValidFileFound = true;
  //     }
  //   });

  //   if (inValidFileFound) {
  //     setError("Only PNG files are allowed");
  //   } else {
  //     setError(null);
  //   }

  //   setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  // };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const updatedFiles = files.map((file) => ({
      file,
      isValid: file.type === "image/png",
    }));
    setSelectedFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
    setError(null); // Clear previous errors
  };

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

  const removeFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

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

              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                Convert Files
              </button>
            </div>

            <div className="space-y-3 mt-10">
              {error && <p className="mt-2 text-md text-red-500">{error}</p>}

              {/* {selectedFiles.map((file, index) => ( */}
              {selectedFiles.map(({ file, isValid }, index) => (
                <div
                  key={index}
                  className={`flex items-center p-4 rounded-lg transition-colors duration-150 ${
                    isValid ? "bg-gray-50" : "border-2 border-red-500"
                  }`}
                >
                  <FiFile className="text-gray-500 w-6 h-6 mr-3" />
                  {/* <div className="flex-1"> */}
                  <div className="flex-1">
                    <span className="text-sm text-red-500">
                      {isValid ? "" : "Only PNG files are allowed"}
                    </span>
                    <p className="text-sm font-medium text-gray-900">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>

                  {/* <span className="flex-1"> Convert to Png</span> */}

                  <button
                    onClick={() => removeFile(index)}
                    className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
                  >
                    <AiOutlineClose className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* </div> */}
      </div>
    </div>
  );
}

export default UploadFiles;
