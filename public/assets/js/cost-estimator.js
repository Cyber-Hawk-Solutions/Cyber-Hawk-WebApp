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
let dayRate = 100;

$(document).ready(function(){

(function(){

  $(".service-item").click(function (e) { 
    e.preventDefault();
    toggleItemSelection(this);    
    setTotalCost(calculateTotalCost(selectedServices, dayRate));
    setTotalPeriod(calculateTotalPeriod(selectedServices));
  });

  $("#send-estimate").click(function (e){
    sendEstimate();
  });

  $("#save-estimate").click(function (e){
    let userId = $(this).attr("userid");
    if (userId != ( "" && null && undefined)){
      saveEstimate(userId);
    }
  });

  function saveEstimate(userId){
    let estimate = getFullEstimate();
    estimate.userId = userId;

    if (estimate.services.length > 0){
      $.post("api/invoice/", estimate, function(res){
          showInvoiceSentMessage();
      });
    }
  }

  function sendEstimate(){
    let email = getEstimateEmail();
    let estimate = getFullEstimate();
    estimate.email = email;
    if (estimate.services.length > 0){
      $.post("api/email/estimate", estimate, function(res){
        if (res.isSent){
          showEmailSentMessage();
        }
        else {
          showEmailFailedMessage();
        }
      });
    }
  }

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

  function getFullEstimate(){
    let services = getSelectServicesList(selectedServices);
    let cost = calculateTotalCost(selectedServices, dayRate);
    let period = calculateTotalPeriod(selectedServices);
    let estimate = {
      "services": services,
      "cost": cost,
      "period": period
    }

    return estimate;
  }

  function addServiceToEstimate(serviceItem){
    selectedServices[serviceItem.title] = serviceItem;
  }

  function getSelectServicesList(serviceItems){
    let serviceList = [];

    for (let service in serviceItems) { 
      serviceList.push(serviceItems[service])
    };

    return serviceList;
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

  function getEstimateEmail(){
    return ($("#estimate-email")[0].value).trim();
  }

  function showEmailSentMessage(){
    $("#email-sent-message").innerText = "Estimate sent";
    $("#email-sent-message").removeClass("hidden");
  }

  function showEmailSentMessage(){
    $("#email-sent-message.text-success").removeClass("hidden");
    $("#email-sent-message.text-danger").addClass("hidden");
  }

  function showEmailFailedMessage(){
    $("#email-sent-message.text-danger").removeClass("hidden");
    $("#email-sent-message.text-success").addClass("hidden");

  }

  function showInvoiceSentMessage(){
    $("#save-estimate").text("Estimate saved");
    $("#save-estimate").attr("userId", "")
    $("#save-estimate").attr("disabled", "")
  }

})();
});