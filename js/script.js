'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;                         /* co tu sie dzieje co to jest this */
  console.log(event,'Link was clicked!');


  /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
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

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}