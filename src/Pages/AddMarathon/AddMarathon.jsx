import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const AddMarathon = () => {
  const navigate = useNavigate();
  const [startRegistrationDate, setStartRegistrationDate] = useState(null);
  const [endRegistrationDate, setEndRegistrationDate] = useState(null);
  const [marathonStartDate, setMarathonStartDate] = useState(null);

  const { user } = useContext(AuthContext);
  const { displayName, email } = user;

  const handleAddMarathon = async (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const location = form.location.value;
    const runningDistance = form.runningDistance.value;
    const description = form.description.value;
    const marathonImage = form.marathonImage.value;
    const createdAt = new Date();
    const totalRegistrationCount = 0;

    const marathonData = {
      title,
      startRegistrationDate,
      endRegistrationDate,
      marathonStartDate,
      location,
      runningDistance,
      description,
      marathonImage,
      createdAt,
      totalRegistrationCount,
      displayName,
      email,
    };

    const normalizeDate = (date) => {
      const newDate = new Date(date);
      newDate.setHours(0, 0, 0, 0);
      return newDate;
    };

    if (
      new Date(startRegistrationDate) < normalizeDate(new Date()) ||
      new Date(endRegistrationDate) <= new Date(startRegistrationDate) ||
      new Date(marathonStartDate) <= new Date(endRegistrationDate)
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

    try {
      const response = await axios.post(
        "https://marathon-hub-server-two.vercel.app/marathons",
        marathonData
      );
      if (response.data.insertedId) {
        toast.success("Event added successfully!", {
          style: {
            background: "#0EA5E9",
            color: "#FFFFFF",
          },
        });
        navigate("/marathons");
      }
    } catch (error) {
      {
      }
    }
  };

  return (
    <div className="pt-10">
      <Helmet>
        <title>Add Marathon | Marathon Hub</title>
      </Helmet>
      <div className="animate__animated animate__fadeInDown w-11/12 lg:max-w-3xl md:max-w-2xl mx-auto mb-10 mt-16 p-6 rounded shadow-2xl backdrop-blur-lg dark:bg-white/30 bg-slate-200">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Marathon</h1>
        <form onSubmit={handleAddMarathon} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Marathon Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter marathon title"
              className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Start Registration Date
              </label>
              <DatePicker
                selected={startRegistrationDate}
                onChange={(date) => setStartRegistrationDate(date)}
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
                dateFormat="dd-MM-yyyy"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                End Registration Date
              </label>
              <DatePicker
                selected={endRegistrationDate}
                onChange={(date) => setEndRegistrationDate(date)}
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
                dateFormat="dd-MM-yyyy"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Marathon Start Date
              </label>
              <DatePicker
                selected={marathonStartDate}
                onChange={(date) => setMarathonStartDate(date)}
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
                dateFormat="dd-MM-yyyy"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter location"
              className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Running Distance
            </label>
            <select
              name="runningDistance"
              className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              required
            >
              <option value="" disabled selected>
                Select a distance
              </option>
              <option value="25k">25k</option>
              <option value="10k">10k</option>
              <option value="3k">3k</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Enter a brief description"
              className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              rows="1"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Marathon Image URL
            </label>
            <input
              type="url"
              name="marathonImage"
              placeholder="Enter image URL"
              className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="name"
              placeholder={displayName}
              className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium">User Email</label>
            <input
              type="email"
              name="email"
              placeholder={email}
              className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              disabled
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-sky-500 hover:bg-sky-600 rounded"
          >
            Add Marathon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMarathon;
