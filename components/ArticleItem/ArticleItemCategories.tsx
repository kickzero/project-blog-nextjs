// import { Link } from 'react-router-dom';
import Link from "next/link";
import styles from "./article-item.module.css"
import { Button } from "../shared/Button";
import { useGlobalState } from "@/state";


const RenderCategoryComponent = ({ categories, categoriesId }: { categories: any; categoriesId: string[] }) => {
  const categoryComponent = categoriesId.map((id) => {
    const category = categories[id];
    return (
      <li key={id}>
        <Link href={`/category/${id}`}>
          <Button>{category?.name}</Button>
        </Link>
      </li>
    );
  });
  return <>{categoryComponent}</>;
};

export default function ArticleItemCategories({categoriesId}: { categoriesId: string[] }) {
  const categories = useGlobalState("categories")[0];
  return (
    <ul className={styles["article-item__categories"]}>
      <RenderCategoryComponent categoriesId={categoriesId} categories={categories} />
    </ul>
  );
}
