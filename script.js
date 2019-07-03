const ulist = document.getElementById('main__list');

start();

setInterval(function(){
  
  var arr = Array.prototype.slice.call(ulist.getElementsByTagName('li'));
  
  var count = 0;
  
  for(var i =0;i < arr.length;i++){
    
    if(arr[i].style.display != "none"){
       
       count++;
       
    }
    
  }
  
  document.getElementById("photo-count").innerText = count;
  
},250);

async function start() {

  console.log("Starting...");
  
  const data = await (
    fetch('https://picsum.photos/v2/list?page=5&limit=200')
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

function loadPhoto({url, author} = {}){

    var node = document.createElement("li");
    var a = document.createElement('a');
    var i = document.createElement("img");
    var p = document.createElement("p");
    node.className += "main__list-item";

    a.href =  "#";
    a.addEventListener("click", onClick, false);
    node.addEventListener("mouseover", onHover, false);
  node.addEventListener("mouseout", onExit, false);
    i.src = url;
    p.innerText = author;
  
    a.appendChild(i);
    a.appendChild(p);
    node.appendChild(a);
    document.getElementById("main__list").appendChild(node);

}

function sort(text){
  
  console.log(text);
  
  const regex = RegExp(`^${text}`, 'i');
  
  const listItems = [...ulist.getElementsByTagName('li')]
    .forEach(item => {

      item.style.display = `${item.innerText}`
        .split(/[^a-z -[0-9]]/ig)
        .some(w => regex.test(w)) ? "" : "none";

    });
  
}

function onClick(e) {
  
  e.preventDefault();
  
  sort(e.target.parentNode.lastChild.innerText);

}

function onKeyUp(e) {
  
  e.preventDefault();
  
  sort(e.target.value);

}


function onHover(e){
  
  // console.log(e.target.parentNode.nodeName);
  if(e.target.parentNode.nodeName == "A"){
  
    // console.log(e.target.parentNode.firstChild);
    e.target.parentNode.setAttribute("style", "filter: drop-shadow(0 0 10px black);");
  
  }
  
}

function onExit(e){
  
  if(e.target.parentNode.nodeName == "A"){
  
    // console.log(e.target.parentNode.firstChild);
    e.target.parentNode.setAttribute("style", "filter: none");
    
  }
  
}