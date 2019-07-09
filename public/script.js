const ulist = document.getElementById('main__list');
var input = document.getElementById("header__search-input");
var pagecount = 1;
var imageData = [];
var hitPageLimit = false;
var loadingPages = false;
var prevArray = [];
var imageInFocus = false;
var currentImage = "";
var scrollPos = 0;
var count = 0;
var maxNumPages = 96;
// input.focus();

start();

async function start() {

  imageData.push(await fetchData());
  imageData = [...imageData];
  // prevArray = imageData[0];
}

async function scroll() {

  var limit = Math.max(document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight);


  if (window.scrollY < 0.5) {

    document.getElementById("header__bar").style.display = "none";

  } else if (!hitPageLimit && (window.innerHeight + window.scrollY) >= (limit * 0.75) && !loadingPages && !imageInFocus) {


    loadingPages = true;
    imageData[0] = imageData[0].concat(await fetchData());

    (imageData[0].length == prevArray.length) ? (hitPageLimit = true) : (hitPageLimit = false);
    limit = document.body.offsetHeight - window.innerHeight;
    limit = Math.max(document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight);

    prevArray = imageData[0];

  } else {

    document.getElementById("header__bar").style.display = "";

  }

}

window.addEventListener("scroll", scroll, 1000);

setInterval(function() {

  var arr = Array.prototype.slice.call(ulist.getElementsByTagName('li'));
  var intElemScrollTop = document.body.scrollTop;

  count = 0;

  for (var i = 0; i < arr.length; i++) {

    if (arr[i].style.display != "none") {

      count++;

    }

  }

  document.getElementById("photo-count").innerText = count;

}, 1000);


async function fetchData() {

  const data = await (
    fetch('https://picsum.photos/v2/list?page=' + pagecount + '&limit=' + maxNumPages)
    .then(response => response.json())
    .then(data => data.map(function(photo) {
      let {author,download_url: url} = photo;
      var nurl = shrinkImg(url);

      loadPhoto({nurl,author,url});

      return ([[nurl, photo.author], url]);

    }))

  );

  pagecount++;
  loadingPages = false;

  return data;

}

function shrinkImg(url) {

  var nurl = url.replace(/(\/+)$/, '')
    .replace(/(\d+)\/(\d+)$/, (match, $width, $height) => {
      const $max = Math.max($width, $height);
      const max = Math.min($max, 512);

      [$width, $height] = [$width, $height].map(dim => Math.round((dim / $max) * max));

      return `${$width}/${$height}`;
    });

  return nurl;

}

function loadPhoto({
  nurl,
  author,
  url
} = {}) {

  var node = document.createElement("li");
  var f = document.createElement('figure');
  var i = document.createElement("img");
  var c = document.createElement("span");
  node.className += "main__list-item";

  f.href = "#";
  f.addEventListener("click", onClick, false);
  i.src = nurl;
  i.dataset.originalSrc = url;
  // i.id = url;

  i.className = "item-img";
  c.innerText = author;

  f.appendChild(i);
  f.appendChild(c);
  node.appendChild(f);
  document.getElementById("main__list").appendChild(node);

}

function sort(text) {

  input.value = text;
  const regex = RegExp(`^${text}`, 'i');

  const listItems = [...ulist.getElementsByTagName('li')]
    .forEach(item => {

      item.style.display = `${item.innerText}`
        .split(/[^a-z -+[0-9]]/ig)
        .some(w => regex.test(w)) ? "" : "none";



    });

}

function onSelectImg(e) {

  var rawImg = '';
  const imageEl = e.target;

  if (count >= maxNumPages) {

    scrollPos = window.scrollY;

  }

  for (var i = 0; i < imageData[0].length; i++) {

    var x = imageData[0][i];

    if (x[0][0] != e.target.src) {

      ulist.getElementsByTagName('li')[i].style.display = "none";

    }

  }

  imageEl.addEventListener('load', function expandImage() {

    var aspectRatio = (imageEl.naturalHeight / imageEl.naturalWidth) * 100;
    aspectRatio = ("padding-top:" + Math.round(aspectRatio) + "%").toString();

    imageEl.parentNode.parentNode.setAttribute("style", "margin: 0.15rem; width: calc(100% - 1.2rem);");
    imageEl.parentNode.setAttribute("style", aspectRatio);

    imageEl.removeEventListener('load', expandImage);
  }, false);
  imageEl.src = imageEl.dataset.originalSrc;

}

function onClick(e) {

  e.preventDefault();

  if (event.target.tagName.toLowerCase() === 'img' && !imageInFocus) {

    onSelectImg(e);
    imageInFocus = true;


  } else if (event.target.tagName.toLowerCase() != 'img') {

    var img = e.target.parentNode.firstChild;
    img.src = shrinkImg(img.dataset.originalSrc);

    e.target.parentNode.parentNode.setAttribute("style", "");
    e.target.parentNode.setAttribute("style", "");
    sort(e.target.innerText);
    imageInFocus = false;

  }

}

function reset() {

  [...ulist.getElementsByTagName("li")].forEach(item => {

    item.setAttribute("style", "");
    item.firstChild.setAttribute("style", "");

  });

  sort("");
  window.scrollTo(0, scrollPos);
  imageInFocus = false;

}

function onKeyUp(e) {

  e.preventDefault();

  sort(e.target.value);

}
