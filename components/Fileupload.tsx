"use client";
import React, { useEffect, useRef, useState } from "react";
import { Upload, File, X, CloudUpload } from "lucide-react";

export default function FileUploadCustom({states: {file, isDragging, setFile, setIsDragging,tab}}: {
  states: {
    file: File | null;
    isDragging: boolean;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
    tab: number
  };
}) {


  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
    
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-black mb-2">
        Upload Vehicle Image
      </label>
      
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-xl border-2 border-dashed p-8 transition-all
          ${isDragging 
            ? "border-blue-500 bg-white scale-[1.02]" 
            : "border-slate-700 bg-white hover:border-slate-500"
          }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />

        {!file ? <div className="flex flex-col items-center justify-center space-y-3">
          <div className="rounded-full bg-slate-100 p-3 text-blue-400">
            <CloudUpload size={28} />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-black">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-slate-400">PNG, JPG or WEBP (max. 5MB)</p>
          </div>
        </div> : <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-60 object-cover rounded-xl" />}
      </div>

      {/* File Preview Card */}
      {file && (
        <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-700 bg-slate-100 p-3">
          <div className="flex items-center space-x-3">
            <div className="text-blue-400"><File size={20} /></div>
            <div className="overflow-hidden">
              <p className="truncate text-sm font-medium ">{file.name}</p>
              <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
          <button 
            onClick={() => setFile(null)}
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}