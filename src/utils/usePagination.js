import { PAGE_SIZE } from "./constants";

const usePagination = (currentpagenumber) => {
  let pagenumber2 = parseInt(currentpagenumber);
  const enditem = PAGE_SIZE * pagenumber2;
  const startitem = enditem - PAGE_SIZE;
  return { startitem, enditem };
};

export default usePagination;
