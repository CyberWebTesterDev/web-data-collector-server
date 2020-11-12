const counterNotNull = (arr) => {
  let count = 0;
  let matches = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== undefined && arr[i] !== null) {
      count++;
      matches.push(arr[i].id.toString());
    }
  }

  return matches;
};

const processProfileData = (array) => {
  return array.map((el, i, arr) => {
    console.log("Processing data for ", el.id);

    if (
      el.sex === 1 &&
      el.has_photo === 1 &&
      (el.relation === 1 ||
        el.relation === 6 ||
        el.relation === 0 ||
        el.relation === undefined) &&
      el.bdate !== null &&
      el.bdate !== undefined &&
      !el.is_closed &&
      el.can_access_closed
    ) {
      if (el.bdate.length < 8) {
        console.log("processProfileData object was not matched");
        return;
      }

      let dateString = [];
      dateString = el.bdate.split(".");

      if (
        el.counters.friends < 100 &&
        el.followers_count < 140 &&
        (dateString[2] === "1989" ||
          dateString[2] === "1990" ||
          dateString[2] === "1991" ||
          dateString[2] === "1992" ||
          dateString[2] === "1993" ||
          dateString[2] === "1994" ||
          dateString[2] === "1995")
      ) {
        console.log("processProfileData object was matched");
        console.log(el);

        return el;
      }

      console.log("processProfileData object was not matched");
      return;
    }
    console.log("processProfileData object was not matched");
    return;
  });
};

const processProfileDataSimple = (array) => {
  return array.map((el) => {
    console.log("Processing data for ", el.id + "\n");

    if (
      el.sex === 1 &&
      !el.is_closed &&
      el.can_access_closed &&
      el.has_photo === 1
    ) {
      if (el.bdate !== undefined && el.bdate.length >= 8) {
        let dateString = [];
        dateString = el.bdate.split(".");

        if (
          dateString[2] === "1988" ||
          dateString[2] === "1989" ||
          dateString[2] === "1990" ||
          dateString[2] === "1991" ||
          dateString[2] === "1992" ||
          dateString[2] === "1993" ||
          dateString[2] === "1994" ||
          dateString[2] === "1995" ||
          dateString[2] === "1996" ||
          dateString[2] === "1997" ||
          dateString[2] === "1998"
        ) {
          const dateSeen = new Date(el.last_seen.time * 1000)
            .toISOString()
            .split("-");

          if (
            (el.relation === 1 ||
              el.relation === 6 ||
              el.relation === 0 ||
              el.relation === undefined) &&
            dateSeen[0] === "2020" &&
            dateSeen[1] === "03"
          ) {
            console.log(el.id, " Profile was MATCHED !");
            return el;
          }

          console.log(
            `Profile (${el.id}) was not matched by relation (${el.relation}) or date_seen (${dateSeen[0]})`
          );
          return;
        }
        console.log(
          `Profile (${el.id}) was not matched by year of birth (${dateString[2]})  `
        );
        return;
      }
      console.log(
        `Profile (${el.id}) was not matched by bdate (${el.bdate})  `
      );
      return;
    }
    console.log(
      `Profile (${el.id}) was not matched by sex (${el.sex}) or is_closed (${el.is_closed}) or has_photo (${el.has_photo})`
    );
    return;
  });
};

const processProfileDataFromSearch = (array) => {
  return array.map((p) => {
    if (!p.is_closed && p.can_access_closed) {
      if (
        !p.relation ||
        p.relation == 1 ||
        p.relation == 6 ||
        p.relation == 0
      ) {
        if (p.last_seen) {
          const dateSeen = new Date(p.last_seen.time * 1000)
            .toISOString()
            .split("-");
          if (
            dateSeen[0] === "2020" &&
            (dateSeen[1] == "10" || dateSeen[1] == "11")
          ) {
            if (p.counters.friends <= 190 && p.counters.followers < 550) {
              console.log(`Profile ${p.id} WAS MATCHED !`);
              return p;
            }
            console.log(
              `Profile ${p.id} was not matched by counters.friends(${p.counters.friends}) or counters.followers(${p.counters.followers})`
            );
            return;
          }
          console.log(
            `Profile ${p.id} was not matched by last seen time(${dateSeen})`
          );
          return;
        }

        console.log(
          `Profile ${p.id} was not matched by last seen time(${p.last_seen})`
        );
        return;
      }
      console.log(`Profile ${p.id} was not matched by RELATION(${p.relation})`);
      return;
    }
    console.log(
      `Profile ${p.id} was not matched by ACCESS: is_closed(${p.is_closed}), can_access_closed(${p.can_access_closed})`
    );
    return;
  });
};

const processProfileDataDetail = (array) => {
  return array.map((el) => {
    console.log("Processing data for ", el.id + "\n");

    if (
      el.sex === 1 &&
      !el.is_closed &&
      el.can_access_closed &&
      el.has_photo === 1
    ) {
      if (el.bdate !== undefined && el.bdate.length >= 8) {
        let dateString = [];
        dateString = el.bdate.split(".");

        if (
          dateString[2] === "1989" ||
          dateString[2] === "1989" ||
          dateString[2] === "1990" ||
          dateString[2] === "1991" ||
          dateString[2] === "1992" ||
          dateString[2] === "1993" ||
          dateString[2] === "1994" ||
          dateString[2] === "1995"
        ) {
          if (
            el.relation === 1 ||
            el.relation === 6 ||
            el.relation === 0 ||
            el.relation === undefined
          ) {
            if (
              el.city.id === 1 ||
              el.city.id === 12 ||
              el.city.id === 5 ||
              el.city.id === 39 ||
              el.city.id === 122 ||
              el.city.id === 146 ||
              el.city.id === 991 ||
              el.city.id === 69
            ) {
              console.log(`Profile (${el.id}) was MATCHED ! `);
              return;
            }
            console.log(
              `Profile (${el.id}) was not matched by city (${el.city.title})  `
            );
            return;
          }

          console.log(
            `Profile (${el.id}) was not matched by relation (${el.relation})  `
          );
          return;
        }

        console.log(
          `Profile (${el.id}) was not matched by year of birth (${dateString[2]})  `
        );
        return;
      }
      console.log(
        `Profile (${el.id}) was not matched by bdate (${el.bdate})  `
      );
      return;
    }
    console.log(
      `Profile (${el.id}) was not matched by sex (${el.sex}) or is_closed (${el.is_closed}) or has_photo (${el.has_photo}): `
    );
    return;
  });
};

const waitTimeout = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

module.exports.waitTimeout = waitTimeout;

module.exports.processProfileData = processProfileData;

module.exports.counterNotNull = counterNotNull;

module.exports.processProfileDataSimple = processProfileDataSimple;

module.exports.processProfileDataFromSearch = processProfileDataFromSearch;
