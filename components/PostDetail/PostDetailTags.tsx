import { useGlobalState } from "@/state";
import { Button } from "../shared/Button";
import Link from "next/link";
import styles from "./post-detail.module.css";

export default function PostDetailTags({tags}: any) {
  const categories = useGlobalState("categories")[0];
  return (
    <div className={styles["post-detail__tags"]}>
      <h2>Tags</h2>
      <ul>
        {tags.map((e: any, key: any) => {
          return (
            <li className={styles["item"]} key={key}>
              <Button>
                <Link href={`/category/${categories[e]?.id}`}>{categories[e]?.name}</Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
