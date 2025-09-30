"use client";

import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { graphqlClient } from "../lib/graphqlClient";
import { UNREAD_NOTIFICATIONS_QUERY } from "../lib/queries";
import Link from "next/link";

export default function NavbarNotifications({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { unreadNotifications } = await graphqlClient.request(
          UNREAD_NOTIFICATIONS_QUERY,
          { user_id: userId }
        );
        setNotifications(unreadNotifications);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotifications();

    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userId]);

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  return (
    <div className="relative" ref={ref}>
      {/* Bell Button يظهر دائمًا */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-amber-400 transition-colors"
      >
        <Bell className="w-6 h-6 text-gray cursor-pointer" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-7 h-5 flex items-center justify-center rounded-full animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-transparent z-[1000]">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="p-3 border-b flex justify-between items-center bg-gray-50">
              <span className="font-semibold text-black text-sm">Notifications</span>
              <Link
                href="/notifications"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                View All
              </Link>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto p-2 space-y-2">
              {notifications.length === 0 ? (
                <p className="text-gray-500 text-center p-4">No notifications</p>
              ) : (
                notifications.map((notif) => (
                  <Link
                    key={notif.id}
                    href={`/notifications/${notif.id}`}
                    className={`block p-3 rounded-lg shadow hover:shadow-xl transition-shadow duration-200 ${
                      !notif.read_at ? "border-l-4 border-red-500" : "border border-gray-100"
                    } bg-white`}
                  >
                    <div>
                      <p className="text-black font-medium">{notif.type}</p>
                      <p className="text-gray-600 text-sm">
                        {notif.notifiable_type} {/* لا نعرض الـ userId */}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {new Date(notif.created_at).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
