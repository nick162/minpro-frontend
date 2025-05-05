"use client";

import Image from "next/image";
import React from "react";

type Props = {
  previewImage: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EventImageInput = ({ previewImage, handleFileChange }: Props) => {
  const isValidSrc =
    typeof previewImage === "string" &&
    (previewImage.startsWith("http") || previewImage.startsWith("data:image"));

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Thumbnail</label>
      <div className="flex items-center gap-4">
        {isValidSrc ? (
          <Image
            src={previewImage}
            alt="Preview"
            width={64}
            height={64}
            className="rounded-md object-cover border w-16 h-16"
          />
        ) : (
          <div className="w-16 h-16 rounded-md bg-gray-200" />
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default EventImageInput;
