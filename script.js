const ulist = document.getElementById('main__list');

start();

async function start(){
  
  const data = requestResources();
  const images = await data.then(data => data.map(photo => photo.download_url));
  const authors = await data.then(data => data.map(photo => photo.author));

  // console.log(images);

  for (let j = 0; j < images.length; j++) {

    var node = document.createElement("li");
    var a = document.createElement('a');
    var i = document.createElement("img");
    var p = document.createElement("p");
    node.className += "main__list-item";

    a.href =  "#";
    a.addEventListener("click", main, false);
    i.src = images[j];
    p.innerText = authors[j];
  
    a.appendChild(i);
    a.appendChild(p);
    node.appendChild(a);
    document.getElementById("main__list").appendChild(node);

  }
  
}


async function requestResources() {

  const data = await (
    fetch('https://picsum.photos/v2/list?page=2&limit=20')
    .then(response => response.json())
    
  );
  
  console.log(data);
  return data;
}

async function main(evt) {
  "use strict";
  evt.preventDefault();
  
  console.log(evt.target);
  
  const regex = RegExp(`^${evt.target.value}`, 'i');

  const listItems = [...ulist.getElementsByTagName('li')]
    .forEach(item => {

      item.style.display = `${item.innerText}`
        .split(/[^a-z]/ig)
        .some(w => regex.test(w)) ? "" : "none";

    });

}