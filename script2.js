"use strict";
// Calculator functionality
const hotel_per_night = 180;
const per_diem_per_day = 35;
const hourly_pay = 120;

// Simple functions
const roundUp100 = (num) => Math.ceil(num / 100) * 100; // Round to nearest 100
const roundUp10 = (num) => Math.ceil(num / 10) * 10; // Round to nearest 10
const updateText = (el, content) => el.textContent = content.toLocaleString('en-us');


// Create a function for calculating driving 
const calc_driving = function(people, days, nights, hours, distance){
    const base_mileage = 0.655;
    const base_hourly = 120; // Pay per hour of travel

    const gas = base_mileage * distance; // Note: Distance should be roundtrip
    const travel_time = (base_hourly * hours) * people;
    const hotel = (hotel_per_night * nights) * people;
    const food = (per_diem_per_day * days) * people;

    const total = gas + roundUp10(travel_time) + hotel + food;
    return roundUp10(total);
}

// const drive = calc_driving(2,3,2,20,1220);
// console.log(`When driving, the cost comes out to be about ${drive}`);



// Page navigation
// Get buttons from document

const tabs = document.querySelectorAll(".calc_tab");
const btnCalculate = document.querySelector("#btn--calculate");

// 1) Get response for tab click
tabs.forEach(tab => {
    tab.addEventListener('click', ()=> {
        console.log(tab);
    })
});


// Function to give individual results
// Return individiaul values?
const calc_flying2 = function(days, nights, people, hours, cases) {
    const ticket_cost = 1000 + 150; // Roundtrip price for ticket + cancellation fee
    const ship_per_case = 100; // Cost of shipping ONE case of tools
    const car_per_day = 100; // Cost of renting a car per day

    const hotel = hotel_per_night * nights;
    const food = per_diem_per_day * days;
    const ticket = ticket_cost;
    const travel_time = roundUp100(hourly_pay * hours);
    const shipping = ship_per_case * cases;
    const car_rental = car_per_day * days;

    const total = ((hotel + food + ticket + travel_time) * people) + shipping + car_rental;
    return [total, hotel, food, ticket, travel_time, ship_per_case, car_per_day];
    
}

// To be used with the test/new function calc_flying2
// Testing out destructuring
const getResults2 = function () {
    // Getting input elements
    const [inputDays, 
           inputNights,
           inputPeople, 
           inputHours, 
           inputCases] = document.querySelectorAll(".input");

    // Getting result elements 
    const [resultTotal, 
           resultHotel,
           resultFood, 
           resultTickets, 
           resultTravelTime, 
           resultShipping, 
           resultCarRental] = document.querySelectorAll(".result");
    
    const [total, hotel, food, ticket, travelTime, shipping, carRental] = calc_flying2(+inputDays.value, +inputNights.value, +inputPeople.value, +inputHours.value, +inputCases.value);
    
    updateText(resultTotal, total);
    updateText(resultHotel, hotel);
    updateText(resultFood, food);
    updateText(resultTickets, ticket);
    updateText(resultTravelTime, travelTime);
    updateText(resultShipping, shipping);
    updateText(resultCarRental, carRental);
    
}

// Get input values in console on calculate click
btnCalculate.addEventListener("click", (e) => {
    e.preventDefault();
    getResults2();
})


/*
TASKS:
    * Get response for tab click
    * Get input values in console on calculate click
    * Get results in console on calculate click
    * Get results on page on calculate click
    * Create error handling for input not entered
    * Create driving tab view
    * 
LATER:
    * Add commas to numbers
    * Add clear function/button
    * Make sure 'People' and 'Hours' are always valid; don't allow 0

*/