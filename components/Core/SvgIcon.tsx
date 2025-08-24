import React from "react";

interface SvgIconProps {
  src: string;           // path to svg file in /public
  size?: number | string; // optional size
  className?: string;     // tailwind/custom styles
}

const SvgIcon: React.FC<SvgIconProps> = ({ src, size = 24, className }) => {
  return (
    <img
      src={src}
      alt="icon"
      width={size}
      height={size}
      className={className}
    />
  );
};

export default SvgIcon;
