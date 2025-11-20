export default function EventCard({ event, onBook }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition p-4">
      <img
        src={event.image || "https://via.placeholder.com/400"}
        alt={event.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      <h2 className="text-xl font-medium text-gray-800">{event.title}</h2>
      <p className="text-sm text-gray-500 mt-1">{event.date}</p>

      <div className="text-sm text-gray-600 mt-3 space-y-1">
        <p>Capacity: <span className="font-medium">{event.capacity}</span></p>
        <p>Tickets Sold: <span className="font-medium">{event.ticketsSold}</span></p>
      </div>

      <button
        onClick={onBook}
        className="w-full mt-5 bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-700 transition"
      >
        Book Ticket
      </button>
    </div>
  );
}
