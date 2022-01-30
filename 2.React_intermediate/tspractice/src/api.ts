export function fetchCoins(){ //api를 fetch하여 return하는 함수 
    return fetch("https://api.coinpaprika.com/v1/coins").then(response=>response.json());

}