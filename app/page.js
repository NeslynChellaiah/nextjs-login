"use client";

import { useEffect, useState } from "react";

import "./tablePage.css";

export default function Dashboard() {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [headers, setHeaders] = useState([
    {
      label: "First Name",
      property: "first_name",
      ascendingOrder: false,
    },
    {
      label: "Last Name",
      property: "last_name",
      ascendingOrder: false,
    },
    {
      label: "Gender",
      property: "gender",
      ascendingOrder: false,
    },
    {
      label: "@ Email",
      property: "email",
      ascendingOrder: false,
    },
  ]);
  useEffect(() => {
    fetch("https://frontendtestapi.staging.fastjobs.io/data", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((tableDataArr) => {
        setTableData(tableDataArr);
        setFilteredData(tableDataArr);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearch = (e) => {
    const searchString = e.target.value;
    if (!searchString.trim() && filteredData.length != tableData.length) {
      setFilteredData(tableData);
    } else if (searchString.trim()) {
      setFilteredData(
        tableData.filter(
          (data) =>
            data.first_name
              .toLowerCase()
              .includes(searchString.toLowerCase()) ||
            data.last_name.toLowerCase().includes(searchString.toLowerCase())
        )
      );
    }
  };

  const sort = (i) => {
    const isAscending = !headers[i].ascendingOrder;
    const sortKey = headers[i].property;
    headers[i].ascendingOrder = isAscending;
    const sortedArr = filteredData.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (aValue < bValue) {
        return isAscending ? -1 : 1;
      }
      if (aValue > bValue) {
        return isAscending ? 1 : -1;
      }
      return 0;
    });
    setFilteredData([...sortedArr]);
  };

  return (
    <div className="table-container">
      {filteredData.length ? (
        <>
          <div className="d-flex justify-content-end">
            <input
              type="text"
              className="form-control search-box"
              placeholder="Type to search"
              onChange={handleSearch}
            />
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                {headers.map((header, i) => {
                  return (
                    <th
                      key={header.property}
                      scope="col"
                      onClick={() => sort(i)}
                    >
                      {header.label}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {filteredData.map((tableRow) => {
                return (
                  <tr key={tableRow.id}>
                    <td className="font-bold">{tableRow.first_name}</td>
                    <td className="font-bold">{tableRow.last_name}</td>
                    <td>{tableRow.gender}</td>
                    <td className="font-light">{tableRow.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <div className="d-flex justify-content-center">Loading...</div>
      )}
    </div>
  );
}
