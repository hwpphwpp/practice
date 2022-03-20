interface Store{
  currentPage:number;
  feeds:NewsFeed[];
  
}

interface News{
  readonly id:number;
  time_ago:string;
  title:string;
  url:string;
  user:string;
  content:string;
}

interface NewsFeed extends News {
  comments_count:number;
  points:number; 
  read?:boolean;
}
 
interface NewsDetail extends News { 
  comments:NewsComment[];
}

interface NewsComment extends News{ 
  comments:NewsComment[];
  level:number;
}


const container: HTMLElement | null = document.getElementById('root');
const ajax: XMLHttpRequest= new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const store:Store = {
  currentPage: 1,
  feeds: [],
};

class Api{
  url:string; //받은 속성을 내부에 저장
  ajax: XMLHttpRequest; //내부속성(모든 APi호출에 필요)
  constructor(url:string){ //외부로부터 데이터를 받음
    //생성자 내부에서 초기화
    //인스턴스 객체에 접근하는 지시어 this
    this.url=url;
    this.ajax=new XMLHttpRequest();
  }

  protected getRequest<AjaxResponse>():AjaxResponse{
    this.ajax.open('GET', this.url, false);
    this.ajax.send();
  
    return JSON.parse(this.ajax.response);
  }
}
class NewsFeedApi extends Api{
  getData():NewsFeed[]{//실제로 데이터를 가져옴. 반환값은 newsFeed의 []
   //getRequest함수를 호출해서 값만 얻어오면됨
   return this.getRequest<NewsFeed[]>();
  }  
}

class NewsDetailApi extends Api{
  getData():NewsDetail{//실제로 데이터를 가져옴. 반환값은 newsFeed의 []
   return this.getRequest<NewsDetail>();
  }  
}

 

function makeFeeds(feeds:NewsFeed[]):NewsFeed[] {
  for (let i = 0; i < feeds.length; i++) {
    feeds[i].read = false;
  }

  return feeds;
}

function updateView(html:string):void{ 
  if(container!=null){
    container.innerHTML = html;
    }else{
      console.error('최상위 컨테이너가 없어 UI를 진행하지 못합니다..');
    }
}
function newsFeed():void {
  //클래스는 항상 인스턴스를 생성해야
  const api=new NewsFeedApi(NEWS_URL);

  let newsFeed:NewsFeed[] = store.feeds;
  const newsList = [];
  let template = `
    <div class="bg-gray-600 min-h-screen">
      <div class="bg-white text-xl">
        <div class="mx-auto px-4">
          <div class="flex justify-between items-center py-6">
            <div class="flex justify-start">
              <h1 class="font-extrabold">Hacker News</h1>
            </div>
            <div class="items-center justify-end">
              <a href="#/page/{{__prev_page__}}" class="text-gray-500">
                Previous
              </a>
              <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">
                Next
              </a>
            </div>
          </div> 
        </div>
      </div>
      <div class="p-4 text-2xl text-gray-700">
        {{__news_feed__}}        
      </div>
    </div>
  `;

  if (newsFeed.length === 0) {
    newsFeed = store.feeds = makeFeeds(api.getData());
  }

  for(let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
      <div class="p-6 ${newsFeed[i].read ? 'bg-red-500' : 'bg-white'} mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
        <div class="flex">
          <div class="flex-auto">
            <a href="#/show/${newsFeed[i].id}">${newsFeed[i].title}</a>  
          </div>
          <div class="text-center text-sm">
            <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${newsFeed[i].comments_count}</div>
          </div>
        </div>
        <div class="flex mt-3">
          <div class="grid grid-cols-3 text-sm text-gray-500">
            <div><i class="fas fa-user mr-1"></i>${newsFeed[i].user}</div>
            <div><i class="fas fa-heart mr-1"></i>${newsFeed[i].points}</div>
            <div><i class="far fa-clock mr-1"></i>${newsFeed[i].time_ago}</div>
          </div>  
        </div>
      </div>    
    `);
  }

  template = template.replace('{{__news_feed__}}', newsList.join(''));
  template = template.replace('{{__prev_page__}}', String(store.currentPage > 1 ? store.currentPage - 1 : 1));
  template = template.replace('{{__next_page__}}', String(store.currentPage + 1));
  
  updateView(template);
}

function newsDetail():void {
  const id = location.hash.substr(7);
  const api=new NewsDetailApi(CONTENT_URL.replace('@id', id));
  const newsContent = api.getData();
  let template = `
    <div class="bg-gray-600 min-h-screen pb-8">
      <div class="bg-white text-xl">
        <div class="mx-auto px-4">
          <div class="flex justify-between items-center py-6">
            <div class="flex justify-start">
              <h1 class="font-extrabold">Hacker News</h1>
            </div>
            <div class="items-center justify-end">
              <a href="#/page/${store.currentPage}" class="text-gray-500">
                <i class="fa fa-times"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="h-full border rounded-xl bg-white m-6 p-4 ">
        <h2>${newsContent.title}</h2>
        <div class="text-gray-400 h-20">
          ${newsContent.content}
        </div>

        {{__comments__}}

      </div>
    </div>
  `;

  for(let i=0; i < store.feeds.length; i++) {
    if (store.feeds[i].id === Number(id)) {
      store.feeds[i].read = true;
      break;
    }
  }
  updateView(template.replace('{{__comments__}}', makeComment(newsContent.comments)));
 }

 function makeComment(comments:NewsComment[]) :string {
  const commentString = [];
  
  for(let i = 0; i < comments.length; i++) {
    const comment:NewsComment=comments[i];
    
    commentString.push(`
      <div style="padding-left: ${comment.level * 40}px;" class="mt-4">
        <div class="text-gray-400">
          <i class="fa fa-sort-up mr-2"></i>
          <strong>${comment.user}</strong> ${comment.time_ago}
        </div>
        <p class="text-gray-700">${comment.content}</p>
      </div>      
    `);

    if (comments[i].comments.length > 0) {
      commentString.push(makeComment(comments[i].comments));
    }
  }

  return commentString.join('');
}

function router():void {
  const routePath = location.hash;

  if (routePath === '') {
    newsFeed();
  } else if (routePath.indexOf('#/page/') >= 0) {
    store.currentPage = Number(routePath.substr(7));
    newsFeed();
  } else {
    newsDetail()
  }
}

window.addEventListener('hashchange', router);

router();
