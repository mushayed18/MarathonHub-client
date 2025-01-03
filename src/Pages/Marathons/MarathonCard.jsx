import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const MarathonCard = ({ marathon }) => {
  const {
    title,
    location,
    startRegistrationDate,
    endRegistrationDate,
    marathonImage,
    _id,
    displayName,
    createdAt
  } = marathon;

  const navigate = useNavigate();

  const seeDetails = (_id) => {
    navigate(`/marathons/${_id}`);
  };

  return (
    <div className="max-w-xs mx-auto bg-slate-200 dark:bg-gray-800 shadow-md rounded-md overflow-hidden hover:border hover:border-sky-500 hover:scale-105">
      <img
        src={marathonImage}
        alt={title}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {new Date() <= new Date(endRegistrationDate) && new Date() >= new Date(startRegistrationDate) ? (
          <div className="badge badge-secondary badge-outline my-3 py-3">
            Ongoing
          </div>
        ) : new Date() < new Date(startRegistrationDate) ? (
          <div className="badge border border-sky-500 text-sky-500 my-3 py-3">
            Upcoming
          </div>
        ) : (
          <div className="badge badge-outline my-3 py-3 text-red-500">
            Finished
          </div>
        )}
        <p className="text-sm text-gray-500">Created By: {displayName}</p>
        <p className="text-sm text-gray-500 mt-2">Created At: {format(new Date(createdAt), "dd-MM-yyyy")}</p>
        <p className="text-sm text-gray-500 mt-2">Location: {location}</p>
        <div className="text-sm text-gray-500 mt-2">
          <p>
            Registration:{" "}
            <span className="text-sky-500">
              {format(new Date(startRegistrationDate), "dd-MM-yyyy")}
            </span>
            -
            <span className="text-sky-500">
              {format(new Date(endRegistrationDate), "dd-MM-yyyy")}
            </span>
          </p>
        </div>
        <button
          onClick={() => seeDetails(_id)}
          className="btn w-full bg-sky-500 text-gray-800 hover:bg-sky-300 mt-4"
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default MarathonCard;
