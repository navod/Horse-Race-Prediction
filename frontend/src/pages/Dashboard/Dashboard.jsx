import React, { useEffect, useState } from "react";
import SectionWrapper from "../../hoc/SectionWrapper";
import AddNewUsers from "./AddNewUsers/AddNewUsers";
import ManageUsers from "./ManagerUsers/ManageUsers";
import userService from "../../services/user.service";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});

  const getAllUsers = (search, page) => {
    const payload = {
      page: page,
      per_page: 10,
      search: search,
    };

    setLoading(true);
    userService
      .getAllUsers(payload)
      .then((res) => {
        setPagination(res.pagination);
        setUsers(res.users);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getAllUsers("", 1);
  }, []);
  return (
    <div className="mt-10">
      <div className="flex flex-row gap-2 items-center">
        <a href="#" class="text-sm lg:text-2xl font-bold text-gray-800">
          Dashboard
        </a>
        <span class="mx-2 text-gray-400">/</span>
        <a href="#" class="text-xs lg:text-lg font-medium text-gray-600">
          Manage Customers
        </a>
      </div>

      <AddNewUsers loadAllUsers={getAllUsers} />
      <div className="mt-20">
        <ManageUsers
          users={users}
          loading={loading}
          seachHandler={getAllUsers}
          paginate={pagination}
        />
      </div>
    </div>
  );
};

export default Dashboard;
