import React from 'react'

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center bg-white text-black opacity-80 rounded-xl border-brownie border-2 font-playpen my-4 px-2 drop-shadow-xl">
      <img 
        src="magnifier.svg" 
        alt="search" 
        className="w-[max(4vw,6px)] h-[max(4vh,6px)]mx-2" // Responsive image sizes
      />
      <input 
        type="text" 
        placeholder="Type your search here" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow p-2 rounded-r-xl text-[min(4vw,24px)]" // Responsive input size
      />
    </div>
  )
}

export default Search
