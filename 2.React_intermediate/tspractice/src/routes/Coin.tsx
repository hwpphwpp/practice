import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";


const Container=styled.div`
padding:0px 20px;
max-width:480px;
margin:0 auto;
`;

const Loader=styled.span`
text-align:center;
display:block;
`;

const Header=styled.div`
height:10vh;
display:flex;
justify-content:center;
align-items:center;
`;
 

const Title=styled.h1`
color:${props=>props.theme.accentColor};
font-size:48px;
`;
 



interface RouteParams{
    coinId:string;
}

interface RouteState{
    name:string;
}


function Coin(){
    const [loading, setLoading] = useState(true);
    const {coinId}=useParams<RouteParams>();
    const {state}=useLocation<RouteState>();
    const [info, setInfo] = useState({});
    const [priceInfo, setPriceInfo]=useState({});

    useEffect(()=>{
        (async () =>{
            const infoData=await (
            await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            const priceData=await(
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
            setInfo(infoData);
            setPriceInfo(priceData);
            console.log(priceData);
        })();
    })
    console.log(state);

    return  <Container>
    <Header>
        <Title> {state?.name || "Loading.."} </Title>
    </Header>
    {loading ? ( 
    <Loader>Loading...</Loader>
    ) : null } </Container>;
}

export default Coin;