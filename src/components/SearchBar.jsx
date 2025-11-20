export default function SearchBar({ search, setSearch }) {
  return (
    <div className="mb-8 flex justify-center">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search events..."
        className="w-full max-w-lg p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
      />
    </div>
  );
}
