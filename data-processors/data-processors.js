var counterNotNull = function (arr) {
    var count = 0;
    var matches = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== undefined && arr[i] !== null) {
            count++;
            matches.push(arr[i].id.toString());
        }
    }
    return matches;
};
var processProfileDataFromSearch = function (array) {
    return array.map(function (p) {
        if (!p.is_closed && p.can_access_closed) {
            if (!p.relation ||
                p.relation == 1 ||
                p.relation == 6 ||
                p.relation == 0) {
                if (p.last_seen) {
                    var dateSeen = new Date(p.last_seen.time * 1000)
                        .toISOString()
                        .split('-');
                    if (dateSeen[0] === '2021' &&
                        (dateSeen[1] == '05' || dateSeen[1] == '06')) {
                        if (p.counters.friends <= 190 && p.counters.followers < 550) {
                            console.log("Profile " + p.id + " WAS MATCHED !");
                            return p;
                        }
                        console.log("Profile " + p.id + " was not matched by counters.friends(" + p.counters.friends + ") or counters.followers(" + p.counters.followers + ")");
                        return;
                    }
                    console.log("Profile " + p.id + " was not matched by last seen time(" + dateSeen + ")");
                    return;
                }
                console.log("Profile " + p.id + " was not matched by last seen time(" + p.last_seen + ")");
                return;
            }
            console.log("Profile " + p.id + " was not matched by RELATION(" + p.relation + ")");
            return;
        }
        console.log("Profile " + p.id + " was not matched by ACCESS: is_closed(" + p.is_closed + "), can_access_closed(" + p.can_access_closed + ")");
        return;
    });
};
var waitTimeout = function (ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
};
module.exports.waitTimeout = waitTimeout;
module.exports.counterNotNull = counterNotNull;
module.exports.processProfileDataFromSearch = processProfileDataFromSearch;
