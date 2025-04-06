import React from 'react'
import magnifier from "../assets/magnifier.svg"

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center bg-white text-black opacity-80 rounded-3xl border-brownie border-2 font-playpen my-4 px-2 drop-shadow-xl w-[70vw]">
      <img 
        src={magnifier}
        alt="search" 
        className="w-[max(3vw,5px)] h-[max(3vh,5px)]mx-2 my-2"
      />
      <input 
        type="text" 
        placeholder="Type your search here" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow p-2 rounded-r-xl text-[min(4vw,24px)]"
      />
    </div>
  )
}

export default Search
