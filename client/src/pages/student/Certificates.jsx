import React from "react";
import { FiDownload, FiShare2, FiAward } from "react-icons/fi";

const Certificates = ({ certificates }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">My Certificates</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map(certificate => (
            <div key={certificate.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{certificate.course}</h3>
                  <p className="text-gray-600 mt-1">Issued: {certificate.issueDate}</p>
                  <div className="mt-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {certificate.status}
                    </span>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-xl">
                  <FiAward className="text-[#19a4db] w-8 h-8" />
                </div>
              </div>
              
              <div className="mt-6 flex space-x-2">
                <button className="flex items-center px-4 py-2 bg-[#19a4db] text-white rounded-lg text-sm font-medium">
                  <FiDownload className="mr-2" />
                  Download
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                  <FiShare2 className="mr-2" />
                  Share
                </button>
              </div>
            </div>
          ))}
          
          {certificates.length === 0 && (
            <div className="col-span-2 text-center py-12 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="text-gray-400 w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">No Certificates Yet</h3>
              <p className="text-gray-500 mb-4">
                Complete courses to earn your first certificate.
              </p>
              <button className="px-4 py-2 bg-[#19a4db] text-white rounded-lg text-sm font-medium">
                Browse Courses
              </button>
            </div>
          )}
        </div>
        
        {certificates.length > 0 && (
          <div className="mt-8 border-t border-gray-100 pt-6">
            <h3 className="font-semibold text-lg mb-4">Available Certificates</h3>
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
              <div className="flex items-start">
                <div className="bg-yellow-100 p-2 rounded-lg mr-4">
                  <FiAward className="text-yellow-600 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-yellow-800">JavaScript Advanced Certificate</h4>
                  <p className="text-yellow-700 text-sm mt-1">
                    You've completed 85% of the Advanced JavaScript course. Complete the final project to earn this certificate.
                  </p>
                  <button className="mt-3 px-4 py-2 bg-yellow-200 text-yellow-800 rounded-lg text-sm font-medium">
                    Continue Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificates; 