import React from "react";
import { FiInfo, FiAlertCircle, FiCheckCircle, FiBook, FiCalendar } from "react-icons/fi";

const Notifications = ({ notifications }) => {
  const getNotificationIcon = (title) => {
    if (title.includes("Assignment")) return <FiBook className="text-blue-500 w-5 h-5" />;
    if (title.includes("Material")) return <FiBook className="text-green-500 w-5 h-5" />;
    if (title.includes("Announcement")) return <FiInfo className="text-yellow-500 w-5 h-5" />;
    if (title.includes("Reminder")) return <FiCalendar className="text-purple-500 w-5 h-5" />;
    return <FiInfo className="text-gray-500 w-5 h-5" />;
  };
  
  // Add more mock notifications to the existing ones
  const allNotifications = [
    ...notifications,
    {
      id: 4,
      title: "Grade Update",
      message: "Your JavaScript quiz has been graded. You scored 85%",
      time: "3 days ago"
    },
    {
      id: 5,
      title: "Class Reminder",
      message: "Remember to bring your project materials tomorrow",
      time: "4 days ago"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Notifications</h2>
          <button className="text-sm text-[#19a4db] hover:text-[#1582af]">
            Mark all as read
          </button>
        </div>
        
        <div className="space-y-4">
          {allNotifications.map(notification => (
            <div key={notification.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex">
                <div className="mr-4 mt-1">
                  {getNotificationIcon(notification.title)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                    <p className="text-gray-400 text-sm">{notification.time}</p>
                  </div>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                  
                  {notification.id === 1 && (
                    <div className="mt-3">
                      <button className="px-3 py-1 bg-[#19a4db] text-white rounded-lg text-xs font-medium">
                        View Assignment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 border-t border-gray-100 pt-6">
          <h3 className="font-medium text-gray-700 mb-4">Notification Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Email Notifications</label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input type="checkbox" id="email-toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked />
                <label htmlFor="email-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">SMS Notifications</label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input type="checkbox" id="sms-toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                <label htmlFor="sms-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Assignment Reminders</label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input type="checkbox" id="assignment-toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked />
                <label htmlFor="assignment-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
          </div>
          <style jsx>{`
            .toggle-checkbox:checked {
              right: 0;
              border-color: #19a4db;
            }
            .toggle-checkbox:checked + .toggle-label {
              background-color: #19a4db;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default Notifications; 