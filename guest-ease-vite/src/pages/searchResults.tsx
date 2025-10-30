// src/pages/SearchResults.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useBooking } from "../context/bookingContext";

type Room = {
  id: string;
  name: string;
  description?: string;
  capacity?: number;
  price?: number;
  image_url?: string;
};

const SearchResults: React.FC = () => {
  const location = useLocation();
  const { searchAvailableRooms } = useBooking();

  // Read state passed from BookingForm
  // Fallback to empty if no state exists
  const state = location.state as
    | {
        searchParams: { checkIn: string; checkOut: string };
        availableRooms?: Room[];
      }
    | undefined;

  const [rooms, setRooms] = useState<Room[]>(state?.availableRooms || []);
  const [loading, setLoading] = useState(!state?.availableRooms); // only load if rooms not preloaded

  const checkIn = state?.searchParams.checkIn;
  const checkOut = state?.searchParams.checkOut;

  useEffect(() => {
    // If rooms already passed via state, no need to fetch
    if (!checkIn || !checkOut || state?.availableRooms) return;

    const loadRooms = async () => {
      setLoading(true);
      const result = await searchAvailableRooms(checkIn, checkOut);
      if (result.success) setRooms(result.rooms);
      setLoading(false);
    };

    loadRooms();
  }, [checkIn, checkOut, searchAvailableRooms, state?.availableRooms]);

  if (loading)
    return <p className="text-center p-8">Loading available rooms...</p>;
  if (!rooms.length)
    return (
      <p className="text-center p-8">No rooms available for these dates.</p>
    );

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-xl transition"
        >
          {room.image_url && (
            <img
              src={room.image_url}
              alt={room.name}
              className="rounded-xl mb-3 h-40 w-full object-cover"
            />
          )}
          <h2 className="text-lg font-semibold">{room.name}</h2>
          {room.description && (
            <p className="text-gray-500 text-sm mb-2">{room.description}</p>
          )}
          {room.price && (
            <p className="font-bold text-gray-800 mb-3">
              €{room.price} / night
            </p>
          )}
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            onClick={() => alert(`Book room ${room.name}`)}
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
