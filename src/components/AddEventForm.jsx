import { useState } from "react";

export default function AddEventForm({ close, refresh, api }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    capacity: "",
    image: "",
  });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    await fetch(`${api}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center px-4">
      <form className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl" onSubmit={submit}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Event</h2>

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring focus:ring-gray-300"
          onChange={update}
          required
        />

        <input
          type="date"
          name="date"
          className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring focus:ring-gray-300"
          onChange={update}
          required
        />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring focus:ring-gray-300"
          onChange={update}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring focus:ring-gray-300"
          onChange={update}
        />

        <button className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-700 transition">
          Add Event
        </button>

        <button
          type="button"
          onClick={close}
          className="w-full mt-2 py-2.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
