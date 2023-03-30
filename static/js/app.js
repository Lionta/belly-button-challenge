const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function(data){
    console.log(data);

    function createChart(id){
        var sampleData = data.samples[0]//.filter(sample => sample.id === id)[0];
        var top10Values = sampleData.sample_values.slice(0, 10).reverse();
        var top10Ids = sampleData.otu_ids.slice(0, 10).reverse();
        var top10Labels = sampleData.otu_labels.slice(0, 10).reverse();


        var trace = {
            x: top10Values,
            y: top10Ids.map(id => "OTU " + id),
            text: top10Labels,
            type: "bar",
            orientation: "h"
        };
        var data1 = [trace];
        var layout = {
            title: "Top 10 OTUs",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" }
        };
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
    };


    var dropdown = d3.select("#selDataset");
    var names = data.names;
    names.forEach(function(name) {
        dropdown.append("option").text(name).property("value", name);
    });
      
    d3.selectAll('#selDataset').on("change", createChart(dropdown.property("value")));
    createChart(data.samples[0].id);
});