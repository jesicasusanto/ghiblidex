import React from 'react'

function MovieCard({ movie : { title,rt_score,release_date,running_time, image} }) {
  return (
    <div className="font-playpen bg-goldie border-2 border-brownie rounded-2xl flex flex-col justify-center items-center p-[7%] drop-shadow-lg">
        <img className="h-auto rounded-2xl"  src={image} alt="image" />
        <div className="mt-4 font-playpen">
            <h3 className='text-[min(4vw,24px)]'>{title}</h3>
            <p className='text-[min(4vw,20px)]'>⭐: {rt_score}% • {release_date} • {running_time} mins
            </p>

        </div>


    </div>
  )
}

export default MovieCard
