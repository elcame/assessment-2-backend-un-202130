const puppeteer = require('puppeteer');

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */
async function getPageTitle(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle0' });
    const title = await page.evaluate(() => document.querySelector('head > title').innerText);

    await browser.close();

    return title;
}

async function getData(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
	
  await page.waitForSelector('[class=movie-box]')
	const peliculas = await page.evaluate(() => { 

		const $movies = document.querySelectorAll('[class="movie-box"]')
		
    const links = []
		
    $movies.forEach(($movies) => {
			link= $movies.getAttribute("href")
      const num = link.split("/") 
      
      links.push(num[num.length-2])

      })
		return links	
	  })
    const  detailmovie=[]
    for (i of peliculas) {
      complete="https://royal-films.com/api/v1/movie/"+i+"/barranquilla?"
      x= scraper.data(complete)
      detailmovie.push(x) 
      
    }

  //console.log("El resultado es:")
  await browser.close();
    return detailmovie;
    
}

async function data(url){
  try {
    const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
    const movieDetails = await page.evaluate(async (url) => {
      const movie = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        mode: "cors",
      });
      return movie.json();
    },url);
  await browser.close(); 
  const dato =
{
    originalTitle:movieDetails.data['original'],
    title:movieDetails.data['title'],
    synopsis:movieDetails.data['synopsis'],
    starred:movieDetails.data['starred'],
    director:movieDetails.data['director'],
    posterPhoto: "/"+movieDetails.data['poster_photo']+"/",
    trailer: "https://youtube.com/watch?v="+movieDetails.data.youtube+"/",
  }
  return dato
           
  } catch (error) {
    
  }
  

}
module.exports = {
    getPageTitle,
    getData,
    data,
};