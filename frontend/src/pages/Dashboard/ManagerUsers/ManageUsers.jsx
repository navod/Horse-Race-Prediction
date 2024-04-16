import {
  Label,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Modal from "react-modal";
import NoData from "../../../components/BackgroundMessage/NoData";
import ReactLoading from "react-loading";
import userService from "../../../services/user.service";
import { ALERT_TYPE, toast } from "../../../utils/Utility-func";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const ManageUsers = ({ users, loading, seachHandler, paginate }) => {
  const [isUpdateModal, setUpdateModal] = React.useState(false);
  const [isDeleteModal, setDeleteModal] = React.useState(false);
  const [selectUser, setSelectUser] = React.useState({});
  const [search, setSearch] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const openUpdateModal = (userData) => {
    setSelectUser(userData);
    setUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setUpdateModal(false);
  };

  const openDeleteModal = (userData) => {
    setSelectUser(userData);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const updateUser = async () => {
    setUpdateLoading(true);
    if (selectUser.first_name == "") {
      toast("First name is required", ALERT_TYPE.ERROR);
      return;
    }
    userService
      .updateUser(selectUser)
      .then((res) => {
        setUpdateLoading(false);
        toast("User updated", ALERT_TYPE.SUCCESS);
        seachHandler("", 1);
        closeUpdateModal();
      })
      .catch((err) => {
        setUpdateLoading(false);
        toast("Cannot Update", ALERT_TYPE.ERROR);
      });
  };

  const deleteUser = async () => {
    setDeleteLoading(true);

    userService
      .deleteUser(selectUser)
      .then((res) => {
        toast("User deleted", ALERT_TYPE.SUCCESS);
        seachHandler("", 1);
        setDeleteLoading(false);
        closeDeleteModal();
      })
      .catch((err) => {
        setDeleteLoading(false);
        toast("Cannot Delete", ALERT_TYPE.ERROR);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    seachHandler("", page);
  };

  return (
    <div>
      <Modal
        isOpen={isDeleteModal}
        style={customStyles}
        contentLabel="delete modal"
      >
        <div class="relative p-4 w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg dark:bg-gray-700">
            <button
              type="button"
              onClick={closeDeleteModal}
              class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5 text-center">
              <svg
                class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this user ?
              </h3>

              {deleteLoading ? (
                <div className="flex justify-center items-center">
                  <ReactLoading
                    type="spin"
                    color="red"
                    height={35}
                    width={35}
                    className="mt-10"
                  />
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={deleteUser}
                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    type="button"
                    onClick={closeDeleteModal}
                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    No, cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isUpdateModal}
        style={customStyles}
        contentLabel="update modal"
      >
        <div class="relative p-4 w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg dark:bg-gray-700">
            <button
              type="button"
              onClick={closeUpdateModal}
              class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5 w-80">
              <div className="flex flex-col gap-2">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="firstName" value="First Name" />
                  </div>
                  <TextInput
                    id="firstName"
                    type="text"
                    sizing="md"
                    value={selectUser.first_name}
                    onChange={(e) =>
                      setSelectUser({
                        ...selectUser,
                        first_name: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="lastName" value="Last Name" />
                  </div>
                  <TextInput
                    id="lastName"
                    type="text"
                    sizing="md"
                    value={selectUser.last_name}
                    onChange={(e) =>
                      setSelectUser({
                        ...selectUser,
                        last_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="role" value="Role" />
                  </div>
                  <Select
                    id="role"
                    required
                    value={selectUser.role}
                    onChange={(e) =>
                      setSelectUser({ ...selectUser, role: e.target.value })
                    }
                  >
                    <option disabled value="">
                      Select a role
                    </option>
                    <option value="ADMIN">Admin</option>
                    <option value="CUSTOMER">Customer</option>
                  </Select>
                </div>
              </div>
              {updateLoading ? (
                <div className="flex justify-center items-center">
                  <ReactLoading
                    type="spin"
                    color="#0B60B0"
                    height={35}
                    width={35}
                    className="mt-10"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={updateUser}
                  class="text-white justify-center mt-6 text-center w-full bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal>

      <div className="flex items-center mb-10 flex-row justify-end">
        <div className="relative">
          <input
            type="text"
            className="py-2 pl-8 pr-4 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-100"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <AiOutlineSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={() => seachHandler(search, 1)}
          className="bg-green-400 hover:bg-green-300 px-4 py-2 ml-4 rounded-md"
        >
          Search
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <ReactLoading
            type="spin"
            color="#0B60B0"
            height={50}
            width={50}
            className="mt-10"
          />
        </div>
      ) : (
        users.length == 0 && loading == false && <NoData />
      )}

      {users.length > 0 && (
        <div>
          <div className="overflow-x-auto shadow-xl">
            <Table hoverable>
              <TableHead>
                <TableHeadCell className="bg-[#2CA141] text-white">
                  Email
                </TableHeadCell>
                <TableHeadCell className="bg-[#2CA141] text-white">
                  First Name
                </TableHeadCell>
                <TableHeadCell className="bg-[#2CA141] text-white">
                  Last Name
                </TableHeadCell>
                <TableHeadCell className="bg-[#2CA141] text-white">
                  Role
                </TableHeadCell>
                <TableHeadCell className="bg-[#2CA141] text-white">
                  Integration Status
                </TableHeadCell>
                <TableHeadCell className="bg-[#2CA141] text-white">
                  <span className="sr-only">Edit</span>
                </TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {user.email}
                    </TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    {user.role == "CUSTOMER" && (
                      <TableCell className="font-semibold text-green-400">
                        {user.role}
                      </TableCell>
                    )}
                    {user.role == "ADMIN" && (
                      <TableCell className="font-semibold text-blue-400">
                        {user.role}
                      </TableCell>
                    )}
                    <TableCell>{user.integration_status}</TableCell>
                    <TableCell className="flex justify-around">
                      <button
                        onClick={() => openUpdateModal(user)}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(user)}
                        className="font-medium text-red-600 hover:underline dark:text-red-500"
                      >
                        delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-10 flex flex-row justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={paginate.total_pages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
