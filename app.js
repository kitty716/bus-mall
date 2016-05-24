var picContainer = document.getElementById('pic-container');
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var totalClicks = 0;
var allProducts = [];

var chartDrawn = false;
var votes = [];
var showns = [];
var picNames = ['bag','banana','bathroom','boots','breakfast','bubblegum', 'chair', 'cthulhu', 'dog_duck', 'dragon', 'pen', 'pet_sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water_can', 'wine_glass'];

function Product(name) {
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  this.path = 'img/' + name + '.jpg';
}
for (var i = 0; i < picNames.length; i++) {
  allProducts.push(new Product(picNames[i]));
}
function randNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function displayPics() {
  var leftIndex = randNum(0, allProducts.length);
  left.src = allProducts[leftIndex].path;
  left.alt = allProducts[leftIndex].name;
  allProducts[leftIndex].views += 1;
  // console.log(allProducts[leftIndex].name + ' has been shown ' + allProducts[leftIndex].views + ' times');

  var centerIndex = randNum(0, allProducts.length);
  while (centerIndex === leftIndex) {
    // console.log('duplicate found between center and left');
    var centerIndex = randNum(0, allProducts.length);
  }
  center.src = allProducts[centerIndex].path;
  center.alt = allProducts[leftIndex].name;
  allProducts[centerIndex].views += 1;
  // console.log(allProducts[centerIndex].name + ' has been shown ' + allProducts[centerIndex].views + ' times');

  var rightIndex = randNum(0, allProducts.length);
  while (rightIndex === leftIndex || rightIndex === centerIndex) {
    // console.log('duplicate found between center and left/right');
    var rightIndex = randNum(0, allProducts.length);
  }
  right.src = allProducts[rightIndex].path;
  right.alt = allProducts[leftIndex].name;
  allProducts[rightIndex].views += 1;
  // console.log(allProducts[rightIndex].name + ' has been shown ' + allProducts[rightIndex].views + ' times');
}

function updateChartArrays() {
  for (var i = 0; i < allProducts.length; i++) {
    votes[i] = allProducts[i].clicks;
    showns[i] = allProducts[i].views;
  }
}

function handlePicContainerClick() {
  // console.log(event.target);
  if(event.target.id === 'pic-container') {
    return alert ('CLICK DIRECTLY ON THE PICTURE !!!');
    // return alert and breakout function = no show on displayPics
  }
  // console.log(event.target.alt + ' was clicked');
  for (var i = 0; i < allProducts.length; i++) {
    if (event.target.alt === allProducts[i].name) {
      allProducts[i].clicks += 1;
      console.log(allProducts[i].name + ' has ' + allProducts[i].clicks + ' clicks');
    }
  }
  totalClicks += 1;
  if (totalClicks === 25) {
    picContainer.removeEventListener('click', handlePicContainerClick);
    document.getElementById('draw-chart').hidden = false;
    updateChartArrays();
  }
  displayPics();
}
// Chart!!! two data set: votes and showns
var data = {
  labels: picNames,
  datasets: [
    {
      data: votes,
      label: 'number of clicks',
      backgroundColor: 'blue',
      borderColor: 'blueviolet',
      borderWidth: 1,
      hoverBackgroundColor: 'purple',
      hoverBorderColor: 'black',
    }, {
      data: showns,
      label: 'number of product shown',
      backgroundColor: 'pink',
      borderColor: 'blueviolet',
      borderWidth: 1,
      hoverBackgroundColor: 'orangered',
      hoverBorderColor: 'black',
    }
  ]
};
function drawChart() {
  var ctx = document.getElementById('chart').getContext('2d');
  var voteChart = new Chart(ctx,{
    type: 'bar',
    data: data,
    options: {
      responsive: false
    }
  });
  chartDrawn = true;
}

function hideChart() {
  document.getElementById('chart').hidden = true;
}
document.getElementById('draw-chart').hidden = true;
document.getElementById('draw-chart').addEventListener('click', drawChart);
picContainer.addEventListener('click', handlePicContainerClick);
displayPics();
