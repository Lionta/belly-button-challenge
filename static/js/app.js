const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function(data){
    console.log(data.samples);

    function createChart(id){
        var sampleData = data.samples.filter(sample => sample.id === id)[0];
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
        var datas = [trace];
        var layout = {
            title: "Top 10 OTUs",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" }
        };
        Plotly.newPlot("bar", datas, layout);
    };
    var dropdown = d3.select("#selDataset");
    var names = data.names;
    names.forEach(function(name) {
        dropdown.append("option").text(name).property("value", name);
    });
      
    d3.selectAll('#selDataset').on("change", createChart(dropdown.property("value")));
    createChart(data.samples[0].id);
});