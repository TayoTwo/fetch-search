const ulist = document.getElementById('main__list');

function addItems(){
  
  const data = fetch('https://picsum.photos/v2/list?page=2&limit=100')
  .then(response => response.json())
  .then(data => data.downaload_url);
  
  console.log(data);
  
}

function main(evt) {
  "use strict";
  
  addItems();

  const regex = RegExp(`^${evt.target.value}`, 'i');
  
  const listItems = [...ulist.getElementsByTagName('li')]
    .forEach(item => {
      
      item.style.display = `${item.innerText}`
        .split(/[^a-z]/ig)
        .some(w => regex.test(w)) ? "" : "none"; 
    });
  
}