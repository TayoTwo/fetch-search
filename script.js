const ulist = document.getElementById('main__list');

start();

function loadPhoto({url, author} = {}){

    var node = document.createElement("li");
    var a = document.createElement('a');
    var i = document.createElement("img");
    var p = document.createElement("p");
    node.className += "main__list-item";

    a.href =  "#";
    a.addEventListener("click", main, false);
    i.src = url;
    p.innerText = author;
  
    a.appendChild(i);
    a.appendChild(p);
    node.appendChild(a);
    document.getElementById("main__list").appendChild(node);

}

async function changeSize(url){
  
  const fixedUrl = url.split('/');
  let width = fixedUrl[fixedUrl.length - 2];
  let height = fixedUrl[fixedUrl.length -1];
  
  console.log(width + " " + height);
}


async function start() {

  const data = await (
    fetch('https://picsum.photos/v2/list?page=2&limit=20')
    .then(response => response.json())
    .then(data => data.map(function(photo){
      let {author, download_url: url} = photo;
      
      url = url.replace(/(\/+)$/, '')
        .replace(/(\d+)\/(\d+)$/, (match, $width, $height) => {
          const $max = Math.max($width, $height);
          const max = Math.min($max, 1024);
        
          [$width, $height] = [$width, $height].map(dim => Math.round((dim / $max) * max));
        
          return `${$width}/${$height}`;
        });

      loadPhoto({url, author});
      
      return([url,photo.author]);
      
    }))
  
  );
  
  console.log(data);
  return data;
}

function main(evt) {
  "use strict";
  evt.preventDefault();
  
  const regex = RegExp(`^${evt.target.value}`, 'i');

  const listItems = [...ulist.getElementsByTagName('li')]
    .forEach(item => {

      item.style.display = `${item.innerText}`
        .split(/[^a-z]/ig)
        .some(w => regex.test(w)) ? "" : "none";

    });

}