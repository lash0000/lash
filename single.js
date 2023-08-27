/**
 *  2023 - DEV
 *  Developer: Kenneth Obsequio
 *  GitHub: https://github.com/lash0000
 *  License: GPL v3.0
 *
 */

async function singleData() {
  var singleData = await fetch("data/articles/headline.xml").then(
    (response) => response.text()
  );

  var parser = new DOMParser();
  var xmlDoc1 = parser.parseFromString(singleData, "text/xml");

  return xmlDoc1;
}

function convert(xmlDoc) {
  let htmlString = "";
  var items = xmlDoc.getElementsByTagName("tables");

  for (let i = 0; i < items.length; i++) {
    var headline = items[i].getElementsByTagName("headline")[0].innerHTML;
    var articleLink = items[i].getElementsByTagName("art-link")[0].innerHTML;
    var lashSm = items[i].getElementsByTagName("small-detail")[0].innerHTML;
    var lashImg = items[i].getElementsByTagName("small-img")[0].innerHTML;
    var lash1stTag = items[i].getElementsByTagName("first-tag")[0].innerHTML;
    var lash2ndTag = items[i].getElementsByTagName("second-tag")[0].innerHTML;
    var minRead = items[i].getElementsByTagName("min-read")[0].innerHTML;
    var posted = items[i].getElementsByTagName("posted")[0].innerHTML;

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
  }

  return htmlString;
}

async function displayData() {
  const xmlDoc1 = await singleData();

  if (xmlDoc1) {
    const htmlString1 = convert(xmlDoc1);
    document.getElementById("single-art").innerHTML = htmlString1;
  }

}

displayData();