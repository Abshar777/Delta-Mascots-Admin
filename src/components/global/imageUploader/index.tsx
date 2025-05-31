"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ImageUploaderProps {
  onImageSelected: (base64: string | ArrayBuffer | null) => void
  initialImage?: string | null
}

export default function ImageUploader({ onImageSelected, initialImage = null }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImage)
  const [file, setFile] = useState<File | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0])
    }
  }

  const handleImageFile = (file: File) => {
    if (!file.type.match("image.*")) {
      alert("Please select an image file")
      return
    }

    setIsUploading(true)
    setFile(file)
    // In a real app, you would upload to a storage service
    // This is a mock implementation that creates a data URL
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        console.log("e.target?.result", e.target?.result);
        const imageUrl = e.target.result.toString()
        setPreviewUrl(imageUrl)
        onImageSelected(e.target?.result)
        setIsUploading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const clearImage = () => {
    setPreviewUrl(null)
    onImageSelected(null)
  }


 

  return (
    <div className="w-full">
      {!previewUrl ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-muted-foreground/5 cursor-pointer",
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground text-center mb-2">Drag and drop an image, or click to browse</p>
          <Input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="image-upload" />
          <Button
            variant="outline"
            size="sm"
            disabled={isUploading}
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            {isUploading ? "Uploading..." : "Select Image"}
          </Button>
        </div>
      ) : (
        <div className="relative">
          <div className="relative w-full flex items-center justify-center h-48 rounded-md overflow-hidden">
            <img src={previewUrl || "/placeholder.svg"} alt="Cover preview" className="h-full rounded-md object-cover" />
          </div>
          <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={clearImage}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
