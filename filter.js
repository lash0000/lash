/**
 *  2023 - DEV
 *  Developer: Kenneth Obsequio
 *  GitHub: https://github.com/lash0000
 *  License: GPL v3.0
 *
 */

function filterResult(query) {
  fetch("data/articles/headline.xml")
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      const items = xmlDoc.getElementsByTagName("tables");

      const searchResults = [];

      for (let i = 0; i < items.length; i++) {
        const headline = items[i].getElementsByTagName("headline")[0].innerHTML;
        const firstTag = items[i].getElementsByTagName("first-tag")[0].innerHTML;
        const secondTag = items[i].getElementsByTagName("second-tag")[0].innerHTML;

        if (headline.toLowerCase().includes(query.toLowerCase())) {
          searchResults.push(items[i]);
        } else if (firstTag.toLowerCase().includes(query.toLowerCase())) {
          searchResults.push(items[i]);
        } else if (secondTag.toLowerCase().includes(query.toLowerCase())) {
          searchResults.push(items[i]);
        }
      }

      const resultsContainer = document.getElementById("searchArt");
      let htmlString = "";

      if (searchResults.length === 0) {
        resultsContainer.innerHTML = `
            <div class="error-result">
                <picture>
                    <img src="./async/prod/lash-search-error.jpg" alt="cat cries" />
                    <label>That thing is not here!</label>
                </picture>
            </div>
        `
      } else {
        searchResults.forEach((item) => {
          var headline = item.getElementsByTagName("headline")[0].innerHTML;
          var articleLink = item.getElementsByTagName("art-link")[0].innerHTML;
          var lashSm = item.getElementsByTagName("small-detail")[0].innerHTML;
          var lashImg = item.getElementsByTagName("small-img")[0].innerHTML;
          var lash1stTag = item.getElementsByTagName("first-tag")[0].innerHTML;
          var lash2ndTag = item.getElementsByTagName("second-tag")[0].innerHTML;
          var minRead = item.getElementsByTagName("min-read")[0].innerHTML;
          var posted = item.getElementsByTagName("posted")[0].innerHTML;

          htmlString += `
              <aside class="single-art">
                  <picture>
                      ${lashImg}
                  </picture>
                  <figure class="single-detail">
                      <div class="single-art-header">
                      <div><a href="${articleLink}">${headline}</a></div>
                      <span>${lashSm}</span>
                      <figcaption>${posted}</figcaption>
                      </div>
                      <div class="single-art-tags">
                      <div>${minRead}</div>
                      <div>${lash1stTag}</div>
                      <div>${lash2ndTag}</div>
                      </div>
                  </figure>
              </aside>
            `;
        });

        resultsContainer.innerHTML = htmlString;
      }
    })
    .catch((error) => {
      console.error("Error fetching XML data:", error);
    });
}

const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get("query");

if (searchQuery) {
  filterResult(searchQuery);
}
