'use strict';

console.log('Aloha');

const hoursArray = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

const restTableElem = document.getElementById('restaurantProfiles');

const formElem = document.getElementById('addRestForm');

function Restaurants(location, minHourlyCust, maxHourlyCust, avgCookiePerCust){
  this.location = location;
  this.minHourlyCust = minHourlyCust;
  this.maxHourlyCust = maxHourlyCust;
  this.avgCookiePerCust = avgCookiePerCust;
  this.salesPerHour = [];
  Restaurants.allRestaurants.push(this);
}
Restaurants.allRestaurants = [];

Restaurants.prototype.genRandomCust = function(){
  return Math.floor(Math.random() * (this.maxHourlyCust - this.minHourlyCust + 1) + this.minHourlyCust);
}

Restaurants.prototype.calcSalesPerHour = function(){
  this.salesPerHour = []; // this resets the array value to 0 so that we don't double up on hourly totals.
  for (let i=0; i<hoursArray.length; i++){
    const thisHoursSale = Math.ceil(this.genRandomCust() * this.avgCookiePerCust);
    this.salesPerHour.push(thisHoursSale);
  }
}

Restaurants.prototype.renderRestaurant = function(tbodyElem){
  let dailyTotal = 0;
  const rowElem = makeElement('tr', tbodyElem, null);
  makeElement('th', rowElem, this.location);
  for (let i=0; i< this.salesPerHour.length; i++){
    const hourlyTotal = this.salesPerHour[i];
    const tdElem = document.createElement('td');
    tdElem.textContent = hourlyTotal;
    dailyTotal += hourlyTotal;
    rowElem.appendChild(tdElem);

  }
  makeElement('td', rowElem, dailyTotal);
}

function makeElement(tagName, parent, textContent){
  let element = document.createElement(tagName);
  if (textContent) {
    element.textContent = textContent;
  }
  parent.appendChild(element);
  return element;
}

function renderHeader(){
  const headerElem = makeElement('thead', restTableElem, null);
  const rowElem = makeElement('tr', headerElem, null);
  makeElement('td', rowElem, null);
  for (let i=0; i<hoursArray.length; i++){
    makeElement('th', rowElem, hoursArray[i]);
  }
  makeElement('th', rowElem, 'Daily Total');
}

function renderAllRest(){
  const bodyElem = makeElement('tbody', restTableElem, null)
  for (let i=0; i <Restaurants.allRestaurants.length; i++){
    let currentRest = Restaurants.allRestaurants[i];
    currentRest.calcSalesPerHour();
    currentRest.renderRestaurant(bodyElem);
  }
}

function renderFooter(){
  const tfootElem = makeElement('tfoot', restTableElem, null);
  const tfRowElem = makeElement('tr', tfootElem, null);
  makeElement('th', tfRowElem, 'Hourly Total');
  let grandTotal = 0;
  for(let i=0; i <hoursArray.length; i++){
    let hourlyTotal = 0;
    for(let index=0; index<Restaurants.allRestaurants.length; index++){
      hourlyTotal += Restaurants.allRestaurants[index].salesPerHour[i];
    }
    makeElement('th', tfRowElem, hourlyTotal);
    grandTotal += hourlyTotal;
  }
  makeElement('th', tfRowElem , grandTotal);
}

function handleSubmit (e){
  e.preventDefault();
  console.log(e);
  let location = e.target.city.value;
  let minHourlyCust = e.target.minCust.value;
  parseInt(minHourlyCust);
  let maxHourlyCust = e.target.maxCust.value;
  parseInt(maxHourlyCust);
  let avgCookiePerCust = e.target.aveCookie.value;
  parseInt(avgCookiePerCust);

  let newRest = new Restaurants(location, minHourlyCust, maxHourlyCust, avgCookiePerCust);
  newRest.genRandomCust();
  newRest.calcSalesPerHour();

  restTableElem.innerHTML = '';

  renderHeader();
  renderAllRest();
  renderFooter();

  e.target.reset();
}

formElem.addEventListener('submit', handleSubmit);

const Seattle = new Restaurants('Seattle', 23, 65, 6.3);
const Tokyo = new Restaurants('Tokyo', 3, 24, 1.2);
const Dubai = new Restaurants('Dubai', 11, 38, 3.7);
const Paris = new Restaurants('Paris', 20, 38, 2.3);
const Lima = new Restaurants('Lima', 2, 16, 4.6);

renderHeader();
renderAllRest();
renderFooter();

console.log('Pau');
