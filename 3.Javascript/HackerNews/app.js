const container=document.getElementById('root');
const ajax=new XMLHttpRequest(); //elementbyid로 div를 셀렉했던 것처럼 출력 결과를 돌려준다. 
                        //반환하는 값을 저장할 저장소가 필요함 -> let ajax 에 담음 (변수)
                        //ajax를 통해 xmlhttprequest가 제공하는 도구들을 사용할 수 있게됨 
const content=document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL ='https://api.hnpwa.com/v0/item/@id.json';
ajax.open('GET',NEWS_URL,false); //(method,url,async(false-동기적))
//open은 데이터를 가져온 것이 아니고 실제로 데이터를 가져오는 것은 ajax가 제공하는 send 함수를 호출할 때 
ajax.send(); 

//데이터가 들어온 것을 확인해야함. 데이터는 response 값에 들어있음
//console.log(ajax.response); //ui처리를 하기전에 브라우저에서 한번 확인

//출력 전에 중간 처리 과정이 필요, 가져온 데이터를 ul, li 태그로 
//프리뷰 탭처럼 보기 편하게 그루핑되도록 처리. response값을 -> 객체로

const newsFeed = JSON.parse(ajax.response); //parse함수는 괄호 안에 입력으로 받은 json데이터를 객체로 바꿔서 반환해줌
    //반환했으니 변수로 받아서 담아야함 (newsFeed). newsFeed에는 response값으로 온 JSON문자열이 객체화돼서 들어가있음 

//console.log(newsFeed);

//직접 타이핑했던 ul li 태그를 코드로 작성하기 
//문자열 만드는 방식 : 백틱 ( `` ) 사이에 만들고자하는 문자열을 넣어주면 됨 

const ul = document.createElement('ul'); //document는 html을 조작하는데 필요한 모든 도구를 제공 

window.addEventListener('hashchange',function(){
    const id=location.hash.substr(1) //#을빼고 id값만 가져오려고 
    ajax.open('GET',CONTENT_URL.replace('@id',id),false); //@id를 위의 #값을뺀 id로바꿈
    ajax.send();
    
    const newsContent=JSON.parse(ajax.response);
    const title=document.createElement('h1');
    title.innerHTML=newsContent.title;//title의 내용은 newsContent로 가져온 곳에서 가져오면됨
    content.appendChild(title);    });

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