async function fetchXML() {
  var [data1, data2] = await Promise.all([
    fetch("data/articles/headline.xml").then((response) => response.text()),
  ]);

  var parser = new DOMParser();
  var xmlDoc1 = parser.parseFromString(data1, "text/xml");
  var xmlDoc2 = parser.parseFromString(data2, "text/xml");

  return [xmlDoc1, xmlDoc2];
}

function convert(xmlDoc) {
  let htmlString = "";
  var items = xmlDoc.getElementsByTagName("tables");

  for (let i = 0; i < items.length; i++) {
    var headline = items[i].getElementsByTagName("headline")[0].innerHTML;
    var lashSm = items[i].getElementsByTagName("small-detail")[0].innerHTML;
    var lashImg = items[i].getElementsByTagName("small-img")[0].innerHTML;

    htmlString += `
        <aside class="my-art">
            <figure class="f-col">
                <div class="art-header">
                    <div>${headline}</div>
                    <span>${lashSm}</span>
                    <figcaption>Posted about month ago.</figcaption>
                </div>
                <div class="art-tags">
                    <div>12 min read</div>
                    <div>Open-Source</div>
                    <div>2nd tag</div>
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

  return htmlString;
}

async function displayData() {
  const [xmlDoc1] = await fetchXML();

  if (xmlDoc1) {
    const htmlString1 = convert(xmlDoc1);
    document.getElementById("lash-art").innerHTML = htmlString1;

    //article count each
    var lashCount = xmlDoc1.getElementsByTagName("tables").length;
    var lashCountEl = document.getElementById("lash-count");
    lashCountEl.textContent = `${lashCount} Articles ✏️`;
  }
}

displayData();

//Display nigga
console.error(`
    This bitch is an example of wannabe hacker😯
    
    https://github.com/eyelash128/lash

    Here check it and get the motherfucking copy. 
`);
