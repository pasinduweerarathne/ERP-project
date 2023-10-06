import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import SearchBar from "../../components/Input/SearchBar";
import { openModal } from "../common/modalSlice";
import Table from "./components/Table";
import { getSalaries, withdraw } from "./salarySlice";

const TopSideButtons = ({ page }) => {
  const dispatch = useDispatch();

  const openAddNewEmployeeModal = () => {
    dispatch(
      openModal({
        title: "Add New Employee",
        // bodyType: MODAL_BODY_TYPES.EMPLOYEE_ADD_NEW,
        // extraObject: { page },
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewEmployeeModal()}
      >
        Add New
      </button>
    </div>
  );
};

const SalaryManagement = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    dispatch(getSalaries());
  }, []);

  const { salaries } = useSelector((state) => state.salary);

  const handleWithdraw = (id) => {
    const amount = document.getElementById(id).value;
    const payloadObj = {id, amount}
    dispatch(withdraw(payloadObj))
    document.getElementById(id).value = "";
  };

  return (
    <>
      <TitleCard
        title="title"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
        SearchBar={
          <SearchBar
            placeholderText={"Search Employees"}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        }
      >
        <Table
          tableHeader={["name", "zone", "section", "salary", "actions"]}
          tableBody={salaries}
          setAmount={setAmount}
          // amount={amount}
          showAction={true}
          onHandleWithdraw={handleWithdraw}
        />
      </TitleCard>
    </>
  );
};

export default SalaryManagement;
