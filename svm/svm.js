#!/usr/bin/env node
const fs = require("fs");
var so = require('stringify-object');
var _a = require('mout/array');
var svm = require("node-svm");
var dataAccess = require("../api-handler/dataAccess");
var ArgumentParser = require('../node_modules/argparse/lib/argparse').ArgumentParser;

var chars = undefined;
var titles = undefined;
var cultures = undefined;
var houses = undefined;

var parser = new ArgumentParser({
    version: '1.0',
    addHelp:true,
    description: 'Description: Implements SVM using libsvm',
    usage: " svm.js \t\t\t# Default format (very slow when using higher degree poly kernel)\n \tsvm.js -f sparse \t # Uses libsvm sparse format"
});

parser.addArgument(
    [ '-f', '--datasetformat' ],
    {
        defaultValue: 'json',
        help: 'specify datasetformat eg: sparse'
    }
);

var args = parser.parseArgs();

createSVM();

function createSVM(){
    dataAccess.characters(initializeChars);
}

function initializeChars(res){
    chars = res;
    dataAccess.titles(initializeTitles);    
}

function initializeTitles(res){
    titles = res;
    dataAccess.cultures(initializeCultures);
}

function initializeCultures(res){
    cultures = res;
    dataAccess.houses(initializeHouses);
}

function initializeHouses(res){
    houses = res;    
    initializeSVM();
}

function initializeSVM(){

    var data = [];
    var names = [];

	chars.forEach(function(element,index){
    	var isAlive = (element["dateOfDeath"] == undefined && element["placeOfDeath"] == undefined)?(1):(0);
    	var title = titles.indexOf(element["title"])+1;
    	//var male = (element["male"])?(1):(0);
    	//var culture = cultures.indexOf(element["culture"])+1;
    	var house = houses.indexOf(element["house"])+1;

    	//var row = [[title,male,culture,house],isAlive];

        if(args.datasetformat != "sparse"){
            var row = [[title,house],isAlive];
            data.push(row);
        } else {
            var attr = [title,house];
            attr_sparse = "";
            for(i=0;i<attr.length;i++){
                if( attr[i] !=0 ){
                    attr_sparse += i+1 + ":" + attr[i] + " ";
                }
            }
            var row = isAlive + " " + attr_sparse;
            data += row +'\n';
        }

	    names.push(element["name"]);

	});
	console.log("test");
    console.log(data);
	// initialize a new predictor
    var clf = new svm.SVM({
        svmType: 'C_SVC',
        c: [0.01, 0.125, 0.5, 1, 2],
        nu:	[0.01,0.125,0.5,1],

        // kernels parameters
        kernelType: 'POLY',
        degree:	['2'],
        gamma: [0.001, 0.01, 0.5],
        r:	[0.125,0.5,0,1],

        // training options
        kFold: 10,
        normalize: true,
        reduce: true,
        retainedVariance: 0.99,
        eps: 1e-3,
        cacheSize: 200,
        shrinking : true,
        probability : true
    });

    var filestring = data;
    fs.writeFile("dataset.ds",filestring,function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("Dataset FILE SAVED.");
    });
    var fileName = 'dataset.ds';

    if(args.datasetformat != "sparse"){
        clf.train(data).progress(function(rate){
            console.log('training progress:',parseFloat(rate*100).toFixed(2)+"%");
        }).done(function () {
            // predict things
            data.forEach(function(ex,index){
                //console.log(ex);
                var prediction = clf.predictProbabilitiesSync(ex[0]);
                console.log('%s => %d', names[index], prediction["0"]);
            });
        });
    } else {
        svm.read(fileName)
            .then(function (dataset) {
                console.log('start training (may take a while)...');
                return clf.train(dataset)
                    .progress(function (progress) {
                        console.log('training progress: %d%', Math.round(progress * 100));
                    })
                    .spread(function (model, report) {
                        console.log('SVM trained. \nReport:\n%s', so(report));
                        return dataset;
                    });
            })
            .then(function (dataset) {
                dataset.forEach(function (ex, index) {
                    var prediction = clf.predictProbabilitiesSync(ex[0]);
                    console.log('#%d, expected: %d, %s => %d',index+1, ex[1], names[index], prediction["0"]);
                });
            })
            .fail(function (err) {
                throw err;
            })
            .done(function () {
                console.log('done.');
            });

    }

}

