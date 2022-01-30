import styled from "styled-components";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";

const Container=styled.div`
padding:0px 20px;
max-width:480px;
margin:0 auto;
`;

const Header=styled.div`
height:10vh;
display:flex;
justify-content:center;
align-items:center;
`;

const CoinsList=styled.ul``;

const Coin=styled.li`
background-color:white;
color:${(props)=>props.theme.bgColor};
padding:20px;
margin-bottom:10px;
border-radius:15px;
&:hover{
    a{
        color:${(props)=>props.theme.accentColor};
    }
}
a{
    transition: color 0.2s ease-in;
    display:flex;
    align-items:center;
}

`;

const Title=styled.h1`
color:${props=>props.theme.accentColor};
font-size:48px;
`;
 

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean
    is_active: boolean,
    type: string,
}

const Loader=styled.span`
text-align:center;
display:block;
`;

const Img=styled.img`
    width:35px;
    heigth:35px;
    padding:2px;
    margin-right:10px;
`;

function Coins(){
    const [coins,setCoins]=useState<CoinInterface[]>([]);
    const [loading, setLoading]=useState(true);
    useEffect( ()=>{ 
        //component life의 시작점에서만 실행되도록
        (async()=>{ //즉시 실행할 수 있는 function 
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0,100));
            setLoading(false);
        })();
    }, []); 
    return (
    <Container>
        <Header>
            <Title>코인</Title>
        </Header>
        {loading ? ( 
        <Loader>Loading...</Loader>
        ) : ( <CoinsList>
            {coins.map(coin=><Coin key={coin.id}>
                <Link to=
                    {{
                        pathname: `/${coin.id}`,
                        state:{name:coin.name},
                    }}
                
                >
                    <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                    {coin.name}&rarr;</Link>
            </Coin>)}
        </CoinsList>
        )}
    </Container>
    );

}

export default Coins;