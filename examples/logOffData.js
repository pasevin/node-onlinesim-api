

var onlinesim=requie('node-onlinesim-api')('**YOUR_API_KEY**');
log();

function log() {
    spacer(1);
    console.log("Баланс:");
    onlinesim.getBalance().then(function(balance) {
            console.log("  активных средств:     " + balance.balance);
            console.log("  замороженных средств: " + balance.zbalance);
        })
        .then(onlinesim.getServiceList)
        .then(function(e) {
            spacer(1);
            var telStat = _.findWhere(e, { title: 'Telegram' });
            console.log("Telegram at OnlineSim:")
            console.log("  цена     : " + telStat.deferr + "р.");
            console.log("  свободно : " + telStat.limit + "%");

        })
        .then(onlinesim.getOperations)
        .then(function(e) {
            spacer(1);
            console.log("Операции:")
            if (e.response == "ERROR_NO_OPERATIONS") {
                console.log("  операций нет");
            } else {
                console.log("  всего                    : ".bold, e.length);
                console.log("  нет подходящих номеров   : ", _.where(e, { response: "WARNING_NO_NUMS" }).length);
                console.log("  ожидает выделения номера : ", _.where(e, { response: "TZ_INPOOL" }).length);
                console.log("  ожидает ответ            : ", _.where(e, { response: "TZ_NUM_WAIT" }).length);
                console.log("  поступил ответ           : ", _.where(e, { response: "TZ_NUM_ANSWER" }).length);
                console.log("  время ответа просрочено  : ", _.where(e, { response: "TZ_OVER_EMPTY" }).length);
                console.log("  операция завершена       : ", _.where(e, { response: "TZ_OVER_OK" }).length);
            }
            // TZ_INPOOL   операция ожидает выделения номера
            // TZ_NUM_WAIT   ожидается ответ
            // TZ_NUM_ANSWER   поступил ответ.
            // TZ_OVER_EMPTY   ответ не поступил за отведенное время
            // TZ_OVER_OK    операция завершена
        })

    };



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
