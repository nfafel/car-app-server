const fetch = require('node-fetch');

exports.getYears = async() => {
    try{
        var response = await fetch('https://www.carqueryapi.com/api/0.3/?cmd=getYears', {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        });
        var body = await response.json();
        return body.Years;
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Error getting car years data"})
    }
}

exports.getMakes = async(yearInfo) => {
    try {
        var response = await fetch(`https://www.carqueryapi.com/api/0.3/?cmd=getMakes&year=${yearInfo.year}`, {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        });
        var body = await response.json();
        return body.Makes;
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Error getting car makes data"})
    }
}

exports.getModels = async(modelsInfo) => {
    try {
        var response = await fetch(`https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${modelsInfo.make}&year=${modelsInfo.year}`, {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        });
        var body = await response.json();
        return body.Models;
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Error getting car models data"})
    }
}