var names = ['bag.jpg', 'banana.jpg', 'bathroom.jpg','boots.jpg','breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png','tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var imageID = [document.getElementById('image1'),document.getElementById('image2'),document.getElementById('image3')];

AllImage = [];

function Image(name){
  this.nameImg = name;
  this.filepath = 'bm-img/' + name;
  this.shown = 0;
  this.clicked = 0;
  AllImage.push(this);
  console.log(this);
};
function createObj() {
  for (var i = 0; i < names.length; i++) {
    var newImg = new Image(names[i]);
  }
}
//Returns a random integer between min (included) and max (excluded)
//var random = Math.floor(Math.random() * (max - min)) + min;
function OutputImg(imgId) {
  var random = Math.floor(Math.random() * names.length);
  console.log(random);
  //using random to access array
  var shownImgPath = AllImage[random].filepath;
  console.log(shownImgPath);
  //assign path value to src
  imgId.src = shownImgPath;
}
//call function
createObj();
for (var j = 0 ; j < imageID.length ; j++ ) {
  OutputImg(imageID[j]);
  console.log(imageID[j]);
}

// // Returns a random integer between min (included) and max (excluded)
// function calcRandom (min, max){
//   var random = Math.floor(Math.random() * (max - min)) + min;
//   console.log(random);
//   //using random to access array
//   var shownImgPath = AllImage[random].filepath;
//   console.log(shownImgPath);
//   //assign path value to src
//   var shownImg = document.getElementById('image1');
//   //shownImg.innerHTML = '<img src="' + this.filepath + ' alt="' + this.nameImg + '" />';
//   shownImg.src = shownImgPath;
// };
// calcRandom(0, names.length);
