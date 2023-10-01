import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { IoTrashSharp } from "react-icons/io5";

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filter, setFilter] = useState([]);

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className='flex justify-items-center gap-2'>
          <Link
            onClick={() => deleteSubscription(row.uuid)}
            className='button is-small is-danger'
          >
            <IoTrashSharp className='text-red-600 text-2xl' />
          </Link>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getSubscription();
  }, []);
  const getSubscription = async () => {
    const response = await axios.get("http://localhost:5000/api/subscription");
    setSubscriptions(response.data);
    setFilter(response.data);
  };
  const deleteSubscription = async (subscriptionId) => {
    await axios.delete(
      `http://localhost:5000/api/subscription/${subscriptionId}`
    );
    getSubscription();
  };
  const handleSearch = (event) => {
    const newData = filter.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSubscriptions(newData);
  };
  return (
    <div>
      <div className=''>
        <h1 className='text-2xl text-center'> {"Subscription List"}</h1>
        <div className='mx-10 md:mt-5 mt-7 '>
          <div className='flex justify-between items-center'>
            <div className='flex justify-end'>
              <input
                type='text'
                className='p-3 rounded-lg border mb-2 w-[230px]'
                placeholder='search job by everything you want....'
                onChange={handleSearch}
              />
            </div>
          </div>
          <DataTable
            className='shadow-lg bg-white'
            noHeader={true}
            columns={columns}
            data={subscriptions}
            pagination
            highlightOnHover
            selectableRows
            customStyles={{
              headRow: {
                style: {
                  borderTop: "2px solid #CBD5E0",
                },
              },
              headCells: {
                style: {
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "#2D3748",
                  textTransform: "uppercase",
                  backgroundColor: "#F9FAFB",
                },
              },
              cells: {
                style: {
                  borderColor: "#E2E8F0",
                  fontSize: "1rem",
                  cursor: "pointer",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionList;
