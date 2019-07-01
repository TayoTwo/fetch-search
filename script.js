const ulist = document.getElementById('main__list');

async function requestImages(){
  
  const data = await (
    fetch('https://picsum.photos/v2/list?page=2&limit=100')
      .then(response => response.json())
      .then(data => data.map(photo => photo.download_url))
  );
  
  console.log(data);
  return data;
}

async function main(evt) {
  "use strict";
  
  const images = await requestImages();
  
  images.forEach(img => {
    
    var node = document.createElement("li");   
    var i = document.createElement("img")
    i.src =  img;
    node.appendChild(i);
    document.getElementById("main__list").appendChild(node);
    
  }
  
    
    
  );
    
    
  const regex = RegExp(`^${evt.target.value}`, 'i');
  
  const listItems = [...ulist.getElementsByTagName('li')]
    .forEach(item => {
      
      item.style.display = `${item.innerText}`
        .split(/[^a-z]/ig)
        .some(w => regex.test(w)) ? "" : "none"; 
    });
  
}