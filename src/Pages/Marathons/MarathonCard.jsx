import { format } from "date-fns";

const MarathonCard = ({ marathon }) => {
  const {
    title,
    location,
    startRegistrationDate,
    endRegistrationDate,
    marathonImage,
  } = marathon;

  return (
    <div className="max-w-xs mx-auto bg-slate-200 dark:bg-gray-800 shadow-md rounded-md overflow-hidden hover:border hover:border-sky-500">
      <img
        src={marathonImage}
        alt={title}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">Location: {location}</p>
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
        <button className="btn w-full bg-sky-500 text-gray-800 hover:bg-sky-300 mt-4">
          See Details
        </button>
      </div>
    </div>
  );
};

export default MarathonCard;
