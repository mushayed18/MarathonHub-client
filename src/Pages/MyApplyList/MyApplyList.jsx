import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import Loading from "../../Components/Loading";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { format } from "date-fns";
import Swal from "sweetalert2";

const MyApplyList = () => {
  const { user } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/registrations?email=${user.email}`)
        .then((response) => {
          setRegistrations(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch registrations:", error);
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
        `http://localhost:5000/registrations/${selectedRegistration._id}`,
        updatedRegistration
      )
      .then((response) => {
        if (response.data.success) {
          Swal.fire("Success", "Registration updated successfully", "success");

          setRegistrations((prev) =>
            prev.map((reg) =>
              reg._id === selectedRegistration._id
                ? { ...reg, ...updatedRegistration }
                : reg
            )
          );

          closeModal();
        } else {
          Swal.fire("Error", response.data.message, "error");
        }
      })
      .catch((error) => {
        console.error("Failed to update registration:", error);
        Swal.fire("Error", "Failed to update registration", "error");
      });
  };

  // Handle Delete Functionality
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/registrations/${id}`)
          .then((response) => {
            if (response.data.success) {
              Swal.fire(
                "Deleted!",
                "Your registration has been deleted.",
                "success"
              );

              // Remove the deleted registration from the state
              setRegistrations((prev) =>
                prev.filter((reg) => reg._id !== id)
              );
            } else {
              Swal.fire("Error", response.data.message, "error");
            }
          })
          .catch((error) => {
            console.error("Failed to delete registration:", error);
            Swal.fire("Error", "Failed to delete registration", "error");
          });
      }
    });
  };

  // Close the Modal
  const closeModal = () => {
    document.getElementById("apply_list_modal").close();
    setSelectedRegistration(null);
  };

  return (
    <div className="py-32 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center text-sky-500">
        My Apply List
      </h2>
      {registrations.length != 0 ? <div className="overflow-x-auto w-11/12">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">
                Marathon Title
              </th>
              <th className="border border-gray-300 px-4 py-2">Marathon start Date</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg._id}>
                <td className="border text-center border-gray-300 px-4 py-2">
                  {reg.title}
                </td>
                <td className="border text-center border-gray-300 px-4 py-2">
                  {format(new Date(reg.startDate), "dd-MM-yyyy")}
                </td>
                <td className="flex flex-col md:flex-row justify-center gap-1 border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => {
                      setSelectedRegistration(reg);
                      document.getElementById("apply_list_modal").showModal();
                    }}
                    className="btn btn-sm text-sky-500 bg-gray-800"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(reg._id)}
                    className="btn btn-sm text-red-500 bg-gray-800"
                  >
                    <RiDeleteBinLine />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> : <div className="h-72 flex items-center text-2xl font-bold text-sky-500">No data found!</div>}

      {/* Modal */}
      <dialog id="apply_list_modal" className="modal">
        <div className="modal-box bg-slate-200 dark:bg-gray-800">
          <h3 className="font-bold text-2xl text-sky-500 text-center mb-6">Update Your Registration</h3>
          <form
            onSubmit={(e) => handleUpdate(e)}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block text-sm font-medium">Marathon Title</label>
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
                    ? format(new Date(selectedRegistration.startDate), "dd-MM-yyyy")
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
              <label className="block text-sm font-medium">Contact Number</label>
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
              <button type="submit" className="btn bg-sky-500 text-gray-800 hover:bg-sky-200">
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
