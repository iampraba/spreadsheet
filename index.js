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

//Method returns promise object of spreadsheet session create request.
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

//Once spreadsheet session created, this method will redirect to user to generated spread sheet session
const onSessionCreateSuccess = ( response, responseObject ) => {
    // handle success
    var status = response.status;

    if ( status == 200 ) {
        var redirect_url = response.data.gridview_url || response.data.document_url;

        responseObject.writeHead(307, {
            Location: redirect_url
        });
        console.log("Redirect Url: ", redirect_url);
    } else {
        responseObject.status(500).send("Spreadsheet creation request failed");
    }
    responseObject.end();
};

//Once spreadsheet session created, this method will redirect to user to generated spread sheet session
const onSessionCreateFailure = ( error, responseObject ) => {
    // handle error
    console.log(error);
    responseObject.status(500).send("Spreadsheet creation request failed");
    responseObject.end();
};

const app = express();

app.use(express.json());

app.all("/",(req, res) => {
    res.status(200).send("I am Live and Ready.");
});

//This api end point will create a new spreadsheet. 
//User will be redirected to created session url as response.
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

//This api end point will create new spreadsheet with given 'spreadsheetId' in api end point url.
//User will be redirected to created session url as response.
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
});

module.exports = app;
