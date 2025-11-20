export default function EventModal({ event, onClose }) {

  const buyTicket = async () => {
    const res = await fetch(`http://localhost:5000/api/events/${event._id}/buy`, {
      method: "POST",
    });

    if (res.ok) {
      alert("🎉 Ticket purchased!");
      onClose();
    } else {
      alert("Error buying ticket.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
        <img
          src={event.image || "https://placehold.co/600x400?text=Event+Image"}
          alt=""
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        
        <p className="text-gray-600 mb-2">📅 {event.date}</p>
        <p className="text-gray-700">
          Available: {event.capacity - event.ticketsSold}
        </p>

        <div className="mt-6 flex justify-between">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            onClick={buyTicket}
          >
            Buy Ticket
          </button>

          <button
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
