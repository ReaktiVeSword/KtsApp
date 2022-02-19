import React from "react";
import "./Avatar.css";

export type AvatarProps = {
  src?: string;
  alt?: string;
  letter?: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, letter }): JSX.Element => {
  return (
    <div className="avatar">
      {src ? <img src={src} alt={alt} className="avatar__img" /> : letter}
    </div>
  );
};

export default React.memo(Avatar);
