import "../../index.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import toast from "react-hot-toast";

const MyMarathonsList = () => {
  const { user } = useContext(AuthContext);
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarathon, setSelectedMarathon] = useState(null);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/my-marathons?email=${user.email}`)
        .then((response) => {
          setMarathons(response.data.marathons);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch marathons:", error);
          setLoading(false);
        });
    }
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedMarathon = {
      title: form.title.value,
      location: form.location.value,
      startDate: form.startDate.value
        ? new Date(form.startDate.value).toISOString()
        : null,
      endRegistrationDate: form.endRegistrationDate.value
        ? new Date(form.endRegistrationDate.value).toISOString()
        : null,
      runningDistance: form.runningDistance.value,
      marathonImage: form.marathonImage.value,
      description: form.description.value,
    };

    const normalizeDate = (date) => {
      const newDate = new Date(date);
      newDate.setHours(0, 0, 0, 0);
      return newDate;
    };

    if (
      new Date(updatedMarathon.endRegistrationDate) <= new Date() ||
      new Date(updatedMarathon.startDate) <=
        new Date(updatedMarathon.endRegistrationDate)
    ) {
      toast.error(
        "Please enter a valid date! Registration deadline should be greater than the registration start date! Marathon start date should be greater than the deadline!",
        {
          style: {
            background: "#0EA5E9",
            color: "#FFFFFF",
          },
        }
      );
      return;
    }

    axios
      .put(
        `http://localhost:5000/marathons/${selectedMarathon._id}`,
        updatedMarathon
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(
            "Your marathon updated successfully",
            {
              style: {
                background: "#0EA5E9",
                color: "#FFFFFF",
              },
            }
          );

          setMarathons((prev) =>
            prev.map((marathon) =>
              marathon._id === selectedMarathon._id
                ? { ...marathon, ...updatedMarathon }
                : marathon
            )
          );

          closeModal();
        } else {
          toast.error(
            "Oops! There is an error. Please try again.",
            {
              style: {
                background: "#0EA5E9",
                color: "#FFFFFF",
              },
            }
          );

          closeModal();
        }
      })
      .catch((error) => {
        toast.error(
          "Oops! There is an error. Please try again.",
          {
            style: {
              background: "#0EA5E9",
              color: "#FFFFFF",
            },
          }
        );

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
          .delete(`http://localhost:5000/marathons/${id}`)
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

              setMarathons((prev) =>
                prev.filter((marathon) => marathon._id !== id)
              );
            } else {
              toast.error(
                "Failed to delete marathon.",
                {
                  style: {
                    background: "#0EA5E9",
                    color: "#FFFFFF",
                  },
                }
              );
            }
          })
          .catch((error) => {
            toast.error(
              "Failed to delete marathon.",
              {
                style: {
                  background: "#0EA5E9",
                  color: "#FFFFFF",
                },
              }
            );
          });
      }
    });
  };

  const closeModal = () => {
    document.getElementById("marathon_modal").close();
    setSelectedMarathon(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="py-32 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center text-sky-500">
        My Marathons
      </h2>
      {marathons.length !== 0 ? (
        <div className="overflow-x-auto w-11/12">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-sky-500 text-gray-800">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {marathons.map((marathon, index) => (
                <tr key={marathon._id}>
                  <td className="border text-center border-gray-300 px-4 py-2">
                    {marathon.title}
                  </td>
                  <td className="flex flex-col md:flex-row justify-center gap-1 border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => {
                        setSelectedMarathon(marathon);
                        document.getElementById("marathon_modal").showModal();
                      }}
                      className="btn btn-sm border-none text-sky-500 dark:bg-gray-800 bg-slate-200"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(marathon._id)}
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
          No marathons found!
        </div>
      )}

      <dialog id="marathon_modal" className="modal">
        <div className="modal-box bg-slate-200 dark:bg-gray-800">
          <h3 className="font-bold text-2xl text-center text-sky-500 mb-6">
            Update Marathon
          </h3>
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
                defaultValue={selectedMarathon?.title || ""}
                name="title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Location</label>
              <input
                type="text"
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
                defaultValue={selectedMarathon?.location || ""}
                name="location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Marathon start Date
              </label>
              <input
                type="date"
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
                defaultValue={selectedMarathon?.startDate?.split("T")[0] || ""}
                name="startDate"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                End Registration Date
              </label>
              <input
                type="date"
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
                defaultValue={
                  selectedMarathon?.endRegistrationDate?.split("T")[0] || ""
                }
                name="endRegistrationDate"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Running Distance (km)
              </label>
              <input
                type="text"
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
                defaultValue={selectedMarathon?.runningDistance || ""}
                name="runningDistance"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Marathon Image URL
              </label>
              <input
                type="url"
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
                defaultValue={selectedMarathon?.marathonImage || ""}
                name="marathonImage"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
                defaultValue={selectedMarathon?.description || ""}
                name="description"
              ></textarea>
            </div>
            <div className="modal-action">
              <button
                type="button"
                onClick={closeModal}
                className="btn bg-gray-800 text-white"
              >
                Cancel
              </button>
              <button type="submit" className="btn bg-sky-500 text-white">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyMarathonsList;
