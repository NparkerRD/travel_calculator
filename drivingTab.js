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
const calc_driving = function(days, nights, people, hours, distance){
    const mileage_cost = 0.655;

    const hotel = hotel_per_night * nights;
    const food = per_diem_per_day * days;
    const travel_time = roundUp100(hourly_pay * hours);
    const gas = roundUp10(mileage_cost * distance);

    const total = ((hotel + food + travel_time) * people) + gas;
    return [total, hotel, food, travel_time, gas];    
}

// Page navigation
// Get buttons from document

const tabs = document.querySelectorAll(".calc_tab");
const btnCalculate = document.querySelector("#btn--calculate");

// 1) Get response for tab click
tabs.forEach(tab => {
    tab.addEventListener('click', ()=> {
        console.log(tab);
        if (!tab.classList.contains('active')){
            document.querySelector('.active').classList.remove('active');
            tab.classList.add('active');
        }
    })
});


const getResults2 = function () {
    // Getting input elements
    const [inputDays, 
           inputNights,
           inputPeople, 
           inputHours, 
           inputDistance] = document.querySelectorAll(".input");

    // Getting result elements 
    const [resultTotal, 
           resultHotel,
           resultFood, 
           resultTravelTime,
           resultGas] = document.querySelectorAll(".result");
    
    const [total, hotel, food, travelTime, gas] = calc_driving(+inputDays.value, +inputNights.value, +inputPeople.value, +inputHours.value, +inputDistance.value);
    
    updateText(resultTotal, total);
    updateText(resultHotel, hotel);
    updateText(resultFood, food);
    updateText(resultTravelTime, travelTime);
    updateText(resultGas, gas);
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