import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import Loading from "../../Components/Loading";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { format } from "date-fns";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyApplyList = () => {
  const { user } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user) {
      axiosSecure
        .get(`/registrations?email=${user.email}`)
        .then((response) => {
          setRegistrations(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedRegistration = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      contactNumber: form.contactNumber.value,
      age: parseInt(form.age.value, 10),
    };

    axios
      .put(
        `https://marathon-hub-server-two.vercel.app/registrations/${selectedRegistration._id}`,
        updatedRegistration
      )
      .then((response) => {
        if (response.data.success) {
          toast.success("Your registration updated successfully", {
            style: {
              background: "#0EA5E9",
              color: "#FFFFFF",
            },
          });

          setRegistrations((prev) =>
            prev.map((reg) =>
              reg._id === selectedRegistration._id
                ? { ...reg, ...updatedRegistration }
                : reg
            )
          );

          closeModal();
        } else {
          toast.error("Oops! There is an error. Please try again.", {
            style: {
              background: "#0EA5E9",
              color: "#FFFFFF",
            },
          });

          closeModal();
        }
      })
      .catch((error) => {
        toast.error("Oops! There is an error. Please try again.", {
          style: {
            background: "#0EA5E9",
            color: "#FFFFFF",
          },
        });

        closeModal();
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "custom-popup",
        title: "custom-title",
        cancelButton: "custom-cancel-button",
        confirmButton: "custom-confirm-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://marathon-hub-server-two.vercel.app/registrations/${id}`
          )
          .then((response) => {
            if (response.data.success) {
              Swal.fire({
                title: "Deleted!",
                text: "Your marathon has been deleted.",
                icon: "success",
                background: "#1F2937",
                color: "#0EA5E9",
                iconColor: "#0EA5E9",
                confirmButtonColor: "#0EA5E9",
              });

              setRegistrations((prev) => prev.filter((reg) => reg._id !== id));
            } else {
              toast.error("Failed to delete registration.", {
                style: {
                  background: "#0EA5E9",
                  color: "#FFFFFF",
                },
              });
            }
          })
          .catch((error) => {
            toast.error("Failed to delete registration.", {
              style: {
                background: "#0EA5E9",
                color: "#FFFFFF",
              },
            });
          });
      }
    });
  };

  const handleSearch = () => {
    if (user) {
      setLoading(true);

      axiosSecure
        .get(`/registrations`, {
          params: {
            email: user.email,
            search: searchTerm,
          },
        })
        .then((response) => {
          setRegistrations(response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const closeModal = () => {
    document.getElementById("apply_list_modal").close();
    setSelectedRegistration(null);
  };

  return (
    <div className="py-32 flex flex-col items-center">
      <Helmet>
        <title>My Apply List | Marathon Hub</title>
      </Helmet>
      <div className="w-11/12 flex flex-col md:flex-row-reverse pb-10 items-center justify-between">
        <div className="flex items-center relative">
          <input
            className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 text-sky-500"
          >
            <CiSearch size={28} />
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-center text-sky-500 pt-6 md:pl-60">
            My Apply List
          </h2>
        </div>
        <div></div>
      </div>

      {registrations.length != 0 ? (
        <div className="overflow-x-auto w-11/12">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-sky-500 text-gray-800">
              <tr>
                <th className="border border-gray-300 px-4 py-2">
                  Marathon Title
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Marathon start Date
                </th>
                <th className="border border-gray-300 px-4 py-2">Location</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg._id}>
                  <td className="bg-slate-400 dark:bg-gray-900 border text-center border-gray-300 px-4 py-2">
                    {reg.title}
                  </td>
                  <td className="bg-slate-400 dark:bg-gray-900 border text-center border-gray-300 px-4 py-2">
                    {format(new Date(reg.startDate), "dd-MM-yyyy")}
                  </td>
                  <td className="bg-slate-400 dark:bg-gray-900 border text-center border-gray-300 px-4 py-2">
                    {reg.location}
                  </td>
                  <td className="bg-slate-400 dark:bg-gray-900 flex flex-col md:flex-row justify-center gap-2 border-t border-gray-300 px-4 py-2">
                    <button
                      onClick={() => {
                        setSelectedRegistration(reg);
                        document.getElementById("apply_list_modal").showModal();
                      }}
                      className="btn btn-sm border-none text-sky-500 dark:bg-gray-800 bg-slate-200"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(reg._id)}
                      className="btn btn-sm border-none text-red-500 dark:bg-gray-800 bg-slate-200"
                    >
                      <RiDeleteBinLine />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="h-72 flex border-2 p-6 items-center text-2xl font-bold text-sky-500">
          No data found!
        </div>
      )}

      {/* Modal */}
      <dialog id="apply_list_modal" className="modal">
        <div className="modal-box bg-slate-200 dark:bg-gray-800">
          <h3 className="font-bold text-2xl text-sky-500 text-center mb-6">
            Update Your Registration
          </h3>
          <form
            onSubmit={(e) => handleUpdate(e)}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block text-sm font-medium">
                Marathon Title
              </label>
              <input
                type="text"
                className="text-gray-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
                value={selectedRegistration?.title || ""}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Start Date</label>
              <input
                type="text"
                className="text-gray-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
                value={
                  selectedRegistration?.startDate
                    ? format(
                        new Date(selectedRegistration.startDate),
                        "dd-MM-yyyy"
                      )
                    : "Invalid Date"
                }
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
                defaultValue={selectedRegistration?.firstName || ""}
                name="firstName"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
                defaultValue={selectedRegistration?.lastName || ""}
                name="lastName"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Contact Number
              </label>
              <input
                type="text"
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
                defaultValue={selectedRegistration?.contactNumber || ""}
                name="contactNumber"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Age</label>
              <input
                type="number"
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
                defaultValue={selectedRegistration?.age || ""}
                name="age"
              />
            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={closeModal}>
                Close
              </button>
              <button
                type="submit"
                className="btn bg-sky-500 text-gray-800 hover:bg-sky-200"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyApplyList;
