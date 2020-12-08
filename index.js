"use strict"

const axios = require('axios');
const qs = require('querystring');
const express = require('express');
const apikey = "2ae438cf864488657cc9754a27daa480";
const api_enpoint = "https://sheetlab.zoho.com/sheet/officeapi/v1/spreadsheet";

// set the headers
const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

const createSheetSession = (document_info, req, res) => {
	var data = {};
	
	data.document_info = JSON.stringify(document_info);

	return axios({
	  method: 'post',
	  data: qs.stringify(data),
	  url: api_enpoint + "?apikey=" + apikey,
	  responseType: 'json'
	});
};

const onSessionCreateSuccess = ( response, responseObject ) => {
	// handle success
    var status = response.status;

    if ( status == 200 ) {
    	var redirect_url = response.data.gridview_url || response.data.document_url;

    	responseObject.writeHead(307, {
	    	Location: redirect_url
	    });
	    console.log("Redirect Url: ", redirect_url);
	    console.log("response : ", response.data);
    }
    responseObject.end();
    
};

const onSessionCreateFailure = ( error, responseObject ) => {
	// handle error
    console.log(error);
    responseObject.end();
};

const app = express();

app.use(express.json());

app.all("/",(req, res) => {
	res.status(200).send("I am Live and Ready.");
});

app.all("/spreadsheet/new",(req, res) => {
	let spreadsheetId = new Date().getTime();

	var promise = createSheetSession({
		document_id: spreadsheetId,
		document_name: "New Spreadsheet"
	});

	promise.then(function(response) {
    	onSessionCreateSuccess(response, res);
	}).catch(function (error) {
	    onSessionCreateFailure(error, res);
	});
});

app.get("/spreadsheet/:spreadsheetId", (req,res) => {
	let spreadsheetId = req.params.spreadsheetId;

	var promise = createSheetSession({
		document_id: spreadsheetId,
		document_name: "Existing Spreadsheet"
	});

	promise.then(function(response) {
    	onSessionCreateSuccess(response, res);
	}).catch(function (error) {
	    onSessionCreateFailure(error, res);
	});

});

var port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;
