"use strict";

/*
Program: Travel Calculator

Objectives:
    * Build a calculator that takes in a number of people and returns the cost
    * Cost will include hotel, flight and/or mileage, car rental, and per diem
    * POSSIBILITY: Also calculate installation cost based on components on door, and cabling
    * Input number of days and nights to get all calculations



*/

// CONSTANTS
const base_hotel = 180; // Hotel - per night
const base_pd = 35; // Per Diem - per day

// For flying
const base_ft = 500; // Flight Ticket - For ONE way only
const base_cf = 150; // Cancellation Fee
const base_cr = 100; // Car Rental - per day
const base_ts = 50; // Tool Shipping - For one way only
const round_ft = base_ft * 2; // Flight ticket - Roundtrip

// For driving
const base_mileage = .65;


// VARIABLES
let per_diem,
    hotel,
    flight,
    tool_shipping,
    cancellation_fee,
    car_rental,
    people_count,
    milleage,
    daily_cost


// Calculate daily/nightly costs for ONE person
const basic_calc_daily = (days, nights) => {
    per_diem = base_pd * days;
    hotel = base_hotel * nights;
}

// Calculate the daily/nightly costs for ONE person, when flying
const flight_daily = (days, cases) => {
    tool_shipping = base_ts * cases;
    car_rental = base_cr * days;
}

