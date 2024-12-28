import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddMarathon = () => {
  const navigate = useNavigate();
  const [startRegistrationDate, setStartRegistrationDate] = useState(null);
  const [endRegistrationDate, setEndRegistrationDate] = useState(null);
  const [marathonStartDate, setMarathonStartDate] = useState(null);

  const handleAddMarathon = (e) => {
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
    };

    // Example: send data to the backend
    // fetch("https://your-backend-api.com/marathons", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(marathonData),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("Marathon added successfully:", data);
    //     // Navigate to another page or show success message
    //     navigate("/dashboard");
    //   })
    //   .catch((err) => console.error("Error adding marathon:", err));
  };

  return (
    <div className="pt-10">
      <div className="w-11/12 lg:max-w-3xl md:max-w-2xl mx-auto mb-10 mt-16 p-6 rounded shadow-2xl backdrop-blur-lg bg-white/30">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Marathon</h1>
        <form onSubmit={handleAddMarathon} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Marathon Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter marathon title"
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
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
                className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
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
                className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
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
                className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
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
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Running Distance
            </label>
            <select
              name="runningDistance"
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
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
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
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
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              required
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
