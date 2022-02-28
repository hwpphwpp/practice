import { useLocation, useParams } from "react-router";

interface RouteParams {
  movieId: string;
}

function Search() {
  const location = useLocation(); //현재 위치한 곳의 정보를 얻는다.
  console.log(location);
  const keyword = new URLSearchParams(location.search).get("keyword");
  const {movieId}=useParams<RouteParams>(); 
  console.log(movieId);
  return <h1>keyword</h1>;
}
export default Search;