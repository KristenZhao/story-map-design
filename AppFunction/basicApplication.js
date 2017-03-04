/* ================================
Midterm Project

Take a look at the midterm prototype: https://marvelapp.com/bf2c9h/screen/10434841
Try clicking on the "Next" and "Previous" buttons. This task will ask you to write some functions
that will enable us to write an application like in the midterm.

Write three functions: clickNextButton, clickPreviousButton, and saySlideName.
clickNextButton and clickPreviousButtons should simulate what will happen when someone clicks
on a next or previous button in your application.

You don't need to create HTML buttons or a useable application—this exercise is asking you to create
functions that will be used in your application. To test it out, try calling the functions in your
console. For example, try running: clickNextButton() and see what it does. Use lots of console logs!
================================ */
/* =====================
STEP 1 - Leaflet Configuration
===================== */
var map = L.map('map', {
  center: [39.97, -75.16],
  zoom: 11,
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* ===============================
STEP 2 - filter functions
==============================*/
var winterFilter = function(data){
  var condition;
  if (data.properties.CRASH_MONT === '12'||
      data.properties.CRASH_MONT === "1"||
      data.properties.CRASH_MONT === "2"){
    condition = true;
  } else {
    condition = false;
  }
  return condition;
};

var springFilter = function(data){
  var condition;
  if (data.properties.CRASH_MONT === '3'||
      data.properties.CRASH_MONT === "4"||
      data.properties.CRASH_MONT === "5"){
    condition = true;
  } else {
    condition = false;
  }
  return condition;
};

var summerFilter = function(data){
  var condition;
  if (data.properties.CRASH_MONT === '6'||
      data.properties.CRASH_MONT === "7"||
      data.properties.CRASH_MONT === "8"){
    condition = true;
  } else {
    condition = false;
  }
  return condition;
};

var fallFilter = function(data){
  var condition;
  if (data.properties.CRASH_MONT === '9'||
      data.properties.CRASH_MONT === "10"||
      data.properties.CRASH_MONT === "11"){
    condition = true;
  } else {
    condition = false;
  }
  return condition;
};

/* ===============================
STEP 3 -  set crash point data styles
==============================*/
// get geoJSON
var bikeCrash = "https://gist.githubusercontent.com/KristenZhao/f2f81e81ed6a47fdbad77b072ffc178f/raw/c9df3da2ad89e9cc44c0f949a35bfc42426c659d/BikeCrash2014Simplified.json";
// set "all" style
var geojsonMarkerOptions = {
    radius: 3,
    fillColor: "#ff7800",
    color: "#eeeeee",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

// set "winter" style
var geojsonMarkerOption_Winter = {
    radius: 3,
    fillColor: "#2155a8",
    color: "#eeeeee",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

// set "spring" style
var geojsonMarkerOption_Spring = {
    radius: 3,
    fillColor: "#4a8e15",
    color: "#eeeeee",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

// set "summer" style
var geojsonMarkerOption_Summer = {
    radius: 3,
    fillColor: "#baa92a",
    color: "#eeeeee",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

// set "fall" style
var geojsonMarkerOption_Fall = {
    radius: 3,
    fillColor: "#f43206",
    color: "#eeeeee",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

// set overlay style, a function that color crashes based on their season
var geojsonMarkerOption_overlay = function(data){
  var month = data.properties.CRASH_MONT;
  var render;
  if (month === '12'||month === "1"||month === "2"){
    render = {radius: 3,
                  fillColor: "#2155a8",
                  color: "#eeeeee",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.8};
  } else if (month === '3'||month === "4"||month === "5") {
      render = {
        radius: 3,
        fillColor: "#4a8e15",
        color: "#eeeeee",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };
  } else if (month === '6'||month === "7"||month === "8") {
      render = {
        radius: 3,
        fillColor: "#baa92a",
        color: "#eeeeee",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };
  } else if (month === '9'||month === "10"||month === "11") {
      render = {
        radius: 3,
        fillColor: "#f43206",
        color: "#eeeeee",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
  } else {
      render = {
        radius: 3,
        fillColor: "#aaaaaa",
        color: "#eeeeee",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };
    } return render;
};
/* ===============================
STEP 4 - state object: information on each slide
==============================*/
var state = {
  "slideNumber": 0, // slideNumber keeps track of what slide you are on. It should increase when you
                    // click the next button and decrease when you click the previous button. It
                    // should never get so large that it is bigger than the dataset. It should never
                    // get so small that it is smaller than 0.
  "slideData": [
    {
      "name": "All crashes that involved with bike and cars", //<h2>
      "content": "There are 551 crashes in 2014. The majority of accidents happened " +
      "in the Center City and the University City area.", //<p>
      "page": "1 of 6"
      // "mapPoint" : function (data){
      //           data.addTo(map);
      //         //map.removeLayer(allPoint);
      //         //return allPoint;
      //         console.log("map data function ran");
      //       },
      // "removePoint" : function(data){
      //             map.removeLayer(data);
      //             console.log("removePoint ran");
    },
    {
      "name": "Winter months (Dec,Jan,Feb)",
      "content": "In winter, bike crashes are a little concentrated in the Univer" +
      "sity city area, but there there are not many accidents in general.",
      "page": "2 of 6",
      // "mapPoint" : function (data){
      //           data.addTo(map);
      //         },
      // "removePoint" : function(data){
      //           map.removeLayer(data);
      //           console.log("removePoint winter ran");

    },
    {
      "name": "Spring months (Mar,Apr,May)",
      "content": "In spring, crash number start to increase. Many happened again in "+
      "University City, center city and south philly area.",
      "page": "3 of 6"
    },
    {
      "name": "Summer months (Jun,Jul,Aug)",
      "content": "In summer, crash counts really boomed. Accidents are everywhere. A lot "+
      "of increase in Northern Liberty area.",
      "page": "4 of 6"
    },
    {
      "name": "Fall months(Sep,Oct,Nov)",
      "content": "In fall, accidents remain high, but got more concentrated in center city "+
      "area again, retrieved from nearby neighborhoods.",
      "page": "5 of 6"
    },
    {
      "name": "Bike Crash Conclusion",
      "content": "In colder weathers, there are much less accidents. I wonder if it relates to "+
      "people's biking habbit: less people bike in cooler temperature, therefore less accidents. "+
      "But it is also worth noticing that crashes happen is same regions. Bike infrastructure "+
      "improvement can be considered.",
      "page": "6 of 6"
    }
  ]
};

/* ===============================
STEP 5 - button functions
==============================*/
// 1. clickNextButton allows people to click to the next page, but when user gets to
// the last page, it will disable the button.
var clickNextButton = function() {
  state.slideNumber += 1;
  if (state.slideNumber < state.slideData.length-1){
    console.log('state.slideNumber: '+state.slideNumber);
    console.log("content "+state.slideData[state.slideNumber].name);
    $("#back").prop("disabled",false);
    $("#back-to-initial").prop("disabled",false);
  } else{
    console.log('state.slideNumber: '+state.slideNumber);
    console.log("content "+state.slideData[state.slideNumber].name);
    console.log('reached last page!');
    $("#next").prop("disabled",true);
    $("#to-the-end").prop("disabled",true);
  }
  var pageState = [
    $(".subtitle").text(state.slideData[state.slideNumber].name),
    $(".description").text(state.slideData[state.slideNumber].content),
    $(".page").text("page: " +state.slideData[state.slideNumber].page),
  ];
  return (pageState);
};

// 2. clickPreviousButton allows people to click to the previous page, but when user gets to
// the last page, it will disable the button.
var clickPreviousButton = function() {
  state.slideNumber -=1;
  if (state.slideNumber > 0){
    console.log("state.slideNumber: "+state.slideNumber);
    console.log("content: "+state.slideData[state.slideNumber].name);
    $("#next").prop("disabled",false);
    $("#to-the-end").prop("disabled",false);
  } else{
    console.log('reached first page!');
    console.log("content "+state.slideData[state.slideNumber].name);
    $("#back").prop("disabled",true);
    $("#back-to-initial").prop("disabled",true);
  }
  var pageState = [
    $(".subtitle").text(state.slideData[state.slideNumber].name),
    $(".description").text(state.slideData[state.slideNumber].content),
    $(".page").text("page: " +state.slideData[state.slideNumber].page)
  ];
  return (pageState);
};

// 3. theEndButton allows people to click to the last page, and it will disable the button.
var theEndButton = function(){
    state.slideNumber = state.slideData.length-1;
    console.log('state number:'+state.slideData[state.slideNumber].name);
    $("#next").prop("disabled",true);
    $("#to-the-end").prop("disabled",true);
    $("#back").prop("disabled",false);
    $("#back-to-initial").prop("disabled",false);
    var pageState = [
      $(".subtitle").text(state.slideData[state.slideNumber].name),
      $(".description").text(state.slideData[state.slideNumber].content),
      $(".page").text("page: " +state.slideData[state.slideNumber].page)
    ];
    return (pageState);
};

// 4. theFrontButton allows people to click to the first page, and it will disable the button.
var theFrontButton = function(){
    state.slideNumber = 0;
    console.log('state number:'+state.slideData[state.slideNumber].name);
    $("#next").prop("disabled",false);
    $("#to-the-end").prop("disabled",false);
    $("#back").prop("disabled",true);
    $("#back-to-initial").prop("disabled",true);
    var pageState = [
      $(".subtitle").text(state.slideData[state.slideNumber].name),
      $(".description").text(state.slideData[state.slideNumber].content),
      $(".page").text("page: " +state.slideData[state.slideNumber].page)
    ];
    return (pageState);
    //return ($(".description").text("page number: "+state.slideNumber));
};

/* ===============================
STEP 6 - Execution /////////////////
==============================*/

$(document).ready(function() {
    $.ajax(bikeCrash).done(function(data){
      //console.log(data);
      /* ===============================
      Part 0 - Import geoJSON data and parse it
      ==============================*/
      var parsedCrash = JSON.parse(data);
      var crashFeatures = parsedCrash.features;
      //console.log(crashFeatures[0].geometry.coordinates);

      /* ===============================
      Part 1 - add a Point property to the state object, which stores the points
      need to be displayed
      ==============================*/

      state.slideData[0].Point = L.geoJson(crashFeatures, {
      pointToLayer: function (point,style) {
      //console.log("index", index);
        return L.circleMarker([point.geometry.coordinates[1],point.geometry.coordinates[0]], geojsonMarkerOptions);
        }
      });

      state.slideData[1].Point = L.geoJson(crashFeatures, {
        filter: winterFilter,
        pointToLayer: function (point,style) {
        //console.log("index", index);
          return L.circleMarker([point.geometry.coordinates[1],point.geometry.coordinates[0]], geojsonMarkerOption_Winter);
        }
      });

      state.slideData[2].Point = L.geoJson(crashFeatures, {
        filter: springFilter,
        pointToLayer: function(point,style){
          return L.circleMarker([point.geometry.coordinates[1],point.geometry.coordinates[0]], geojsonMarkerOption_Spring);
        }
      });

      state.slideData[3].Point = L.geoJson(crashFeatures, {
        filter: summerFilter,
        pointToLayer: function(point,style){
          return L.circleMarker([point.geometry.coordinates[1],point.geometry.coordinates[0]], geojsonMarkerOption_Summer);
        }
      });

      state.slideData[4].Point = L.geoJson(crashFeatures, {
        filter: fallFilter,
        pointToLayer: function(point,style){
          return L.circleMarker([point.geometry.coordinates[1],point.geometry.coordinates[0]], geojsonMarkerOption_Fall);
        }
      });

      state.slideData[5].Point = L.geoJson(crashFeatures, {
      pointToLayer: function (point,style) {
        return L.circleMarker([point.geometry.coordinates[1],point.geometry.coordinates[0]], geojsonMarkerOption_overlay(point));
        }
      });

      /* ===============================
      Part 2 - set up initial page by providing contents and proper buttons
      ==============================*/
      $(".subtitle").text(state.slideData[0].name);
      $(".description").text(state.slideData[0].content);
      $(".page").text("page: " +state.slideData[0].page);
      state.slideData[0].Point.addTo(map);
      //map.removeLayer(state.slideData[0].Point);

      $("#back").prop("disabled",true);
      $("#back-to-initial").prop("disabled",true);
      console.log(state.slideNumber);
      //$(".description").text("page number: "+state.slideNumber); //?? why cannot print slideNumber?? need to use + not ,!!

      /* ===============================
      Part 3 - set up button events to allow user interaction
      once a button is clicked, it will remove previous map and load the new one
      ==============================*/
      $("#next").click(function(ev){
        map.removeLayer(state.slideData[state.slideNumber].Point);
        clickNextButton();
        state.slideData[state.slideNumber].Point.addTo(map);
        //console.log("both button are working!");
      });
      $("#back").click(function(event){
        map.removeLayer(state.slideData[state.slideNumber].Point);
        clickPreviousButton();
        state.slideData[state.slideNumber].Point.addTo(map);
      });
      $("#to-the-end").click(function(event){
        map.removeLayer(state.slideData[state.slideNumber].Point);
        theEndButton();
        state.slideData[state.slideNumber].Point.addTo(map);
      });
      $("#back-to-initial").click(function(event){
        map.removeLayer(state.slideData[state.slideNumber].Point);
        theFrontButton();
        state.slideData[state.slideNumber].Point.addTo(map);
      });
  });
});
