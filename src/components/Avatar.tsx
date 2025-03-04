import styles from "./Avatar.module.css";

export const Avatar = ({imgSource}: AvatarProps) => {
  return (
    <img className={styles.avatar} src={imgSource} />
  );
}