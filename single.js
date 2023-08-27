async function singleData() {
  var singleData = await Promise.all([
    fetch("data/articles/headline.xml").then((response) => response.text()),
  ]);

  var parser = new DOMParser();
  var xmlDoc1 = parser.parseFromString(data1, "text/xml");

  return [xmlDoc1, xmlDoc2];
}

