"use strict";
const servicePeriods = {
  'small': {title:'small', period: 10},
  'medium': {title:'medium', period: 20},
  'large': {title:'large', period: 30},
  'email/password sign up': {title:'email/password sign up', period:2},
  'third party login': {title:'third party login', period:3},
  'user invitation emails': {title:'user invitation emails', period:3},
  'multi-tenant accounts': {title:'multi-tenant accounts', period:7},
  'dashboard': {title:'dashboard', period:5},
  'activity feed': {title:'activity feed', period:4},
  'file uploading': {title:'file uploading', period:30},
  'activity feed': {title:'activity feed', period:4},
  'file uploading': {title:'file uploading', period:2},
  'tags': {title:'tags', period:3},
  'free text searching': {title:'free text searching', period:5},
  'ratings/reviews': {title:'ratings/reviews', period:4},
  'calendering': {title:'calendering', period:5},
  'display of map data/geolocation':{title:'display of map data/geolocation', period:4}
};

let selectedServices = {};
let dayRate = 80;

$(document).ready(function(){

(function(){

  $(".service-item").click(function (e) { 
    e.preventDefault();
    toggleItemSelection(this);    
    setTotalCost(calculateTotalCost(selectedServices, dayRate));
    setTotalPeriod(calculateTotalPeriod(selectedServices));
  });

  function toggleItemSelection(item){
    $(item).toggleClass("selected-success rounded");

    let serviceTitle = ($(item)[0].children[1].innerText).toLowerCase();
    if (selectedServices[serviceTitle]== (null || undefined)){
      addServiceToEstimate(getServiceItem(serviceTitle));
    }
    else {
      removeServiceFromEstimate(getServiceItem(serviceTitle));
    }

  }

  function addServiceToEstimate(serviceItem){
    selectedServices[serviceItem.title] = serviceItem;
  }
  function removeServiceFromEstimate(serviceItem){
    delete selectedServices[serviceItem.title];
  }

  function getServiceItem(serviceTitle){
    return servicePeriods[serviceTitle];
  }
  function calculateTotalCost(services, dayRate){
    let totalCost = (calculateTotalPeriod(services)) * dayRate;
    return totalCost;
  }

  function calculateTotalPeriod(services){
    let serviceItems = services;
    let periodTotal = 0;
    for (let service in serviceItems) { 
      periodTotal+= serviceItems[service].period;
    };
    return periodTotal;
  }

  function setTotalCost(cost){
    $("#total-cost")[0].innerText = cost;
  }

  function setTotalPeriod(period){
    $("#developer-days")[0].innerText = period;
  }
})();
});