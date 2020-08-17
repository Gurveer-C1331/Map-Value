const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
const ipc = electron.ipcRenderer;

var global_data = electron.remote.getGlobal("data");
var chart;
var data;
var options;
var country_selected;

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
    datalessRegionColor: "#0", //#F2F2F2
    colorAxis: {colors: ["#F2F2F2", "2BAE66"]}
  };

  chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  //sets the country_selected variable to the country selected by the user
  google.visualization.events.addListener(chart, "select", function(event){
    var selection = chart.getSelection();
    if (selection.length) {
        country_selected = data.getValue(selection[0].row, 0);
    }
  });

  chart.draw(data, options);
}

const menu_btn = document.getElementById("menu");
const exit_btn = document.getElementById("exit");
const ul = document.querySelector("ul");
menu_btn.addEventListener("click", function(event) { //menu display
    ul.classList.toggle("active");
    event.preventDefault();
});

exit_btn.addEventListener("click", function(event) { //menu don't display
    ul.classList.toggle("active");
    event.preventDefault();
});

const setValue_btn = document.getElementById("button");
setValue_btn.addEventListener("click", function(event) {  //create new window
  let win = new BrowserWindow ({
      width: 400,
      height: 150,
      frame: false,
      alwaysOnTop: true,
      resizable: true,
      webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
      }
    });
    win.on("close", function() {
        win = null 
    });
    win.loadFile("src/add.html");
    //win.webContents.openDevTools();
    win.show();
});

//recieve the message sent by main.js
ipc.on("region_value", function(event, arg){
  //remove country's original data
  data.removeRow(data.getFilteredRows([{column: 0, value: country_selected}])[0]);
  data.addRow([country_selected, parseInt(arg)]); //add the new data
  chart.draw(data, options);

  var data_array = [["Country", "Population"]];
  for(i = 0; i < data.clone().fg.length; i++){
    data_array[i+1] = data.clone().fg[i];
  }

  //sends the updated data (to main.js)
  ipc.send("update_data",  data_array);
});
