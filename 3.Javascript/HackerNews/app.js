const container=document.getElementById('root');
const content=document.createElement('div');
const ajax=new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL ='https://api.hnpwa.com/v0/item/@id.json';

function router(){
    const routePath=location.hash;

    if(routePath===''){ // home
        newsFeed();
    }else{
        newsDetail();
    }
}

function getData(url){
    ajax.open('GET',url,false);
    ajax.send();
    return JSON.parse(ajax.response);
}   

function newsFeed(){
    const newsFeed=getData(NEWS_URL); //데이터 가져오기
    const newsList=[];
    newsList.push('<ul>');
    
    for(let i=0;i<10;i++){ 
    newsList.push(`
        <li>
            <a href="#${newsFeed[i].id}">
            ${newsFeed[i].title} [${newsFeed[i].comments_count}</a>
        </li>
    `); 
    }

    newsList.push('</ul>'); 
    container.innerHTML=newsList.join(""); //구분자는 비워준다
}


function newsDetail(){
    const id=location.hash.substr(1);
    const newsContent=getData(CONTENT_URL.replace('@id',id));
    container.innerHTML=`
        <h2>detail page</h2>
        <h1>${newsContent.title}</h1>

        <div>
            <a href="#">목록으로</a>
        </div>
    `;
}

 
window.addEventListener('hashchange', router);
router();
 