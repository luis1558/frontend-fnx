export default function SearchBox({ value, onChange, onSubmit }) {
    return (
      <form onSubmit={onSubmit} className="w-full max-w-md">
        <div className="flex">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Buscar productos..."
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          >
            Buscar
          </button>
        </div>
      </form>
    );
  }