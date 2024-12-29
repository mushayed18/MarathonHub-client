import { useState, useEffect } from "react";
import axios from "axios";
import MarathonCard from "./MarathonCard";

const Marathons = () => {
  const [marathons, setMarathons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch marathons data from the server
    axios
      .get("http://localhost:5000/marathons")
      .then((response) => {
        setMarathons(response.data); // Set the marathons state with the fetched data
        setIsLoading(false); // Set loading state to false once data is fetched
      })
      .catch((err) => {
        setError("Failed to fetch marathons");
        setIsLoading(false); // Handle error and stop loading
      });
  }, []);

  return (
    <div className="pt-28 pb-10 px-10 gap-7 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-sky-500">All Marathons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {isLoading ? (
          <div className="text-center text-lg font-semibold text-sky-500">Loading...</div> // Show loading message
        ) : error ? (
          <div className="text-center text-lg font-semibold text-red-500">{error}</div> // Show error message if failed to fetch data
        ) : (
          marathons.map((marathon) => (
            <MarathonCard key={marathon._id} marathon={marathon} />
          ))
        )}
      </div>
    </div>
  );
};

export default Marathons;
