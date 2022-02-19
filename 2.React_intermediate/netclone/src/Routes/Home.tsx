import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import {makeImagePath} from "../utils";

const Wrapper =styled.div`
  background:black;
`;
const Loader=styled.div`
  height:20vh;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const Banner=styled.div<{bgPhoto:string}>`
  height:100vh; 
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding:60px;

  background-image:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),
          url(${(props)=>props.bgPhoto});
  background-size:cover;
`;

const Title=styled.h2`
  font-size:68px;
  margin-bottom:20px;
`;

const Overview=styled.p`
  font-size:30px;
  width:50%;
`;

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
  console.log(data, isLoading);
  return (
    <Wrapper>{isLoading ? (
      <Loader>Loading..</Loader>
     ) : (
      // Fragment는 많은 요소를 공통된 부모없이 연이어 리턴할 수 있는 방법 
       <>
        <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
          {/* Banner에서는 GET해온 영화의 배열에서 첫번째 항목을 보여줌 */}
          <Title>{data?.results[0].title}</Title>
          <Overview>{data?.results[0].overview}</Overview>
        </Banner>
       </>
     )} </Wrapper>
  );
} 
export default Home;