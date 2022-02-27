import React from "react";

import styles from "./Avatar.module.scss";

export type AvatarProps = {
  src?: string;
  alt?: string;
  letter?: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, letter }): JSX.Element => {
  return (
    <div className={`${styles.avatar}`}>
      {src ? (
        <img src={src} alt={alt} className={`${styles.avatar__img}`} />
      ) : (
        letter
      )}
    </div>
  );
};

export default React.memo(Avatar);
