import { useEffect, useState } from "react";
import axios from "axios";
import MarathonCard from "../Marathons/MarathonCard";

const RandomMarathons = () => {
  const [marathons, setMarathons] = useState([]);

  useEffect(() => {
    const fetchMarathons = async () => {
      try {
        const response = await axios.get("http://localhost:5000/random-marathons");
        setMarathons(response.data); 
      } catch (error) {
        console.error("Error fetching marathons:", error);
      }
    };

    fetchMarathons();
  }, []);

  return (
    <div className="mt-7 p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-sky-500">Our Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mt-6">
        {marathons.map((marathon) => (
          <MarathonCard key={marathon._id} marathon={marathon} />
        ))}
      </div>
    </div>
  );
};

export default RandomMarathons;
