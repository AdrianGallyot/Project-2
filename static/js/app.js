// Append the Drop down list with all the otu_ids on page load
function init() {
  d3.csv("../data/Countries.csv").then((data) => {
  let dropdown = document.getElementById('selDataset');
  dropdown.length = 0;

  let defaultOption = document.createElement('option');
  defaultOption.text = 'Select';

  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;
  let option;
    for (let i = 0; i < data.length; i++) {
      option = document.createElement('option');
      option.text = data[i].country_name;
      option.value = data[i].CountryID;
      dropdown.add(option);
    }
  });
}

function optionChanged(country){

  d3.csv("../data/CountryCity.csv").then((data) => {
  
  console.log(data);

  // var resultsArray = countries.filter(CountryCity => CountryCity.CountryID == country);

  var filteredData = data.filter(function(d) 
{ 

        if( d["CountryID"] == country)
        { 
            return d.city_name;
        } 

    })

  console.log(filteredData);

  var KeyCities = filteredData.map(function(c){
    return{
      city: c.city_name
    }
  });

  var cities = [];

  for (var i = 0; i < filteredData.length ; i++){
      cities.push(KeyCities[i].city);
      console.log(KeyCities[i].city);
     }

  console.log(cities);

  d3.csv("../data/Countries.csv").then((C) => {

    console.log(C);
  
    // var resultsArray = countries.filter(CountryCity => CountryCity.CountryID == country);
  
    var filteredCountry = C.filter(function(d) 
  { 
  
          if( d["CountryID"] == country)
          { 
              return d;
          } 
  
      });
      console.log(filteredCountry);
  
      var KeyData = filteredCountry.map(function(k){
        return{
          population: k.Population,
          gdp: k.GDP,
          incomeID: k.Income_id,
          RegionID: k.region_id,
          CountryName: k.country_name
        }
      });

      var Cpopulation = [];

      for (var i = 0; i < filteredCountry.length ; i++){
          Cpopulation.push(KeyData[i].population);
          console.log(KeyData[i].population);
         }
    
      console.log(Cpopulation);

      var CGDP = [];

      for (var i = 0; i < filteredCountry.length ; i++){
          CGDP.push(KeyData[i].gdp);
          console.log(KeyData[i].gdp);
         }
    
      console.log(CGDP);

      var RegID = [];

      for (var i = 0; i < filteredCountry.length ; i++){
          RegID.push(KeyData[i].RegionID);
          console.log(KeyData[i].RegionID);
         }
    
      console.log(RegID);

      var IncID = [];

      for (var i = 0; i < filteredCountry.length ; i++){
          IncID.push(KeyData[i].incomeID);
          console.log(KeyData[i].incomeID);
         }
    
      console.log(IncID);

      var c_name = [];

      for (var i = 0; i < filteredCountry.length ; i++){
          c_name.push(KeyData[i].CountryName);
          console.log(KeyData[i].CountryName);
         }
    
      console.log(c_name);

      buildBody(cities,Cpopulation,CGDP,RegID,IncID,c_name);
  });
  buildplots()
});

}

function buildBody(cities,Cpopulation,CGDP,RegID,IncID,c_name) {
  var Panel = d3.select("#sample-metadata");
  Panel.html(""); // too Clear Previous metadata
  Panel.append("div").text(`Ccuntry Name: ${c_name}`);
  Panel.append("div").text(`Key Cities: ${cities}`);
  Panel.append("div").text(`Population: ${Cpopulation}`);
  Panel.append("div").text(`Gross Domestic Product ($M): ${CGDP}`);

  d3.csv("../data/Region.csv").then((R) => {
    console.log(R);
    var filterRegion = R.filter(function(d) 
      {
          if( d["region_id"] == RegID)
          { 
              return d;
          } 
      });
      console.log(filterRegion);

      var Region_Name = filterRegion.map(function(k){
        return{
          regionName: k.Region
        }
      });
      var RegName = [];

      for (var i = 0; i < Region_Name.length ; i++){
          RegName.push(Region_Name[i].regionName);
          console.log(Region_Name[i].regionName);
         }
    
      console.log(RegName);
      // console.log(Region_Name);
      Panel.append("div").text(`Region: ${RegName}`);
  });

  d3.csv("../data/Income.csv").then((I) => {
    console.log(I);
  
    // var resultsArray = countries.filter(CountryCity => CountryCity.CountryID == country);
  
    var filterIncome = I.filter(function(d) 
  { 
          if( d["IncomeID"] == IncID)
          { 
              return d;
          } 
      });

      console.log(filterIncome);
  
      var Income_Group = filterIncome.map(function(k){
        return{
          IncomeClass: k.Income_Class
        }
      });

      var IncName = [];

      for (var i = 0; i < Income_Group.length ; i++){
          IncName.push(Income_Group[i].IncomeClass);
          console.log(Income_Group[i].IncomeClass);
         }
    
      console.log(IncName);
      Panel.append("div").text(`Income Grouping: ${IncName}`);
      // console.log(Income_Group);
  });
}

function buildplots(){
var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2", // "light1", "light2", "dark1", "dark2"
	title:{
		text: "Top Oil Reserves"
	},
	axisY: {
		title: "Reserves(MMbbl)"
	},
	data: [{        
		type: "column",  
		showInLegend: true, 
		legendMarkerColor: "grey",
		legendText: "MMbbl = one million barrels",
		dataPoints: [      
			{ y: 300878, label: "Venezuela" },
			{ y: 266455,  label: "Saudi" },
			{ y: 169709,  label: "Canada" },
			{ y: 158400,  label: "Iran" },
			{ y: 142503,  label: "Iraq" },
			{ y: 101500, label: "Kuwait" },
			{ y: 97800,  label: "UAE" },
			{ y: 80000,  label: "Russia" }
		]
	}]
});
chart.render();
}

init();
