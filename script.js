const ulist = document.getElementById('main__list');

start();

async function start(){
  
    const images = await requestImages();
  const authors = await requestAuthorNames();

  console.log(images.length);

  for (let j = 0; j < images.length; j++) {

    var node = document.createElement("li");
    var a = document.createElement('a');
    var i = document.createElement("img");
    var p = document.createElement("p");
    node.className += "main__list-item";

    a.href =  "/";
    i.src = images[j];
    p.innerText = authors[j];
  
    a.appendChild(i);
    a.appendChild(p);
    node.appendChild(a);
    document.getElementById("main__list").appendChild(node);

  }
  
}


async function requestImages() {

  const data = await (
    fetch('https://picsum.photos/v2/list?page=2&limit=100')
    .then(response => response.json())
    .then(data => data.map(photo => photo.download_url))
  );

  return data;
}

async function requestAuthorNames() {

  const data = await (
    fetch('https://picsum.photos/v2/list?page=2&limit=100')
    .then(response => response.json())
    .then(data => data.map(photo => photo.author))
  );

  return data;
}

async function main(evt) {
  "use strict";

  const regex = RegExp(`^${evt.target.value}`, 'i');

  const listItems = [...ulist.getElementsByTagName('li')]
    .forEach(item => {

      item.style.display = `${item.innerText}`
        .split(/[^a-z]/ig)
        .some(w => regex.test(w)) ? "" : "none";

    });

}