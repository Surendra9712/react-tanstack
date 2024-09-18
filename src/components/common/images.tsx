import React, { useEffect, useRef, useState } from "react";

type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string; // Add this line
};

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
}) => {
  // Add className here
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.addEventListener("load", () => setLoaded(true));
    }
  }, [src]);

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
      }}
      className={className} // Add this line
    >
      {!loaded && (
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          {/* You can put a placeholder or a loader here */}
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          visibility: loaded ? "visible" : "hidden",
        }}
      />
    </div>
  );
};

export default Image;
