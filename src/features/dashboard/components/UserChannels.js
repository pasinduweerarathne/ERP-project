import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import Table from "../../employeeManagement/components/Table";
import { getEmployeesContent } from "../../employeeManagement/employeeSlice";

function UserChannels() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployeesContent());
  }, []);

  const employees = useSelector((state) => state.employee.employees);

  return (
    <TitleCard title={"Available Employees"}>
      {/** Table Data */}
      <div className="overflow-x-auto">
        <Table
          tableHeader={["Name", "Nic", "Address", "Salary", "Actions"]}
          tableBody={employees}
          showAction={false}
        />
      </div>
    </TitleCard>
  );
}

export default UserChannels;
