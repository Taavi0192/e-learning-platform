import React from "react";
import { FiCheckCircle, FiXCircle, FiAlertCircle } from "react-icons/fi";

const Attendance = ({ attendanceStats }) => {
  const getStatusIcon = (status) => {
    switch(status) {
      case "Present":
        return <FiCheckCircle className="text-green-500 w-5 h-5" />;
      case "Absent":
        return <FiXCircle className="text-red-500 w-5 h-5" />;
      case "Excused":
        return <FiAlertCircle className="text-yellow-500 w-5 h-5" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Attendance Record</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-[#19a4db]">{attendanceStats.overall}%</div>
            <div className="text-blue-700 mt-2 text-sm">Overall Attendance</div>
          </div>
          
          <div className="bg-green-50 rounded-xl p-6 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-green-600">24</div>
            <div className="text-green-700 mt-2 text-sm">Classes Attended</div>
          </div>
          
          <div className="bg-red-50 rounded-xl p-6 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-red-600">2</div>
            <div className="text-red-700 mt-2 text-sm">Absences</div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-4">Recent Classes</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceStats.recentClasses.map((classItem, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {classItem.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {index % 3 === 0 ? "Introduction to React" : 
                       index % 3 === 1 ? "Advanced JavaScript" : "UX/UI Design Fundamentals"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index % 2 === 0 ? "10:00 AM - 12:00 PM" : "2:00 PM - 4:00 PM"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(classItem.status)}
                        <span className={`ml-2 ${
                          classItem.status === "Present" ? "text-green-800" : 
                          classItem.status === "Absent" ? "text-red-800" : "text-yellow-800"
                        }`}>
                          {classItem.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-4">Request Absence</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Course</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]">
                <option>Introduction to React</option>
                <option>Advanced JavaScript</option>
                <option>UX/UI Design Fundamentals</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-gray-700">Reason</label>
              <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19a4db]" rows="3"></textarea>
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="px-4 py-2 bg-[#19a4db] text-white rounded-lg text-sm font-medium">
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Attendance; 