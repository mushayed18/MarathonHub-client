import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Loading from "../../Components/Loading";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

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
      location: marathon.location,
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
        toast.success("Your registration is successful!", {
          style: {
            background: "#0EA5E9",
            color: "#FFFFFF",
          },
        });
        navigate("/my-apply-list");
      }
    } catch (error) {
      toast.error("There is an error please try again!", {
        style: {
          background: "#0EA5E9",
          color: "#FFFFFF",
        },
      });
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="pt-10">
      <Helmet>
        <title>Marathon Registration | Marathon Hub</title>
      </Helmet>
      <div className="flex flex-col items-center w-11/12 lg:max-w-3xl md:max-w-2xl mx-auto mb-10 mt-16 p-6 rounded shadow-2xl backdrop-blur-lg dark:bg-white/30 bg-slate-300">
        <h1 className="text-center text-3xl font-bold text-sky-500">
          Register for Marathon
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4 ">
          <div className="grid md:grid-cols-2 gap-2">
            <div>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <input
                type="text"
                value={marathon?.title}
                readOnly
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <input
                type="text"
                value={marathon?.location}
                readOnly
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <input
                type="text"
                value={new Date(
                  marathon?.startRegistrationDate
                ).toLocaleDateString()}
                readOnly
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <input
                type="tel"
                name="contactNumber"
                placeholder="Contact Number"
                required
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <input
                type="number"
                name="age"
                placeholder="Age"
                required
                className="text-sky-500 w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={hasRegistered}
            className={`btn mt-6 text-gray-800 hover:bg-sky-300 ${
              hasRegistered ? "bg-gray-400" : "bg-sky-500"
            } w-full`}
          >
            {hasRegistered ? "Already Registered" : "Submit Registration"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
