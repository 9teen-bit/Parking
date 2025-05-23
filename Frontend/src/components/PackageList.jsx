import React, { useState, useEffect } from "react";
import axios from "axios";

const PackageList = () => {
  const [packages, setPackages] = useState([]);

  const fetchRecords = async () => {
    try {
      const res = await axios.get("http://localhost:12345/api/records/get");
      setPackages(res.data);
    } catch (error) {
      console.log("Error while trying to fetch data. ", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    exittime: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://192.168.137.1:12345/api/records/update/${editId}`, editData
      );
      console.log(res.data);
    } catch (error) {
      console.log("Error while trying to update record. ", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault()
    try{
        const res = await axios.delete(`http://192.168.137.1:12345/api/records/delete/${deleteId}`)
    } catch (error){
        console.log("Error while trying to make delete request to server. ", error)
    }
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4 text-gray-700">
        Service Records
      </h3>
      {packages.length === 0 ? (
        <p className="text-gray-500">No services recorded yet.</p>
      ) : (
        <div className="overflow-x-auto">
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {packages.map((newPpackage, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="text-gray-900 py-2 px-4 border-b border-gray-200">
                    {newPpackage.platenumber}
                  </td>
                  <td className="text-gray-900 py-2 px-4 border-b border-gray-200">
                    {newPpackage.entrytime.slice(0, 16)}
                  </td>
                  <td className="text-gray-900 py-2 px-4 border-b border-gray-200">
                    {newPpackage.exittime.slice(0, 16)}
                  </td>
                  <td className="text-gray-900 py-2 px-4 border-b border-gray-200">
                    {newPpackage.duration}
                  </td>
                  <td className="text-gray-900 py-2 px-4 border-b border-gray-200 flex">
                    <button
                      onMouseEnter={() => setEditId(newPpackage.record_id)}
                      onClick={() => {
                        setIsEdit(true);
                      }}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                    onMouseEnter={() => setDeleteId(newPpackage.record_id)}
                      onClick={handleDelete}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isEdit && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="PackageNumber"
                >
                  Exit Time
                </label>
                <input
                  type="date"
                  name="exittime"
                  value={editData.exittime}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default PackageList;
