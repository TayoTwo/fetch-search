const ulist = document.getElementById('main__list');

start();

async function start(){
  
  const data = await requestResources();
  let images = [];
  let authors = [];
  //
   // console.log(data);
   data.forEach(function(item){
     
      // console.log(item);
      images.push(item[0]);
      authors.push(item[1]);
     
    });

  console.log(authors);

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

async function changeSize(url){
  
  const fixedUrl = url.split('/');
  let width = fixedUrl[fixedUrl.length - 1];
  let height = fixedUrl[fixedUrl.length];
}


async function requestResources() {

  const data = await (
    fetch('https://picsum.photos/v2/list?page=2&limit=20')
    .then(response => response.json())
    .then(data => data.map(function(photo){
                           
      let url = JSON.stringify(photo.download_url);
      
      return([url,photo.author]);
      
      
    }))
  
  );
  
  console.log(data);
  return data;
}

async function main(evt) {
  "use strict";
  evt.preventDefault();
  
  // console.log(evt.target.value);
  
  const regex = RegExp(`^${evt.target.value}`, 'i');

  const listItems = [...ulist.getElementsByTagName('li')]
    .forEach(item => {

      item.style.display = `${item.innerText}`
        .split(/[^a-z]/ig)
        .some(w => regex.test(w)) ? "" : "none";

    });

}