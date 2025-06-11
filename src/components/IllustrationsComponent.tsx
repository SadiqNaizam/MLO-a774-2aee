import React from 'react';
import { cn } from '@/lib/utils';

interface IllustrationsComponentProps {
  imageSrc?: string; // URL or path to an image
  altText?: string;
  title?: string;
  message?: string;
  svgContent?: React.ReactNode; // For directly embedding SVG
  className?: string;
  imageClassName?: string;
}

const IllustrationsComponent: React.FC<IllustrationsComponentProps> = ({
  imageSrc,
  altText = "Illustration",
  title,
  message,
  svgContent,
  className,
  imageClassName,
}) => {
  console.log("Rendering IllustrationsComponent, title:", title);

  return (
    <div className={cn("text-center p-4 flex flex-col items-center justify-center", className)}>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={altText}
          className={cn("max-w-xs w-full h-auto mb-4 object-contain", imageClassName)}
          onError={(e) => (e.currentTarget.src = '/placeholder.svg')} // Fallback placeholder
        />
      )}
      {svgContent && (
        <div className={cn("w-48 h-48 mb-4 text-gray-400", imageClassName)}> {/* Adjust size as needed */}
          {svgContent}
        </div>
      )}
      {title && <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>}
      {message && <p className="text-sm text-gray-500">{message}</p>}
    </div>
  );
};

export default IllustrationsComponent;