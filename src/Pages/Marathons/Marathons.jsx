import { useState, useEffect } from "react";
import axios from "axios";
import MarathonCard from "./MarathonCard";
import Loading from "../../Components/Loading";
import { Helmet } from "react-helmet-async";
import { TbAdjustments } from "react-icons/tb";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Marathons = () => {
  const [marathons, setMarathons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setIsLoading(true);

    axiosSecure
      .get(`/marathons?sort=${sortOrder}`)
      .then((response) => {
        setMarathons(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [sortOrder]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="pt-28 pb-10 px-10 gap-7 flex flex-col items-center">
      <Helmet>
        <title>All Marathons | Marathon Hub</title>
      </Helmet>
      <div className="w-11/12 flex flex-col-reverse md:flex-row gap-5 justify-between items-center">
        <div></div>
        <div>
          <h1 className="pl-0 md:pl-40 text-3xl font-bold text-sky-500">
            All Marathons
          </h1>
        </div>
        <div>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="flex gap-2 items-center btn bg-sky-500 text-gray-800 hover:bg-sky-200"
          >
            {sortOrder === "asc" ? "See the latest" : "See the oldest"}
            <TbAdjustments size={24} />
          </button>
        </div>
      </div>
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
