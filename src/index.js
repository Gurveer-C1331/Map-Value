const electron = require("electron");

var global_data = electron.remote.getGlobal("data");
var chart;
var data;
var options;

google.charts.load('current', {
    'packages':['geochart'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyAWIaKJsVrtIJzDbOfdFzjzf7zI3rOZSPA'
  });
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
  data = google.visualization.arrayToDataTable(global_data);

  options = {
    legend: "none",
    defaultColor: "#F2F2F2",
    datalessRegionColor: "#F2F2F2",
    colorAxis: {colors: ["#F2F2F2", "2BAE66"]}
  };

  chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}

const menu_btn = document.getElementById("menu");
const exit_btn = document.getElementById("exit");
const ul = document.querySelector("ul");
menu_btn.addEventListener("click", function(event) {
    ul.classList.toggle("active");
    event.preventDefault();
});

exit_btn.addEventListener("click", function(event) {
    ul.classList.toggle("active");
    event.preventDefault();
});




