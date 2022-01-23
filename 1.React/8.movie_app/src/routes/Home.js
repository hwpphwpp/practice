
import { useEffect, useState } from "react";
import Movie from "../components/Movie";

function Home(){
    const [loading, setLoading]=useState(true);
    const [movies, setMovies]=useState([]);
    const getMovies=async()=>{
      const response= await fetch( 
          `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
        );
        const json=await response.json();
        setMovies(json.data.movies);
        setLoading(false);
    };
  
    useEffect(()=>{
      getMovies();
    },[]);
    
       
    return ( <div>
      { loading ? (
    <h1>Loading...</h1>
    ) : (
        <div>
         {movies.map((movie)=> (
         <Movie // Movie 컴포넌트로 보내는 props 
         key={movie.id} 
         id={movie.id}
         coverImg={movie.medium_cover_image} 
         title={movie.title} 
         summaray={movie.summary} 
         genres={movie.genres}/>
         //{}안의 movie.medium_~ 이곳은 API로부터 받는 data이므로 이름이 같아야한다.
       ))}
       </div> 
       )}
       </div>
    );
}

export default Home;