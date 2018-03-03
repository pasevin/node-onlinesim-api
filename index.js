const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'), { multiArgs: true });

module.exports = function(apiKey) {
	const  url = 'http://onlinesim.ru/api/';
	const getProm = (method, vars) => {
		if (!vars) vars = {};
		vars.apikey = apiKey;
		return request.getAsync({
			url: url + method + '.php',
			qs: vars,
			json: true
		})
			.spread((response, json) => {
				return json;
			})
			.catch(error => {
				console.error('Error connecting to: %s : %s', url, error);
			});
	};

	var onlinesim = {
		getServiceList: () => {
			return getProm('getServiceList'); },
		getNum: (service) => {
			return getProm('getNum', { service: service, form: 1 }); },
		setForwardStatusEnable: () => {},
		getState: (tzid) => {
			return getProm('getState', { tzid: tzid }); },
		getOperations: () => {
			return getProm('getOperations'); },
		setOperationRevise: () => {},
		setOperationOk: (tzid) => {
			return getProm('setOperationOk', { tzid: tzid }); },
		setOperationOver: () => {},
		setOperationUsed: () => {},
		getBalance: () => {
			return getProm('getBalance', {}); },
		getService: () => {},
		getServiceNumber: () => {},
		getNumRepeat: () => {},
		logAll: () => { logAll(); },
		alldata: () => {
			return alldata();
		}
	};
	return onlinesim;
};