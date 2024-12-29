import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import Loading from "../../Components/Loading";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { format } from "date-fns";

const MyApplyList = () => {
  const { user } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/registrations?email=${user.email}`) 
        .then((response) => {
          setRegistrations(response.data); 
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch registrations:", error);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="py-32 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center text-sky-500">
        My Apply List
      </h2>
      <div className="overflow-x-auto w-11/12">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">
                Marathon Title
              </th>
              <th className="border border-gray-300 px-4 py-2">Start Date</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg._id}>
                <td className="border text-center border-gray-300 px-4 py-2">
                  {reg.title}
                </td>
                <td className="border text-center border-gray-300 px-4 py-2">
                  {format(new Date(reg.startDate), "dd-MM-yyyy")}
                </td>
                <td className="flex flex-col md:flex-row justify-center gap-1 border border-gray-300 px-4 py-2">
                  <button className="btn btn-sm text-sky-500 bg-gray-800"><FiEdit /></button>
                  <button className="btn btn-sm text-red-500 bg-gray-800"><RiDeleteBinLine /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplyList;
