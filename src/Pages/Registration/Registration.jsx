import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Loading from "../../Components/Loading";

const Registration = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [marathon, setMarathon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasRegistered, setHasRegistered] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/marathons/${id}`).then((response) => {
      setMarathon(response.data);
      setIsLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/registrations/${user.email}`)
        .then((response) => {
          const alreadyRegistered = response.data.some(
            (reg) => reg.marathonId === id
          );
          setHasRegistered(alreadyRegistered);
        })
        .catch(() => {
          setHasRegistered(false);
        });
    }
  }, [user, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const registrationData = {
      email: user.email,
      marathonId: marathon._id,
      title: marathon.title,
      startDate: marathon.startRegistrationDate,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      contactNumber: form.contactNumber.value,
      age: form.age.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/registrations",
        registrationData
      );

      if (response.data.success) {
        alert("Registration successful!");
        // navigate("/dashboard/my-apply");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle duplicate registration error
        alert(error.response.data.message);
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="pt-28 pb-10 px-10">
      <h1 className="text-3xl font-bold text-sky-500">Register for Marathon</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Marathon Title:</label>
          <input
            type="text"
            value={marathon?.title}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="text"
            value={new Date(
              marathon?.startRegistrationDate
            ).toLocaleDateString()}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Contact Number:</label>
          <input
            type="tel"
            name="contactNumber"
            placeholder="Contact Number"
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            placeholder="Age"
            required
            className="input input-bordered w-full"
          />
        </div>
        <button
          type="submit"
          disabled={hasRegistered}
          className={`btn ${
            hasRegistered ? "bg-gray-400" : "bg-sky-500"
          } w-full`}
        >
          {hasRegistered ? "Already Registered" : "Submit Registration"}
        </button>
      </form>
    </div>
  );
};

export default Registration;
