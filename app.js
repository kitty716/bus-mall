
var picContainer = document.getElementById('pic-container');
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var totalClicks = 0;
var allProducts = [];

var chartDrawn = false;
var votes = [];
var showns = [];
var rates = []; // clicks / views = rates
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

  var centerIndex = randNum(0, allProducts.length);
  while (centerIndex === leftIndex) {
    var centerIndex = randNum(0, allProducts.length);
  }

  center.src = allProducts[centerIndex].path;
  center.alt = allProducts[leftIndex].name;
  allProducts[centerIndex].views += 1;

  var rightIndex = randNum(0, allProducts.length);
  while (rightIndex === leftIndex || rightIndex === centerIndex) {
    var rightIndex = randNum(0, allProducts.length);
  }
  right.src = allProducts[rightIndex].path;
  right.alt = allProducts[leftIndex].name;
  allProducts[rightIndex].views += 1;
}

function updateChartArrays() {
  for (var i = 0; i < allProducts.length; i++) {
    votes[i] = allProducts[i].clicks;
    showns[i] = allProducts[i].views;
    rates[i] = parseFloat((votes[i] / showns[i] * 100).toFixed(2));
  }
}

function handlePicContainerClick() {
  if(event.target.id === 'pic-container') {
    return alert ('CLICK DIRECTLY ON THE PICTURE !!!'); // return alert and breakout function = no show on displayPics
  }
  for (var i = 0; i < allProducts.length; i++) {
    if (event.target.alt === allProducts[i].name) {
      allProducts[i].clicks += 1;
      //console.log(allProducts[i].name + ' has ' + allProducts[i].clicks + ' clicks');
    }
  }
  totalClicks += 1;
  localStorage.setItem('allData', JSON.stringify(allProducts));
  if (totalClicks === 25) {
    picContainer.removeEventListener('click', handlePicContainerClick);
    document.getElementById('draw-chart').hidden = false;
    updateChartArrays();
  }
  displayPics();
}
// Chart!!! two data set: votes and rates
var data1 = {
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
    },
  ]
};
var data2 = {
  labels: picNames,
  datasets: [
    {
      data: rates,
      label: 'rate of clicked over shown (%)',
      backgroundColor: 'pink',
      borderColor: 'blueviolet',
      borderWidth: 1,
      hoverBackgroundColor: 'orangered',
      hoverBorderColor: 'black',
    },
  ]
};
function drawChart() {
  var ctx1 = document.getElementById('chart1').getContext('2d');
  var ctx2 = document.getElementById('chart2').getContext('2d');
  var voteChart = new Chart(ctx1,{
    type: 'bar',
    data: data1,
    options: {
      responsive: false
    }
  });
  chartDrawn = true;
  document.getElementById('chart1').hidden = false;

  var rateChart = new Chart(ctx2,{
    type: 'bar',
    data: data2,
    options: {
      responsive: false
    }
  });
  chartDrawn = true;
  document.getElementById('chart2').hidden = false;
}

function hideChart() {
  document.getElementById('chart1').hidden = true;
  document.getElementById('chart2').hidden = true;
}

document.getElementById('draw-chart').hidden = true;
document.getElementById('draw-chart').addEventListener('click', drawChart);
picContainer.addEventListener('click', handlePicContainerClick);

(function(){
  if(localStorage.allData) {
    var lsData = JSON.parse(localStorage.getItem('allData'));
    for (var i = 0; i < allProducts.length; i++) {
      allProducts[i] = lsData[i];
    }
    displayPics();
    hideChart();
  } else {
    displayPics();
    hideChart();
  }
})();
