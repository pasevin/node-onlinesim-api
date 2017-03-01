var request = require('request');

module.exports = function (apiKey) {
    var apiKey = apiKey;
    var url = "http://onlinesim.ru/api/";
    var getProm = function(metod, vars) {
            return new Promise(function(ok, error) {
                console.log('req');
                if (!vars) vars = {};
                vars.apikey = apiKey;
                request.get({ url: url + metod + '.php', qs: vars, json: true }, function(error, respone, json) {
                    console.log('req');
                    if (error) error("[Error of connection to " + url + "]", e)
                    else { ok(json); }
                })
            })
        }

    var onlinesim = {
        getServiceList: () => {
            return getProm("getServiceList") },
        getNum: (service) => {
            return getProm("getNum", { service: service, form: 1 }) },
        setForwardStatusEnable: () => {},
        getState: (tzid) => {
            return getProm("getState", { tzid: tzid }) },
        getOperations: () => {
            return getProm("getOperations") },
        setOperationRevise: () => {},
        setOperationOk: (tzid) => {
            return getProm("setOperationOk", { tzid: tzid }) },
        setOperationOver: () => {},
        setOperationUsed: () => {},
        getBalance: () => {
            return getProm("getBalance", {}) },
        getService: () => {},
        getServiceNumber: () => {},
        getNumRepeat: () => {},
        logAll: () => { logAll() }
        alldata: () => {
            return alldata();
        }
    }
    return onlinesim;
};