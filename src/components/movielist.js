import React from 'react';

const MovieList = (props) => {
    return (
        <>
        {props.movies.map((movie, index) => (
            <div className="image-container d-flex justify-content-start m3">
                <img src={movie.Poster} alt="movie"></img>
            </div>
        ))}
        </>
    )
}

export default MovieList;