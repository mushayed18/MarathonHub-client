import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Components/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";

const MarathonDetails = () => {
  const { id } = useParams();
  const [marathon, setMarathon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (error) {
    return <ErrorPage></ErrorPage>;
  }

  return (
    <div className="pt-28 pb-10 px-10">
      {marathon && (
        <div className="max-w-4xl mx-auto p-6 rounded shadow-2xl backdrop-blur-lg dark:bg-white/30 bg-slate-200">
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
                <strong>Registration:</strong>
                <span className="text-sky-500">
                  {" "}
                  {new Date(marathon.startRegistrationDate).toLocaleDateString(
                    "en-GB"
                  )}
                </span>{" "}
                -
                <span className="text-sky-500">
                  {" "}
                  {new Date(marathon.endRegistrationDate).toLocaleDateString(
                    "en-GB"
                  )}
                </span>
              </p>
              <p>
                <strong>Marathon Start Date:</strong>{" "}
                <span className="text-sky-500">
                  {new Date(marathon.marathonStartDate).toLocaleDateString(
                    "en-GB"
                  )}
                </span>
              </p>
              <p>
                <strong>Description:</strong>{" "}
                <span className="text-sky-500">{marathon.description}</span>
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
                  className="mt-4 py-2 px-4 bg-sky-500 text-white rounded hover:bg-sky-600"
                  onClick={() => navigate(`/register/${marathon._id}`)}
                >
                  Register
                </button>
              ) : (
                <p className="mt-4 text-red-500">Registration is closed.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarathonDetails;
