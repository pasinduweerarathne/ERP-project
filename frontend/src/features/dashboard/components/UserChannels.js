import TitleCard from "../../../components/Cards/TitleCard";

const userSourceData = [
  { source: "Tea", count: "26,345", conversionPercent: 10.2 },
  { source: "Conconut", count: "21,341", conversionPercent: 11.7 },
  { source: "Cinemon ", count: "34,379", conversionPercent: 12.4 },
];

function UserChannels() {
  return (
    <TitleCard title={"Available Employees"}>
      {/** Table Data */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="normal-case">Name</th>
              <th className="normal-case">NIC</th>
              <th className="normal-case">Address</th>
            </tr>
          </thead>
          <tbody>
            {userSourceData.map((u, k) => {
              return (
                <tr key={k}>
                  <th>{k + 1}</th>
                  <td>{u.source}</td>
                  <td>{u.count}</td>
                  <td>{`${u.conversionPercent}%`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}

export default UserChannels;
