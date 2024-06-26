"use strict";

// GLOBAL CONSTANTS
const hotel_per_night = 180;
const per_diem_pay = 35;
const hourly_pay = 120;

// DOCUMENT ELEMENTS
const tabs = document.querySelectorAll(".calc_tab");
const btnCalculate = document.querySelector("#btn--calculate");
const elInputFields = document.querySelector('.calc_inputs');
const elResults = document.querySelector('.calc_breakdown');
let activeTab = document.querySelector('.active');

// HTML for switching tabs
const drivingInputGroup = `
<div id="input--distance" class="input_group">
    <label class="tooltip_container" for="inputDistance">
        <span class="tooltip_text">Enter the number of miles that will be traveled going <b><i>one way</i></b></span>
        Distance
    </label>
    <input class="input input--driving" type="number" name="inputDistance" id="inputDistance">
</div>

<div id="input--cars" class="input_group">
    <label class="tooltip_container" for="inputCars">
        <span class="tooltip_text">Enter the number of cars that will be traveling</span>
        Cars
    </label>
    <input class="input input--driving" type="number" name="inputCars" id="inputCars">
</div>
`;
const flyingInputGroup = `<div id="input--cases" class="input_group">
<label class="tooltip_container" for="inputCases">
    <span class="tooltip_text">Enter the number of tool cases to be shipped</span>
    Cases
</label>
<input class="input input--flying" type="number" name="inputCases" id="inputCases">
</div>`;

const drivingResultGroup = `<div class="result_group" id="result--gas">
<p class="label">Gas (per car)</p>
<div class="result result--driving" id="resultGas"></div>
</div>`;
const flyingResultGroups = `<div class="result_group" id="result--tickets">
<p class="label">Tickets (per person)</p>
<div class="result result--flying" id="resultTickets"></div>
</div>
<div class="result_group" id="result--shipping">
<p class="label">Shipping (per case)</p>
<div class="result result--flying" id="resultShipping"></div>
</div>
<div class="result_group" id="result--carRental">
<p class="label">Car Rental (per day)</p>
<div class="result result--flying" id="resultCarRental"></div>
</div>`;

// SIMPLE FUNCTIONS
const roundUp100 = (num) => Math.ceil(num / 100) * 100; // Round up to the nearest 100
const roundUp10 = (num) => Math.ceil(num / 10) * 10; // Round up to the nearest 10
const updateText = (el, content) => el.textContent = content.toLocaleString('en-us'); // Update and format text content
const checkElExists = (el) => el ? el : false; // Check if a document element exists

// CALCULATOR FUNCTIONS

// Calculate cost based on flying
const calc_flying = function(days, nights, people, hours, cases) {
    const ticket_cost = 1000 + 150; // Roundtrip price for ticket + cancellation fee
    const ship_per_case = 100; // Cost of shipping ONE case of tools
    const car_per_day = 100; // Cost of renting a car per day

    const hotel = hotel_per_night * nights;
    const food = per_diem_pay * days;
    const ticket = ticket_cost;
    const travel_time = roundUp100(90 * (hours * 2));
    // const travel_time = roundUp100(hourly_pay * (hours * 2));
    const shipping = ship_per_case * cases;
    const car_rental = car_per_day * days;

    const total = ((hotel + food + ticket + travel_time) * people) + shipping + car_rental;
    return [total, hotel, food, travel_time, ticket, ship_per_case, car_per_day];
}

// Calculate cost based on driving
const calc_driving = function(days, nights, people, hours, distance, cars){
    const mileage_cost = 0.655;

    const hotel = hotel_per_night * nights;
    const food = per_diem_pay * days;
    const travel_time = roundUp100(90 * (hours * 2)); // Accounts for roundtrip; user only needs to enter hours going one way
    const gas = roundUp10(mileage_cost * (distance * 2)); // Accounts for roundtrip; user only needs to enter miles going one way

    // const total = ((hotel + food + travel_time) * people) + gas;
    const total = ((hotel + food + travel_time) * people) + (gas * (cars ? cars : 1));
    return [total, hotel, food, travel_time, gas];
}

const clearCalc = () => {
    const inputs = document.querySelectorAll('.input');
    const results = document.querySelectorAll('.result');
    inputs.forEach((input) => input.value = '')
    results.forEach((result) => result.textContent = '');
}

tabs.forEach(tab => {
    tab.addEventListener('click', ()=> {
        // Clear out everything
        clearCalc();

        // Toggle active tab
        if (!tab.classList.contains('active')){
            activeTab.classList.remove('active');
            tab.classList.add('active');
            activeTab = tab;
        }

        // Swap out inputs and results
        const inputGroupCases = checkElExists(document.querySelector('#input--cases'));
        const inputGroupDistance = checkElExists(document.querySelector('#input--distance'));
        const inputGroupCars = checkElExists(document.querySelector('#input--cars'));
        
        const resultGroupTickets = checkElExists(document.querySelector('#result--tickets'));
        const resultGroupShipping = checkElExists(document.querySelector('#result--shipping'));
        const resultGroupCarRental = checkElExists(document.querySelector('#result--carRental'));
        const resultGroupGas = checkElExists(document.querySelector('#result--gas'));

        if (activeTab.id === 'tab--driving'){
            // Update driving input fields
            if (inputGroupCases) inputGroupCases.remove();
            if (!inputGroupDistance) elInputFields.insertAdjacentHTML('beforeend', drivingInputGroup);

            // Update driving result fields
            if(resultGroupTickets && resultGroupShipping && resultGroupCarRental) {
                resultGroupTickets.remove();
                resultGroupShipping.remove();
                resultGroupCarRental.remove();
            };
            if (!resultGroupGas) elResults.insertAdjacentHTML('beforeend', drivingResultGroup);

        } else if (activeTab.id === 'tab--flying') {
            // Update flying input fields
            if(inputGroupDistance) inputGroupDistance.remove();
            if(inputGroupCars) inputGroupCars.remove();
            if (!inputGroupCases) elInputFields.insertAdjacentHTML('beforeend', flyingInputGroup);

            // Update flying result fields
            if (resultGroupGas) resultGroupGas.remove();
            if (!resultGroupTickets && !resultGroupShipping && !resultGroupCarRental) {
                elResults.insertAdjacentHTML('beforeend', flyingResultGroups);
            }
        }
    })
});

const getResults = () => {
    // Constant input elements
    const [inputDays, 
           inputNights, 
           inputPeople, 
           inputHours] = document.querySelectorAll(".input");

    // Constant result elements
    const [resultTotal, 
           resultHotel, 
           resultFood, 
           resultTravelTime] = document.querySelectorAll(".result");

    if (activeTab.id === 'tab--flying') {
        // const inputCases = checkElExists(document.querySelector('#inputCases'));
        const inputCases = document.querySelector('#inputCases');
        const [resultTickets, resultShipping, resultCarRental] = document.querySelectorAll('.result--flying');
        const [total, hotel, food, travelTime, ticket, shipping, carRental] = calc_flying(+inputDays.value, +inputNights.value, +inputPeople.value, +inputHours.value, +inputCases.value);

        // Display results for flying
        updateText(resultTotal, total);
        updateText(resultHotel, hotel);
        updateText(resultFood, food);
        updateText(resultTravelTime, travelTime);
        updateText(resultTickets, ticket);
        updateText(resultShipping, shipping);
        updateText(resultCarRental, carRental);
    }

    if (activeTab.id === 'tab--driving') {
        const inputDistance = document.querySelector('#inputDistance');
        const inputCars = document.querySelector('#inputCars');
        const [resultGas] = document.querySelectorAll(".result--driving");

        const [total, hotel, food, travelTime, gas] = calc_driving(+inputDays.value, +inputNights.value, +inputPeople.value, +inputHours.value, +inputDistance.value, +inputCars.value);

        // Display results for driving
        updateText(resultTotal, total);
        updateText(resultHotel, hotel);
        updateText(resultFood, food);
        updateText(resultTravelTime, travelTime);
        updateText(resultGas, gas);
    }
}

btnCalculate.addEventListener('click', () => getResults())
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getResults();
    if (e.key === 'c' || e.key === 'C') clearCalc();
})

