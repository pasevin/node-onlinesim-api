var onlinesim=requie('node-onlinesim-api')('**YOUR_API_KEY**');

getSumData().then((data)=>console.log(data));


function getSumData() {
    var data = {};
     return new Promise(function(fullfill, reject) {
        onlinesim.getBalance().then(function(balance) {
                data['balance'] = {
                    "active": balance.balance,
                    "frozen": balance.zbalance
                };
            })
            .then(onlinesim.getServiceList)
            .then(function(e) {
                var telStat = _.findWhere(e, { title: 'Telegram' });
                data['telestat'] = {
                    "price": telStat.deferr + "р.",
                    "free": telStat.limit + "%"
                };
            })
            .then(onlinesim.getOperations)
            .then(function(e) {

                if (e.response == "ERROR_NO_OPERATIONS") {
                    data['operations'] = {
                        nooperations: 'ERROR_NO_OPERATIONS'
                    }
                } else {
                    var op = {};

                    op["  всего                    : "] = e.length;
                    op["  нет подходящих номеров   : "] = _.where(e, { response: "WARNING_NO_NUMS" }).length
                    op["  ожидает выделения номера : "] = _.where(e, { response: "TZ_INPOOL" }).length
                    op["  ожидает ответ            : "] = _.where(e, { response: "TZ_NUM_WAIT" }).length
                    op["  поступил ответ           : "] = _.where(e, { response: "TZ_NUM_ANSWER" }).length
                    op["  время ответа просрочено  : "] = _.where(e, { response: "TZ_OVER_EMPTY" }).length
                    op["  операция завершена       : "] = _.where(e, { response: "TZ_OVER_OK" }).length
                    data['operations'] = op;
                    fullfill(data);
                }
            })
    })

}


function spacer(rows) {
    var spacer = '';
    if (rows) {
        for (var i = 1; i < rows; i++) {
            spacer += '\n';
        }
    }
    console.log(spacer);
}

function hRule() {
    console.log('________________________________________\n');
}
