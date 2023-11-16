"use strict";
// Calculator functionality
const base_hotel = 180;
const base_per_diem = 35;

const roundUp100 = (num) => Math.ceil(num / 100) * 100; // Round to nearest 100
const roundUp10 = (num) => Math.ceil(num / 10) * 10; // Round to nearest 10

// Create a function for calculating flying
const calc_flying = function(people, days, nights, hours, cases) {
    const base_ticket = 1000; // Price for roundtrip ticket
    const cancellation_fee = 150;
    const base_ship = 100; // Price for shipping a case of tools (roundtrip)
    const base_car_rental = 100; // Price per day
    const base_hourly = 120; // Pay per hour of travel

    const travel_time = (base_hourly * hours) * people;
    const tickets = base_ticket * people;
    const flex = cancellation_fee * people; // Flexibility fee
    const shipping = base_ship * cases;

    const total_flight = roundUp100(travel_time) + tickets + flex + shipping;
    // console.log(`Total Flight Cost: ${total_flight}`);

    const car_rental = base_car_rental * days;

    const hotel = (base_hotel * nights) * people;
    const food = (base_per_diem * days) * people;

    const total = total_flight + car_rental + hotel + food;
    return total;
};

// const flight = calc_flying(2, 3, 2, 8, 2);
// console.log(`When flying, the cost comes out to be about: ${flight}`);



// Create a function for calculating driving 
const calc_driving = function(people, days, nights, hours, distance){
    const base_mileage = 0.655;
    const base_hourly = 120; // Pay per hour of travel

    const gas = base_mileage * distance; // Note: Distance should be roundtrip
    const travel_time = (base_hourly * hours) * people;
    const hotel = (base_hotel * nights) * people;
    const food = (base_per_diem * days) * people;

    const total = gas + roundUp10(travel_time) + hotel + food;
    return roundUp10(total);
}

// const drive = calc_driving(2,3,2,20,1220);
// console.log(`When driving, the cost comes out to be about ${drive}`);



// Page navigation
/*
TASKS:
    * Get response for tab click
    * Get input values in console on calculate click
    * Get results in console on calculate click
    * Get results on page on calculate click
    * Create error handling for input not entered
    * Create driving tab view

*/
// Get buttons from document

const tabs = document.querySelectorAll(".calc_tab");
const btnCalculate = document.querySelector("#btn--calculate");

// 1) Get response for tab click
tabs.forEach(tab => {
    tab.addEventListener('click', ()=> {
        console.log(tab);
    })
});

// inputs.forEach(input => {
//     console.log(input.id);
// })

// const getResults = function () {
//     const inputs = document.querySelectorAll(".input");

//     inputs.forEach(input => {
//         console.log(input.id, +input.value);
//     });
// }

const getResults = function () {
    const inputDays = document.querySelector('#inputDays');
    const inputNights = document.querySelector('#inputNights');
    const inputPeople = document.querySelector('#inputPeople');
    const inputHours = document.querySelector('#inputHours');
    const inputCases = document.querySelector('#inputCases');

    const total = calc_flying(+inputDays.value, +inputNights.value, +inputPeople.value, +inputHours.value, +inputCases.value);
    console.log(total);

    // Display total
    document.querySelector('#resultTotalCost').value = total;

    console.log(base_hotel * +inputNights.value);
    document.querySelector('#resultHotel').value = base_hotel * +inputNights.value;
    // document.querySelector('#resultTest').textContent = base_hotel * +inputNights.value;
}


// Get input values in console on calculate click
btnCalculate.addEventListener("click", (e) => {
    e.preventDefault();
    getResults();
})