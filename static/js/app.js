// Create the URL 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Get the data, populate the initial chart with the first dataset, and create the dropdown menu. 
d3.json(url).then(function(data){
    createChart(data.samples[0].id);
    var dropdown = d3.select("#selDataset");
    var names = data.names;
    names.forEach(function(name) {
        dropdown.append("option").text(name).property("value", name);
    });
});

// Create a function to contain all the code that will need to happen each time the dropdown changes. 
function createChart(id){
    d3.json(url).then(function(data){
        // Filter the data for only the selected ID
        var sampleData = data.samples.filter(sample => sample.id === id)[0];

        // Get the top 10 sample_values, otu_ids, and otu_labels for usage later
        var top10Values = sampleData.sample_values.slice(0, 10).reverse();
        var top10Ids = sampleData.otu_ids.slice(0, 10).reverse();
        var top10Labels = sampleData.otu_labels.slice(0, 10).reverse();

        // Create the trace for the bar chart
        var trace = {
            x: top10Values,
            y: top10Ids.map(id => "OTU " + id),
            text: top10Labels,
            type: "bar",
            orientation: "h"
        };

        // Create the data array for the plot
        var data1 = [trace];

        // Configuring the layout of the bar chart
        var layout = {
            title: "Top 10 OTUs",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" }
        };

        // Plotting the bar chart
        Plotly.newPlot("bar", data1, layout);




        // Create the trace for the bubble chart 
        var trace = {
            x: top10Ids,
            y: top10Values,
            text: top10Labels,
            mode: 'markers',
            marker: {
            size: top10Values,
            color: top10Ids,
            colorscale: 'Earth'
            }
        };

        // Set the layout for the bubble chart
        var layout = {
            title: 'Bubble Chart',
            xaxis: { title: 'OTU ID' },
            yaxis: { title: 'Sample Values' }
        };

        // Create the data array for the plot
        var data2 = [trace];

        // Plot the chart using Plotly
        Plotly.newPlot('bubble', data2, layout);



        // Select the panel-body div using D3
        var panelBody = d3.select(".panel-body");

        // Delete anything in the description 
        panelBody.selectAll("*").remove();

        // Get the metadata for the sample
        var metadata = data.metadata.filter(meta => meta.id == id)[0];

        // Create a list element and append it to the panel-body div
        var list = panelBody.append("ul");

        // Create a row for id and append it to the list
        list.append("li")
            .text("ID: " + metadata.id);

        // Create a row for ethnicity and append it to the list
        list.append("li")
            .text("Ethnicity: " + metadata.ethnicity);

        // Create a row for gender and append it to the list
        list.append("li")
            .text("Gender: " + metadata.gender);

        // Create a row for age and append it to the list
        list.append("li")
            .text("Age: " + metadata.age);

        // Create a row for location and append it to the list
        list.append("li")
            .text("Location: " + metadata.location);

        // Create a row for bbtype and append it to the list
        list.append("li")
            .text("BB Type: " + metadata.bbtype);

        // Create a row for wfreq and append it to the list
        list.append("li")
            .text("W Freq: " + metadata.wfreq);


    });
};

// Function called when changing dropdown menu
function optionChanged(id){

    // Call the createChart function to create the new charts with the new ID
    createChart(id);
}