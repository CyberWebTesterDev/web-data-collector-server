Object.prototype.renameProperty = function (oldName, newName) {
    // Do nothing if the names are the same
    if (oldName === newName || !newName) {
        return this;
    }
    // Check for the old property name to avoid a ReferenceError in strict mode.
    if (this.hasOwnProperty(oldName)) {
        this[newName] = this[oldName];
        delete this[oldName];
    }
    return this;
};
module.exports.insertFields = [
    'sex',
    'vk_id',
    'first_name',
    'last_name',
    'counters_followers',
    'counters_friends',
    'counters_photos',
    'last_seen',
    'city',
    'is_closed',
];
module.exports.profileMapper = (profile) => {
    console.log(`profileMapper enter`);
    console.log(profile);
    profile['last_seen.time']
        ? (profile['last_seen.time'] = new Date(profile['last_seen.time'].replace(' ', 'T').replace(' ', 'Z')))
        : 'Unknown';
    const mappingTable = {
        'city.title': 'city',
        'country.title': 'country',
        'counters.friends': 'counters_friends',
        'counters.followers': 'counters_followers',
        'counters.photos': 'counters_photos',
        bdate: 'birth_date',
        sex: 'sex',
        first_name: 'first_name',
        last_name: 'last_name',
        id: 'vk_id',
        'last_seen.time': 'last_seen',
        is_closed: 'is_closed',
    };
    for (let key in profile) {
        profile.renameProperty(key, mappingTable[key]);
        profile.deactivated = false;
    }
    console.log(`profileMapper result`);
    console.log(profile);
    return profile;
    //console.log(`Renamed object is:`);
    //console.log(profile);
};
module.exports.profileMapperTs = (profile) => {
    //console.log(`profileMapper enter`);
    //console.log(profile);
    if (profile.deactivated) {
        return { vk_id: profile.id, deactivated: true };
    }
    profile['last_seen.time'] = new Date(profile['last_seen.time'] * 1000);
    const mappingTable = {
        'city.title': 'city',
        'country.title': 'country',
        'counters.friends': 'counters_friends',
        'counters.followers': 'counters_followers',
        'counters.photos': 'counters_photos',
        bdate: 'birth_date',
        sex: 'sex',
        first_name: 'first_name',
        last_name: 'last_name',
        id: 'vk_id',
        'last_seen.time': 'last_seen',
        is_closed: 'is_closed',
    };
    for (let key in profile) {
        profile.renameProperty(key, mappingTable[key]);
        profile.deactivated = false;
    }
    //console.log(`profileMapper result`);
    //console.log(profile);
    return profile;
    //console.log(`Renamed object is:`);
    //console.log(profile);
};
