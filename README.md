# MGGG metric visualizer

## Purpose

There are many different metrics that attempt to measure how weird-looking
 a district is. Whether measuring 
 [compactness](https://pdfs.semanticscholar.org/3db5/6f1a76229e6dbab7e8711bea315efdde6ad2.pdf),
 [convexity](https://www.maa.org/sites/default/files/pdf/upload_library/22/Polya/Hodge2011.pdf), or
 [bizarreness](http://people.hss.caltech.edu/~alan/bizarreness.pdf),
 all of the algorithms do a similar thing: They take in a set of geometries defining the 
 districts of a plan, and return a number for each district indicating how much suspicion of 
 gerrymandering should be given to the district.
 
A library of such metrics can be found in the python-mander repository in this project. This project
 provides a pipeline for applying such algorithms to real-world data and comparing to other existing algorithms.

<p align="center">
  <img src="https://github.com/gerrymandr/metric_visualizer/blob/master/img/display.jpg" alt="mimimal view" width="80%"/>
</p>

## Steps

1. Download Data: data_downloader.py is a script for downloading a set of data from the internet to use as the test data
2. Extract Data: The downloaded data is then processed to give it a consistent schema and projection.
3. Compute Metrics: The values of a set of metrics are computed for comparison
4. Display Results: Once the metrics have been computed, they must be understood. A set of pre-built visualizations
have been provided to help the user identify patterns in the data. This is also helpful for explaining the different
metrics to an unfamiliar audience. These are provided as a webpage. The officially maintained set of metrics will be 
hosted for now at http://www.gis.leg.mn/iMaps/metricViz/#.

## A few high-priority next steps:

* Add more datasources to the data_downloader.py script to use as comparison, especially a full set of US Congressional 
Districts
* The processing code is currently in the form of a jupyter Notebook. This should be factored out into scripts:
process_data.py, compute_metrics.py, and update_mapbox.py
* Add a step to the process data script that simplifies the data to several different thresholds, so that if an 
algorithm is sensitive to data complexity that is made obvious quickly.
* Update the website to add Scatter plots comparing pairs of metrics and other visualizations characterizing the 
results of each algorithm.

## Strech goals

* Extract demographic data, and come up with visualizations that compare demographic data with 
the convexity measures
* Make the interface for implementing new metrics more intuitive. 


### Primary Contacts

solbrigm@gmail.com
cantey0701@gmail.com