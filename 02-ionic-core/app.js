const url = "https://devfest-nantes-2018-api.cleverapps.io/blog";
const urlImages = "https://devfest2018.gdgnantes.com";

fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    const myList = document.getElementById("ion-list");

    for (var i = 0; i < data.length; i++) {
      var listItem = document.createElement("ion-card");
      const img = document.createElement("img");
      img.setAttribute("src", urlImages + data[i].image);
      listItem.appendChild(img);

      const title = document.createElement("div");
      title.setAttribute("class", "title");
      title.innerText = data[i].title;
      listItem.appendChild(title);

      const brief = document.createElement("div");
      brief.setAttribute("class", "brief");
      brief.innerText = data[i].brief;
      listItem.appendChild(brief);

      myList.appendChild(listItem);
    }
  });
