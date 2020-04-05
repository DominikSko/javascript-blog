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

/* Generating title links! */
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',  // ten selektor wybierze nam listę <ul>, w której będą zawarte tagi poszczególnych artykułów.
  optArticleAuthorSelector = '.post .post-author',
  optTagsListSelector = '.tags.list';

function generateTitleLinks(customSelector = ''){   // po co dodalismy customselector ?
  console.log();
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

      //const linkHTMLData = {tag: tag, tag: tag};
      //const linkHTML = templates.tagLink(linkHTMLData);    // skopiowane, da sie inaczej chyba
      const linkHTML = '<li><a href="#tag-' + tag + '"> ' + tag + '</a></li>';
      console.log(linkHTML);
      // <li><a href="#tag-cat">cat</a></li>

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('beforeend', html);   // tu co sie dzieje dokładnie ?

  /* END LOOP: for every article: */
  }

  const tags = document.querySelectorAll('.post-tags .list li a');      // co tu sie dzieje juz po funkcji generatetags?

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
  const clickedElement = this;        // co łączymy z this ?

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(event);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');            // co sie dzieje ?
  // funkcja replace otrzymuje dwa argumenty – szukaną frazę oraz ciąg znaków, którym ma ją zastąpić.

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');  // do obgadania, co tu sie dzieje ?
  console.log (tagLinks);
  //  użyliśmy łącznika ^=, który oznacza "atrybut href zaczynający się od "#tag-"". Dzięki temu nie potrzebujemy dodawać klasy do naszych linków!

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
  // łącznik ~=, który możemy odczytać jako "znajdź elementy, które mają atrybut data-tags, który ma w sobie słowo 'tag'".
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


// funkcja generate authors jeden autor
function generateAuthors(){

  // find all articles
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  // for every article find author
  for (let article of articles) {

    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    console.log (authorsWrapper);

    let html = '';
    // get authors from data=authors
    const author = article.getAttribute('data-author');
    console.log (author);
    // no need to split into array

    // generate html link for author  for example <p class="post-author">by Marion Berry</p>
    const linkHTML = '<a href="#author-' + author + '"> by ' + author + '</a>';
    console.log(linkHTML);

    // add generated code to html variable
    html = html + linkHTML;
    console.log(html);

    // insert html link into wrapper
    authorsWrapper.insertAdjacentHTML('beforeend', html);

  }
  const authors = document.querySelectorAll('.post-tags .list li a');      // co tu sie dzieje juz po funkcji generatetags?

  for (let author of authors){
    author.addEventListener('click', authorClickHandler);       // tagclickhandler ?
  }
}
generateAuthors();

// authorClickHandler wzorujac sie na tagClickHandler, najpierw ta funkcja przed authorclicklisteners?

function authorClickHandler(event){

event.preventDefault();   // prevent default action for this event
const clickedElement = this;  // dlaczego kliked element przypisujemy do this ?
const href = clickedElement.getAttribute('href');// read href from clicked element
console.log(href);
const author = href.replace('#author-', '');  /* make a new constant authoer and extract tag from the "href" constant */
const authorLinks = document.querySelectorAll('a.active[href^="#author-"]'); // find all author links with active class
console.log(authorLinks);
  for (let authorLink of authorLinks) {
  authorLink.classList.remove('active');
  }
const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
console.log(hrefAuthorLinks);
  for (let hrefAuthorLink of hrefAuthorLinks){
    hrefAuthorLink.classList.add('active');
    console.log(hrefAuthorLink);
  }
  generateTitleLinks('[data-author="' + author + '"]');   // co tu wywołuje?

}

// addClickListenersToAuthors wzorujac sie na addClickListenersToTags
function addClickListenersToAuthors (){
  const authorLinks = document.querySelectorAll('.post .post-author a'); // find all links to tags */
  console.log(authorLinks);
  for (let authorLink of authorLinks) {  // for each link add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();

// nie muze zmieniac generatleTitleLinks, wywoloac funkcje authorClickHandler z opodiwednim argumentem:

// LISTA TAGÓW PO PRAWEJ

/* Generating TAGS */
function generateTagsCloud(){

  // create a new variable allTags with an empty array [] > zmieniamy na nowy object {}*/
  let allTags = {};
  console.log(allTags);

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

      //const linkHTMLData = {tag: tag, tag: tag};
      //const linkHTML = templates.tagLink(linkHTMLData);    // skopiowane, da sie inaczej chyba
      const linkHTML = '<li><a href="#tag-' + tag + '"> ' + tag + '</a></li>';
      console.log(linkHTML);
      // <li><a href="#tag-cat">cat</a></li>

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);

       /* [NEW] check if this link is NOT already in allTags */  // do omówienia !
      if(!allTags.hasOwnProperty(tag)){                     // do omówienia !
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      console.log(allTags);

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    //tagsWrapper.insertAdjacentHTML('beforeend', html);   // tu co sie dzieje dokładnie ?

  /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  console.log(tagList);

  /* [NEW] add html from allTags to tagList */
  //tagList.innerHTML = allTags.join(' ');  // co tu sie dzieje ?
  //console.log(allTags);

  // new create variable for all links HTML code
  let allTagsHTML = '';

  // start loop for each tag in allTags
  for (let tag in allTags) {
    // generate code of a link and add it to alltags html
    allTagsHTML += tag + ' (' + allTags[tag] + ') ';
  } // end loop
  // add html from alltagsHTML to tagList
  tagList.innerHTML = allTagsHTML;


  const tags = document.querySelectorAll('.post-tags .list li a');      // co tu sie dzieje juz po funkcji generatetags?

  for (let tag of tags){
    tag.addEventListener('click', tagClickHandler);       // tagclickhandler ?
  }
}

generateTagsCloud();

// budujemy obiekt liczący tagi po prawej




