import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Components/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";
import { format } from "date-fns";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import MarathonCountdown from "./MarathonCountDown";

const MarathonDetails = () => {
  const { id } = useParams();
  const [marathon, setMarathon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [hasRegistered, setHasRegistered] = useState(false);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarathonDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/marathons/${id}`
        );
        setMarathon(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchMarathonDetails();
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

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (error) {
    return <ErrorPage></ErrorPage>;
  }

  const countdownEndDate = new Date(marathon?.marathonStartDate);

  return (
    <div className="pt-28 pb-10">
      {marathon && (
        <div className="w-full md:max-w-2xl lg:max-w-3xl mx-auto p-6 rounded shadow-2xl backdrop-blur-lg dark:bg-white/30 bg-slate-300">
          <div className="md:flex items-center gap-4">
            <div className="w-full md:w-1/2">
              <img
                src={marathon.marathonImage}
                alt={marathon.title}
                className="w-full rounded mb-4"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center gap-2">
              <p>
                <strong>Title:</strong>{" "}
                <span className="text-sky-500">{marathon.title}</span>
              </p>
              <p>
                <strong>Location:</strong>{" "}
                <span className="text-sky-500">{marathon.location}</span>
              </p>
              <p>
                <strong>Registration: </strong>
                <span className="text-sky-500">
                  {format(
                    new Date(marathon.startRegistrationDate),
                    "dd-MM-yyyy"
                  )}
                </span>
                {" - "}
                <span className="text-sky-500">
                  {format(new Date(marathon.endRegistrationDate), "dd-MM-yyyy")}
                </span>
              </p>
              <p>
                <strong>Marathon Start Date:</strong>{" "}
                <span className="text-sky-500">
                  {format(new Date(marathon.marathonStartDate), "dd-MM-yyyy")}
                </span>
              </p>
              <p>
                <strong>Total Registrations:</strong>{" "}
                <span className="text-sky-500">
                  {marathon.totalRegistrationCount}
                </span>
              </p>

              {new Date() >= new Date(marathon.startRegistrationDate) &&
              new Date() <= new Date(marathon.endRegistrationDate) ? (
                <button
                  className="hidden md:block btn bg-sky-500 text-gray-800 hover:bg-sky-300"
                  onClick={() =>
                    navigate(`/marathons/${marathon._id}/register`)
                  }
                >
                  {hasRegistered ? "Already Registered" : "Register"}
                </button>
              ) : new Date() <= new Date(marathon.startRegistrationDate) ? (
                <p className="text-pink-500">
                  The registration has not started yet!
                </p>
              ) : (
                <p className="mt-4 text-red-500">Registration is closed.</p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 mt-4">
            <p className="text-2xl font-bold text-sky-500">Description</p>
            <p>{marathon.description}</p>
            <button
              className="md:hidden w-full btn bg-sky-500 text-gray-800 hover:bg-sky-300"
              onClick={() => navigate(`/marathons/${marathon._id}/register`)}
            >
              {hasRegistered ? "Already Registered" : "Register"}
            </button>
          </div>
        </div>
      )}

      <MarathonCountdown
        countdownEndDate={countdownEndDate}
      ></MarathonCountdown>
    </div>
  );
};

export default MarathonDetails;
