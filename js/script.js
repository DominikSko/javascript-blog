'use strict';

/* Generating article after click!  */

function titleClickHandler(event){
  event.preventDefault();                          /* provent devault aby nie skrolowalo nam jak w wikipedi do artykulu   */
  const clickedElement = this;                     /* this to klikniety element */
  console.log(event,'Link was clicked!');

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement', clickedElement);        /* czego odnosze do clickedelement? */

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');

  for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
  /* brakuje console log? */
}




/* Generating title list! */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
  optArticleTagsSelector = '.post-tags .list',  // ten selektor wybierze nam listę <ul>, w której będą zawarte tagi poszczególnych artykułów.

function generateTitleLinks(customSelector = ''){   // po co dodalismy customselector ?
                                                    // jeśli nie podano argumentu, to customSelector będzie miał wartość '', czyli pustego ciągu znaków.
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
  }
}


generateTitleLinks();

/* Generating TAGS */

function generateTags(){

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log (tagsWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');  // odczytanie tagów z atrybutu data-tags naszego artykułu
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');  // zmienia się tylko nazwa – zamiast kolekcji elementów, mamy do czynienia z tablicą.
    console.log(articleTagsArray);


    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);                     // Zauważ, że spacje, które znajdowały się pomiędzy tagami, zostały usunięte. Zajęła się tym funkcja split.

      /* generate HTML of the link */

      const linkHTMLData = {tag: tag, tag: tag};            // skopiowane, da sie inaczej chyba
      const linkHTML = templates.tagLink(linkHTMLData);    // skopiowane, da sie inaczej chyba
      // <li><a href="#tag-cat">cat</a></li>

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('beforeend', html);

  /* END LOOP: for every article: */
  }

  const tags = document.querySelectorAll('.post-tags .list li a');

  for (let tag of tags){
    tag.addEventListener('click', tagClickHandler);       // tagclickhandler ?
  }

}

generateTags();

// Funkcja po kliknięciu w tag

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute(href);
  console.log(event);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');  // Aby znaleźć wszystkie aktywne linki do tagów, użyjemy selektora 'a.active[href^="#tag-"]'. Ta część zamknięta w nawiasach kwadratowych, to właśnie selektor atrybutu
  console.log (tagLinks);

  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {

    /* remove class active */
    tagLink.classList.remove('active');  // classlist ?

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');   // argument ('a[href="' + href + '"]'); ??

  /* START LOOP: for each found tag link */
  for (let hrefTagLink of hrefTagLinks) {

    /* add class active */
    hrefTagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');  // co tu sie dzieje argument ?
}

function addClickListenersToTags(){
  /* find all links to tags */

  const tagLinks = document.querySelectorAll('.post-tags .list a');
  console.log(tagLinks);

  /* START LOOP: for each link */
  for(let tagLink of tagLinks) {
    tagLink.addEventListener('click', tagClickHandler);

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();


