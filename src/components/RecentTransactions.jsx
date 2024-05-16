import styles from "./RecentTransactions.module.css";
import { IoPizzaOutline } from "react-icons/io5";
import { VscError } from "react-icons/vsc";
import { BsPencil } from "react-icons/bs";
import { BiSolidParty } from "react-icons/bi";
import { MdCardTravel } from "react-icons/md";
import { Paginate } from "../Services/Paginate";
import { useEffect, useState } from "react";
import { useExpense } from "../Services/ExpenseContext";

const Transaction = ({ date, title, price, id, category }) => {
  const { setEditExpense, expenseDetails, setExpenseDetails, setEditId } =
    useExpense();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const handleEditExpense = () => {
    setEditExpense((prev) => !prev);
    setEditId(id);
  };

  const handleDelete = () => {
    setExpenseDetails(expenseDetails.filter((detail) => detail.date !== date));
  };

  return (
    <div className={styles.transactionContainer}>
      <div className={styles.transaction}>
        <div className={styles.expenseName}>
          <div
            className={styles.iconContainer}
            style={{ cursor: "unset", color: "#000000" }}
          >
            {category == "Food" && <IoPizzaOutline />}
            {category == "Entertainment" && <BiSolidParty />}
            {category == "Travel" && <MdCardTravel />}
          </div>
          <div className={styles.expenseDetails}>
            <p>{title}</p>
            <p>{formatDate(date)}</p>
          </div>
        </div>
        <div className={styles.expenseName}>
          <p style={{ color: "#f4bb4a", fontWeight: "bold", fontSize: "16px" }}>
            ₹{price}
          </p>
          <button
            className={styles.iconContainer}
            style={{ backgroundColor: "#FF3E3E" }}
            onClick={handleDelete}
          >
            <VscError />
          </button>
          <button
            className={styles.iconContainer}
            style={{ backgroundColor: "#f4bb4a" }}
            onClick={handleEditExpense}
          >
            <BsPencil />
          </button>
        </div>
      </div>
      <div className={styles.divider}></div>
    </div>
  );
};

export const RecentTransactions = () => {
  const { expenseDetails } = useExpense();
  const [currentPage, setCurrentPage] = useState(1);

  const postPerPage = 3;

  const lastIndexofItem = currentPage * postPerPage;
  const firstIndexofItem = lastIndexofItem - postPerPage;
  const currentData = expenseDetails.slice(firstIndexofItem, lastIndexofItem);

  function paginateHandler(page) {
    setCurrentPage(page);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.transactionsContainer}>
          {currentData.map((expenseDetail, index) => (
            <Transaction
              key={index}
              date={expenseDetail.date}
              price={expenseDetail.price}
              title={expenseDetail.title}
              id={expenseDetail.id}
              category={expenseDetail.category}
            />
          ))}
        </div>
        <div>
          <Paginate
            data={expenseDetails}
            postPerPage={postPerPage}
            paginate={paginateHandler}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};
