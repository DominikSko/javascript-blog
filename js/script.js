'use strict';

/* Wyświetlanie artykułu po kliknięciu  */

function titleClickHandler(event){
  event.preventDefault();                          /* provent devault aby nie skrolowalo nam jak w wikipedi do artykulu   */
  const clickedElement = this;                     /* this to klikniety element */
  console.log(event,'Link was clicked!');


  /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks){
     activeLink.classList.remove('active');
    }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add("active");                      
  console.log('clickedElement', clickedElement);        /* czego odnosze do clickedelement? */

  /* [DONE]remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');
  
  for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */

  targetArticle.classList.add("active");                      
                                                /* brakuje console log? */
}




/* Generowanie listy tytułów ! */

const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles';

  function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  // usuń zawartość listy linków w lewej kolumnie,

  
  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';
  console.log(titleList);


    /* for each article */
    // następnie dla każdego artykułu:

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    // console.log ?

    let html = '';   // dlaczego ?

    for (let article of articles){

    

    /* get the article id */
    // o	odczytaj jego id i zapisz je do stałej,
    const articleId = article.getAttribute('id');     // co tu robi article?
    console.log(articleId);
    /* find the title element */
    // 	znajdź element z tytułem i zapisz jego zawartość do stałej,

    const articleTitle = article.querySelector(optTitleSelector).innerHTML; // co robi article i innerHTML?
    console.log (articleTitle);
    /* get the title from the title element */
    // zrobione wyzej w jednej linii kodu
    
    /* create HTML of the link */
    //	na podstawie tych informacji stwórz kod HTML linka i zapisz go do stałej,

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */
    // o	wstaw stworzony kod HTML do listy linków w lewej kolumnie.

    titleList.insertAdjacentHTML('beforeend', linkHTML);     // co tu sie dzieje ?
    html = html + linkHTML;                                  // co tu sie dzieje ?
     console.log(html);    

    // titleList.innerHTML = html;
    
    // html = html + linkHTML;     // co tu sie stało ?
    //titleList.innerHTML = titleList.innerHTML + linkHTML;  // dziala co robi innerHTML co tu sie dzieje ?
    //console.log(html); 

    }

    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for (let link of links){
    link.addEventListener('click', titleClickHandler);
    // titleList.innerHTML = html;  // co tu sie dzieje ?
    }
  }


generateTitleLinks();
