async function fetchXML() {
  var [data1, data2] = await Promise.all([
    fetch("../../data/articles/headline.xml").then((response) =>
      response.text()
    ),
  ]);

  var parser = new DOMParser();
  var xmlDoc1 = parser.parseFromString(data1, "text/xml");

  return xmlDoc1;
}

function lashConvert(xmlDoc) {
  let htmlString = "";
  var items = xmlDoc.getElementsByTagName("tables");
  var headlineLimit = 3; //limit for article blog

  for (let i = 0; i < items.length && i < headlineLimit; i++) {
    var headline = items[i].getElementsByTagName("headline")[0].innerHTML;
    var lashSm = items[i].getElementsByTagName("small-detail")[0].innerHTML;
    var lashImg = items[i].getElementsByTagName("small-img")[0].innerHTML;
    var lash1stTag = items[i].getElementsByTagName("first-tag")[0].innerHTML;
    var lash2ndTag = items[i].getElementsByTagName("second-tag")[0].innerHTML;
    var minRead = items[i].getElementsByTagName("min-read")[0].innerHTML;

    htmlString += `
            <aside class="my-art">
                <figure class="f-col">
                    <div class="art-header">
                        <div><a href="/@eyelash/story">${headline}</a></div>
                        <span>${lashSm}</span>
                        <figcaption>Posted about month ago.</figcaption>
                    </div>
                    <div class="art-tags">
                        <div>${minRead}</div>
                        <div>${lash1stTag}</div>
                        <div>${lash2ndTag}</div>
                    </div>
                </figure>
                <figure class="l-col">
                    <div class="art-img">
                        ${lashImg}
                    </div>
                </figure>
            </aside>
          `;
  }
}

async function display3Art() {
  var xmlDoc1 = await fetchXML();

  if (xmlDoc) {
    const htmlString = lashConvert(xmlDoc1);

    document.getElementById("lash-art").innerHTML = htmlString;
  }
}

display3Art();
