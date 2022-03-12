function newsFeed(){
    const newsFeed=getData(NEWS_URL);
    const newsList=[];
        
    newsList.push('<ul>');
            
        for(let i=(store.currentPage-1)*10; i<store.currentPage*10; i++){ 
                
            newsList.push( `
            
        <li>
            <a href="#/show/${newsFeed[i].id}">
            ${newsFeed[i].title} (${newsFeed[i].comments_count})</a>
        </li>
        ` );
            
        }
        
    newsList.push('</ul>');
    newsList.push(`
        <div>
            <a href="#/page/${store.currentPage>1?store.currentPage-1:1}">이전페이지</a>
            <a href="#/page/${store.currentPage+1}">다음 페이지</a>
        </div>
    `);
    container.innerHTML=newsList.join('');
    }