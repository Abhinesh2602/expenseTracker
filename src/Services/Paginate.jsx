import styles from "./Paginate.module.css";

import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

export function Paginate({ data, postPerPage, paginate, currentPage }) {
  const totalPages = Math.ceil(data.length / postPerPage);

  let newPage = currentPage;

  function handlePaginate(direction) {
    if (direction === "previous" && currentPage > 1) {
      newPage = newPage - 1;
    }
    if (direction === "next" && currentPage < totalPages) {
      newPage = newPage + 1;
    }
    paginate(newPage);
  }

  return (
    <div className={styles.pageContainer}>
      <button
        onClick={() => handlePaginate("previous")}
        className={styles.iconContainer}
      >
        <GrLinkPrevious />
      </button>
      <button className={styles.pageNumber}>{newPage}</button>
      <button
        onClick={() => handlePaginate("next")}
        className={styles.iconContainer}
      >
        <GrLinkNext />
      </button>
    </div>
  );
}
