import React, { useContext, useEffect, useState } from "react";
import { AppContext, useCar } from "../contexts/AppContext";
import axios from "axios";

const Report = () => {

  const [report, setReport] = useState([]);

  const fetchReport = async (e) => {
    try {
      const res = await axios.get(
        "http://localhost:12345/api/payments/report/daily"
      );
      console.log(res.data)
      setReport(res.data);
    } catch (error) {
      console.log("Error while trying ti fetch report data. ", error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div>
      <h3 className="text-lg font-medium mb-4 text-gray-700">System Daily Report</h3>
      <div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Plate Number
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Entry Time
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Exit Time
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Duration
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount Paid
              </th>
            </tr>
          </thead>
          <tbody>
            {report.map((repo, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="text-gray-900 py-2 px-4 border-b border-gray-200">
                  {repo.platenumber}
                </td>
                <td className="text-gray-900 py-2 px-4 border-b border-gray-200">
                  {repo.entrytime.slice(0, 16)}
                </td>
                <td className="text-gray-900 py-2 px-4 border-b border-gray-200">
                  {repo.exittime.slice(0, 16)}
                </td>
                <td className="text-gray-900 py-2 px-4 border-b border-gray-200">
                  {repo.duration}
                </td>
                <td className="text-gray-900 py-2 px-4 border-b border-gray-200">
                  {repo.amountpaid}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
