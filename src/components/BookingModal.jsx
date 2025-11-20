export default function BookingModal({ event, close, api }) {
  const confirmBooking = async () => {
    await fetch(`${api}/events/${event._id}/book`, {
      method: "POST",
    });

    alert("Ticket booked successfully.");
    close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800">Confirm Booking</h2>

        <div className="mt-4 text-gray-700">
          <p className="mb-1"><strong>Event:</strong> {event.title}</p>
          <p><strong>Date:</strong> {event.date}</p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={confirmBooking}
            className="flex-1 bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-700 transition"
          >
            Confirm
          </button>

          <button
            onClick={close}
            className="flex-1 bg-gray-200 py-2.5 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
