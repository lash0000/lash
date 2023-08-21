async function fetchXML() {
  var [data1, data2] = await Promise.all([
    fetch("lib/data.xml").then((response) => response.text()),
  ]);

  var parser = new DOMParser();
  var xmlDoc1 = parser.parseFromString(data1, "text/xml");
  var xmlDoc2 = parser.parseFromString(data2, "text/xml");

  return [xmlDoc1, xmlDoc2];
}

function convert(xmlDoc) {
  let htmlString = "";
  const items = xmlDoc.getElementsByTagName("item");

  for (let i = 0; i < items.length; i++) {
    const name = items[i].getElementsByTagName("name")[0].innerHTML;
    const price = items[i].getElementsByTagName("price")[0].innerHTML;

    htmlString += `
        <div class="item">
          <h3>${name}</h3>
          <p>Price: $${price}</p>
        </div>
      `;
  }

  return htmlString;
}

async function displayData() {
  const [xmlDoc1, xmlDoc2] = await fetchXML();

  if (xmlDoc1 && xmlDoc2) {
    const htmlString1 = convert(xmlDoc1);
    const htmlString2 = convert(xmlDoc2);
    document.getElementById("root").innerHTML = htmlString1 + htmlString2;
  }
}

displayData();
