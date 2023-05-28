import API from "./api"

type CategoriesInput = {
  per_page: number,
  page: number,
  lang: string,
}
const categoryService = {
  getAll<T>(inputParams: T) {
    return API.call().get("/wp/v2/categories", {
      params: {
        ...inputParams,
      },
    });
  },
  getCategories() {
    return this.getAll<CategoriesInput>({ per_page: 100, page: 1, lang: 'vi' });
  },
};

export default categoryService;