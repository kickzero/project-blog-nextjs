import React from "react";
import cls from "classnames";
import styles from "./comments.module.scss";

type Props = {
  replyCount: number;
  isShowIcon?: boolean;
  isParent?: boolean;
  [key: string]: any;
};
export default function ViewReply({ replyCount, isShowIcon, isParent, ...restProp }: Props) {
  if (replyCount <= 0 || !replyCount) {
    return <></>;
  }
  const wrapperClass = cls(styles["comments__hidden"], {
    [styles["parent"]]: isParent,
  });
  return (
    <div className={wrapperClass}>
      <div>
        <span style={{ cursor: "pointer", color: "#007bff", fontSize: "0.9rem" }} {...restProp}>
          {isShowIcon && <i className={styles["icons"] + " ion-ios-undo"} />}
          Xem thêm {replyCount} câu trả lời
        </span>
      </div>
    </div>
  );
}
