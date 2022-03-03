const container=document.getElementById('root');
const content=document.createElement('div');

//1.데이터 받아오기
const ajax=new XMLHttpRequest(); 
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL ='https://api.hnpwa.com/v0/item/@id.json';
ajax.open('GET',NEWS_URL,false); 
ajax.send(); 
const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement('ul'); 

//2.이벤트 달기
window.addEventListener('hashchange',function(){
    const id=location.hash.substr(1) //#을빼고 id값만 가져오려고 
    ajax.open('GET',CONTENT_URL.replace('@id',id),false); //@id를 위의 #값을뺀 id로바꿈
    ajax.send();
    const newsContent=JSON.parse(ajax.response);
    const title=document.createElement('h1');
    title.innerHTML=newsContent.title;//title의 내용은 newsContent로 가져온 곳에서 가져오면됨
    content.appendChild(title);    });

//3.UI 
for(let i=0; i<10; i++){ 
    const div=document.createElement('div');
    const li=document.createElement('li');
    const a = document.createElement('a');
    //매번 새로 만들어지니까 for문 안에서 만들어야함 
    div.innerHTML = `
                    <li>
                        <a href="#${newsFeed[i].id}">
                        ${newsFeed[i].title} (${newsFeed[i].comments_count})</a>
                    </li>
                    ` 
    ul.appendChild(div.firstElementChild); //div의 첫번째 자식 li를 ul에 append
    }

container.appendChild(ul);
container.appendChild(content);