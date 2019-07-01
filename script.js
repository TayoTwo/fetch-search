const ulist = document.getElementById('main__list');

function main(evt) {
  "use strict";

  const regex = RegExp(`^${evt.target.value}`, 'i');
  
  const listItems = [...ulist.getElementsByTagName('li')]
    .forEach(item => {
      
      console.log(item.innerText);
      item.style.display = `${item.innerText}`
        .split(/[^a-z]/ig)
        .some(w => regex.test(w)) ? "" : "none"; 
    });
  
}