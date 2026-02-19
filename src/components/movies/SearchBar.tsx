type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-semibold tracking-tight">Browse</h1>
      <input
        type="search"
        placeholder="Search for movies..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full max-w-md rounded bg-netflix-dark px-3 py-2 text-sm outline-none ring-1 ring-transparent focus:ring-netflix-red"
      />
    </div>
  )
}

