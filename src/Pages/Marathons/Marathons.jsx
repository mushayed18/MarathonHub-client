import { useState, useEffect } from "react";
import axios from "axios";
import MarathonCard from "./MarathonCard";
import Loading from "../../Components/Loading";

const Marathons = () => {
  const [marathons, setMarathons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/marathons")
      .then((response) => {
        setMarathons(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  if(isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="pt-28 pb-10 px-10 gap-7 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-sky-500">All Marathons</h1>
      {marathons.length === 0 ? (
        <div className="h-72 flex items-center text-2xl font-bold text-sky-500">
          No marathons found!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {marathons.map((marathon) => (
            <MarathonCard key={marathon._id} marathon={marathon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Marathons;
