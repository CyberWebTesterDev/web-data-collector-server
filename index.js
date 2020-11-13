const webscraper = require("./web-scrapers/web-scrapers");
const loginToVk = require("./web-scrapers/auth");
const cors = require("cors");
const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);
const fetch = require("node-fetch");
const {
  processProfileData,
  waitTimeout,
  counterNotNull,
  processProfileDataSimple,
  processProfileDataFromSearch,
} = require("./data-processors/data-processors");
const flatten = require("flat");
const port = 8333;
const { DBmanager } = require("./db-manager/db-manager");
const { profileMapper, profileMapperTs } = require("./data-processors/helper");
const { access_token_2_2 } = require("./access-data/token");

const db = new DBmanager();

const getMoviesData = async (x, y) => {
  const result = await webscraper.getWebScrapedDataArray(x, y);
  console.log(result);
  return result;
  // loginToVk.loginToVkVisual()
};

app.use(cors());

app.use(express.json());

app.get("/getdefmov", (req, res) => {
  const currentDateStr = new Date()
    .toISOString()
    .replace("T", " ")
    .replace("Z", " ");
  console.log(currentDateStr + "\n");
  console.log(`GET getdefmov event`);
  getMoviesData(407, 415).then((result) => {
    res.send(result);
  });
  console.log(`Server is listening on port ${port}`);
});

app.get("/getdefmov/:from/:to", (req, res) => {
  const { from, to } = req.params;

  const currentDateStr = new Date()
    .toISOString()
    .replace("T", " ")
    .replace("Z", " ");
  console.log(currentDateStr + "\n");
  console.log(`GET getdefmov event with range from: ${from}, to: ${to}`);
  getMoviesData(from, to).then((result) => {
    res.send(result);
  });
  console.log(`Server is listening on port ${port}`);
});

app.get("/vkget/:ida", (req, res) => {
  // https://api.vk.com/method/friends.getOnline?v=5.52&access_token_2=
  // https://api.vk.com/method/users.get?user_ids=210700286&fields=bdate&access_token_2=533bacf01e11f55b536a565b57531ac114461ae8736d6506a3&v=5.103

  const { ida } = req.params;
  const _apibase = `https://api.vk.com/method/`;
  console.log(`GET vkget event for id: ${ida}`);

  const getInfoByUserId = async (id) => {
    const res = await fetch(
      `${_apibase}users.get?user_ids=${id}&fields=sex,bdate,sex,city,contacts,country,exports,followers_count,has_photo,photo_max,photo_max_orig,photo_100,online,exports,counters,relation,last_seen&access_token_2=${access_token_2_2}&v=5.103`
    );
    if (!res.ok) {
      throw new Error(`Something was wrong`);
    }
    let data = await res.json();
    data = flatten(data.response[0]);
    console.log(data);
    return data;
  };

  getInfoByUserId(ida).then((data) => {
    res.send(data);
  });
});

app.get("/vkget/matchprofiles/:from/:q", (req, res) => {
  const { from, q, hash } = req.params;
  let processingFlag = true;
  const _apibase = `https://api.vk.com/method/`;
  console.log(new Date().toISOString().replace("T", " ").replace("Z", " "));
  console.log(
    `GET matchprofiles event for range ID: ${from} with quantity ${q}`
  );

  const getInfoByUserId = async (id) => {
    const res = await fetch(
      `${_apibase}users.get?user_ids=${id}&fields=sex,bdate,sex,city,contacts,country,exports,followers_count,has_photo,photo_max,photo_max_orig,photo_100,online,exports,counters,relation,last_seen&access_token_2=${access_token_2_2}&v=5.103`
    );
    if (!res.ok) {
      throw new Error(`Something was wrong`);
    }
    const data = await res.json();
    return data;
  };

  const getAsyncData = async (f, t) => {
    let resultarray = [];
    let matcharray = [];
    let currentCounter = 0;

    for (i = f; i < t; i++) {
      await waitTimeout(600);

      getInfoByUserId(i).then((data) => {
        currentCounter++;
        //process.stdout.write(`Processed ${currentCounter} account(s)...`);
        // console.clear();
        // console.log(`Collected ${currentCounter} account(s)...`)
        console.log(`Data collected for the profile ${i}`);
        resultarray.push(data.response[0]);
      });
    }

    await waitTimeout(3000);

    console.log(`Starting to process data...`);

    await waitTimeout(3000);

    // console.log('resultarray for CHECK')
    // console.log(resultarray)
    matcharray = processProfileDataSimple(resultarray);
    return matcharray;
  };

  const endId = parseInt(from, 10) + parseInt(q, 10);

  getAsyncData(from, endId).then((data) => {
    console.log(
      `Data collected and processed. Matches (${
        counterNotNull(data).length
      }): ${counterNotNull(data)}`
    );
    const matchesShort = counterNotNull(data);

    //res.send(data)
    // console.log('matchesShort')
    //console.log(matchesShort)
    res.send(data);
  });
});

app.get("/dbmanager/batchprofilesenrichment", (req, res) => {
  console.log(`Starting to batch loading to DB`);

  const _apibase = `https://api.vk.com/method/`;

  const getInfoByUserId = async (id) => {
    const res = await fetch(
      `${_apibase}users.get?user_ids=${id}&fields=sex,bdate,sex,city,contacts,country,exports,followers_count,has_photo,photo_max,photo_max_orig,photo_100,online,exports,counters,relation,last_seen&access_token_2=${access_token_2_2}&v=5.103`
    );
    if (!res.ok) {
      throw new Error(`Something was wrong`);
    }
    const data = await res.json();
    return data;
  };

  (async () => {
    let profile;
    let profiles = [];

    try {
      let result = await db.selectVkIdsProfilesRaw();
      let counter = 0;
      for (let i = 0; i < result.length; i++) {
        try {
          console.log(`${i} collecting data for profile ${result[i].vk_id}`);
          await waitTimeout(350);
          profile = await getInfoByUserId(result[i].vk_id);
          console.log(profile.id);
          console.log(`Filling profiles from VK data`);
          profiles.push(profile);
        } catch (e) {
          throw e;
        }
      }
      for (let i = 0; i < profiles.length; i++) {
        try {
          console.log(`Preparing to fill db with collected data`);
          await db.insertUpdateProfile(
            profileMapperTs(flatten(profiles[i].response[0]))
          );
          console.log(`Filling profiles to DB ${i}`);
        } catch (e) {
          throw e;
        }
      }

      console.log(`Process of filling db with profiles data has been done;`);
      res.send(JSON.stringify({ profilesLength: profiles.length }));
    } catch (e) {
      res.send(e);
    }
  })();
});

app.get(
  "/matchfromsearch/:query/:qnt/:offset/:f/:t/:city/:year/:month/:day",
  (req, res) => {
    let { query, qnt, offset, f, t, city, year, month, day } = req.params;

    let reqObj = {
      query,
      qnt,
      offset,
      f,
      t,
      city,
      year,
      month,
      day,
    };

    if (qnt === "0") {
      qnt = 15;
    }

    console.log(
      `GET-request with params query:${query}, qnt: ${qnt}. offset: ${offset}, age from: ${f}, age to: ${t}, city: ${city}, year: ${year}, month: ${month}, day: ${day}`
    );

    let url2 = `https://api.vk.com/method/users.search?sort=0&`;
    let urlEnd = `access_token_2=${access_token_2}&v=5.103`;
    let url3 = "";
    let isQ = false;

    for (let key in reqObj) {
      if (!reqObj[key]) {
        if (key === "query") {
          isQ = true;
          qurl = `${key}=${encodeURIComponent(reqObj[key])}&`;
          url3 = url2 + qurl;
        }

        if (!isQ) {
          qurl = "";
          url3 = url2 + `${key}=${reqObj[key]}&`;
          isQ = true;
        } else {
          url3 += `${key}=${reqObj[key]}&`;
        }
      }
    }

    url3 = url3 + urlEnd;

    console.log(
      `GET matchfromsearch event with params ${query}/${qnt}/${offset}/${f}/${t}/${city}`
    );

    const searchWithQuery = async (q) => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      let url = "";
      if (q === "null" && city === "null" && year === "null") {
        url = `https://api.vk.com/method/users.search?sort=0&offset=${offset}&sex=1&count=${qnt}&country=1&age_from=${f}&age_to=${t}&birth_month=${month}&birth_day=${day}&has_photo=1&access_token_2=${access_token_2}&v=5.103`;
      }

      if (q === "null" && city !== "null" && year === "null") {
        url = `https://api.vk.com/method/users.search?sort=0&offset=${offset}&sex=1&count=${qnt}&country=1&city=${city}&age_from=${f}&age_to=${t}&birth_month=${month}&birth_day=${day}&has_photo=1&access_token_2=${access_token_2}&v=5.103`;
      }

      if (q !== "null" && city === "null" && year === "null") {
        url = `https://api.vk.com/method/users.search?q=${encodeURIComponent(
          q
        )}&sort=0&offset=${offset}&sex=1&count=${qnt}&country=1&age_from=${f}&age_to=${t}&birth_month=${month}&birth_day=${day}&has_photo=1&access_token_2=${access_token_2}&v=5.103`;
      }

      if (q !== "null" && city !== "null" && year === "null") {
        url = `https://api.vk.com/method/users.search?q=${encodeURIComponent(
          q
        )}&sort=0&offset=${offset}&sex=1&count=${qnt}&country=1&city=${city}&age_from=${f}&age_to=${t}&birth_month=${month}&birth_day=${day}&has_photo=1&access_token_2=${access_token_2}&v=5.103`;
      }

      if (q !== "null" && city !== "null" && year !== "null") {
        url = `https://api.vk.com/method/users.search?q=${encodeURIComponent(
          q
        )}&sort=0&offset=${offset}&sex=1&count=${qnt}&country=1&city=${city}&age_from=${f}&birth_month=${month}&birth_day=${day}&birth_year=${year}&has_photo=1&access_token_2=${access_token_2}&v=5.103`;
      }

      if (q === "null" && city !== "null" && year !== "null") {
        url = `https://api.vk.com/method/users.search?sort=0&offset=${offset}&sex=1&count=${qnt}&country=1&city=${city}&birth_month=${month}&birth_day=${day}&birth_year=${year}&has_photo=1&access_token_2=${access_token_2}&v=5.103`;
      }

      if (q !== "null" && city === "null" && year !== "null") {
        url = `https://api.vk.com/method/users.search?q=${encodeURIComponent(
          q
        )}&sort=0&offset=${offset}&sex=1&count=${qnt}&country=1&birth_month=${month}&birth_day=${day}&birth_year=${year}&has_photo=1&access_token_2=${access_token_2}&v=5.103`;
      }

      if (q === "null" && city === "null" && year !== "null") {
        url = `https://api.vk.com/method/users.search?sort=0&offset=${offset}&sex=1&count=${qnt}&country=1&birth_month=${month}&birth_day=${day}&birth_year=${year}&has_photo=1&access_token_2=${access_token_2}&v=5.103`;
      }

      console.log(`URL for request is : ${url}`);

      const body = {
        method: "users.search",
        age_from: "18",
        age_to: "32",
        count: "5",
        country: "1",
        has_photo: "1",
        offset: "0",
        q: q,
        sex: "1",
        access_token_2: access_token_2,
        v: "5.103",
      };

      const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      };

      try {
        const resp = await fetch(url);
        let res = await resp.json();
        //console.log(res)
        return res;
      } catch (e) {
        throw e;
      }
    };

    const getInfoByUserId = async (id) => {
      const _apibase = `https://api.vk.com/method/`;

      const res = await fetch(
        `${_apibase}users.get?user_ids=${id}&fields=sex,bdate,sex,city,contacts,country,exports,followers_count,has_photo,photo_max,photo_max_orig,photo_100,online,exports,counters,relation,last_seen&access_token_2=${access_token_2}&v=5.103`
      );
      if (!res.ok) {
        throw new Error(`Something was wrong`);
      }
      const data = await res.json();
      return data;
    };

    const getAsyncData = async (id, count) => {
      await waitTimeout(350);
      return getInfoByUserId(id).then((data) => {
        //console.clear();
        console.log(`Data collected for the profile ${id} (${count})`);
        return data.response[0];
      });
    };

    const main = async (q) => {
      const getAsyncSearhProfilesData = async (arr) => {
        let arrayForProcessMatches = [];
        let currentCounter = 1;
        for (let i = 0; i < arr.length; i++) {
          let data = await getAsyncData(arr[i].id, currentCounter);
          currentCounter++;
          arrayForProcessMatches.push(data);
        }
        return arrayForProcessMatches;
      };

      let result = await searchWithQuery(q);
      let resultArray = await getAsyncSearhProfilesData(result.response.items);

      console.log("resultArray");
      // console.log(resultArray)
      let smArr = [];
      smArr = processProfileDataFromSearch(resultArray);
      return smArr;
    };

    main(query).then((resp) => {
      const currentDateStr = new Date()
        .toISOString()
        .replace("T", " ")
        .replace("Z", " ");
      console.log("\n" + currentDateStr);
      console.log(
        `Result for GET-request with params query:${query}, qnt: ${qnt}. offset: ${offset}, age from: ${f}, age to: ${t}, city: ${city}, year: ${year}, month: ${month}` +
          "\n"
      );
      console.log(`Searched profiles has been processed!`);
      //console.log(resp)
      console.log(
        `Matches (${counterNotNull(resp).length}): ${counterNotNull(resp)}`
      );

      res.send(resp);
    });
  }
);

app.post("/insertpost", (req, res) => {
  let postData = req.body;

  console.log(`Request for insert post:`);
  console.log(postData);

  (async (postData) => {
    try {
      let result = await db.insertPost(postData);
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  })(postData);
});

app.get(
  "/insertcheck/:profileId/:firstName/:lastName/:pickedYear",
  (req, res) => {
    const { profileId, firstName, lastName } = req.params;
    let { pickedYear } = req.params;

    pickedYear === "0" ? (pickedYear = "") : (pickedYear = pickedYear);

    console.log(
      `Request for insert check for profile id: ${profileId}, first_name: ${firstName}, last_name: ${lastName}, picked_year: ${pickedYear}`
    );

    if (!profileId) {
      throw Error(`Webscraper.Excepton: profileId is not valid!`);
    }

    (async (profileId, firstName, lastName, pickedYear) => {
      try {
        let result = await db.insertUpdateProfileCheck(
          profileId,
          firstName,
          lastName,
          pickedYear
        );
        res.send(result);
      } catch (e) {
        res.send(e);
      }
    })(profileId, firstName, lastName, pickedYear);
  }
);

app.get(
  "/dbmanager/insertchecksingle/:profileId/:firstName/:lastName",
  (req, res) => {
    const { profileId, firstName, lastName } = req.params;

    console.log(
      `Request for insert single check for profile id: ${profileId}, first_name: ${firstName}, last_name: ${lastName}`
    );

    if (!profileId) {
      throw Error(`Webscraper.Excepton: profileId is not valid!`);
    }

    (async (profileId, firstName, lastName) => {
      try {
        let result = await db.insertUpdateProfileCheckSingle(
          profileId,
          firstName,
          lastName
        );
        res.send(JSON.stringify(result));
      } catch (e) {
        res.send(e);
      }
    })(profileId, firstName, lastName);
  }
);

app.get("/dbmanager/updestim/:estimation/:profileId", (req, res) => {
  const { estimation, profileId } = req.params;

  console.log(
    `Request for update estimation for profile id: ${profileId}, estimation: ${estimation}`
  );

  if (!profileId || !estimation) {
    throw Error(`Webscraper.Excepton: profileId or estimation is not valid!`);
  }

  (async (profileId, estimation) => {
    try {
      let result = await db.updateEstimation(estimation, profileId);
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  })(profileId, estimation);
});

app.get("/dbmanager/updfavor/:bool/:profileId", (req, res) => {
  const { bool, profileId } = req.params;

  console.log(
    `Request for update favorite mark for profile id: ${profileId}, bool: ${bool}`
  );

  if (!profileId || !bool) {
    throw Error(`Webscraper.Excepton: profileId or bool is not valid!`);
  }

  (async (profileId, bool) => {
    try {
      let result = await db.updateFavoriteMark(bool, profileId);
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  })(profileId, bool);
});

app.get("/dbmanager/updrelated/:bool/:profileId", (req, res) => {
  const { bool, profileId } = req.params;

  console.log(
    `Request for update related mark for profile id: ${profileId}, bool: ${bool}`
  );

  if (!profileId || !bool) {
    throw Error(`Webscraper.Excepton: profileId or bool is not valid!`);
  }

  (async (profileId, bool) => {
    try {
      let result = await db.updateRelatedMark(bool, profileId);
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  })(profileId, bool);
});

app.get("/dbmanager/updbirthyear/:year/:profileId", (req, res) => {
  const { year, profileId } = req.params;

  console.log(
    `Request for update birth year for profile id: ${profileId}, bool: ${year}`
  );

  if (!profileId || !year) {
    throw Error(`Webscraper.Excepton: profileId or year is not valid!`);
  }

  (async (profileId, year) => {
    try {
      let result = await db.updateBirthYearProfile(year, profileId);
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  })(profileId, year);
});

app.get("/dbmanager/updcorrelationest/:correst/:profileId", (req, res) => {
  const { correst, profileId } = req.params;

  console.log(
    `Request for update estimation for profile id: ${profileId}, correlation estimation: ${correst}`
  );

  if (!profileId || !correst) {
    throw Error(`Webscraper.Excepton: profileId or estimation is not valid!`);
  }

  (async (profileId, correst) => {
    try {
      let result = await db.updateCorrelationEst(correst, profileId);
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  })(profileId, correst);
});

app.get("/dbmanager/upd/haschild/:bool/:profileId", (req, res) => {
  const { bool, profileId } = req.params;

  console.log(
    `Request for update has_child for profile id: ${profileId}, boolean: ${bool}`
  );

  if (!profileId || !bool) {
    throw Error(`Webscraper.Excepton: profileId or bool is not valid!`);
  }

  (async (profileId, bool) => {
    try {
      let result = await db.updateHasChild(profileId, bool);
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  })(profileId, bool);
});

app.get("/dbmanager/upd/isinrelationship/:bool/:profileId", (req, res) => {
  const { bool, profileId } = req.params;

  console.log(
    `Request for update is_in_relationship for profile id: ${profileId}, boolean: ${bool}`
  );

  if (!profileId || !bool) {
    throw Error(`Webscraper.Excepton: profileId or bool is not valid!`);
  }

  (async (profileId, bool) => {
    try {
      let result = await db.updateIsInRelationship(profileId, bool);
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  })(profileId, bool);
});

app.get("/dbmanager/searchcheckedprofiles", (req, res) => {
  console.log(`Request for search check profiles`);

  (async () => {
    try {
      let result = await db.selectProfielsCheck();
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  })();
});

app.get("/dbmanager/searchcheckedprofile/:profileid", (req, res) => {
  const { profileid } = req.params;

  console.log(`Request for insert check for profile id: ${profileid}`);

  if (!profileid) {
    throw Error(`Webscraper.Excepton: profileId is not valid!`);
  }

  console.log(`Request for search check profile`);

  (async (profileid) => {
    try {
      let result = await db.selectProfielSingleCheck(profileid);
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  })(profileid);
});

app.post("/dbmanager/insertupdprofile", (req, res) => {
  let profile = req.body;
  console.log(`Received POST request with data`);
  console.log(`${JSON.stringify(req.headers)}`);
  //console.log(profile);
  profile = profileMapper(profile);
  (async (profile) => {
    console.log(`Async function is invoking DB update for profile`);

    try {
      let result = await db.insertUpdateProfile(profile);
      res.send(JSON.stringify(result));
    } catch (e) {
      res.send(e);
    }
  })(profile);
});

app.get("/dbmanager/searchsingleprofiledb/:profileid", (req, res) => {
  const { profileid } = req.params;

  console.log(`Request for search in db for profile id: ${profileid}`);

  if (!profileid) {
    throw Error(`Webscraper.Excepton: profileId is not valid!`);
  }

  (async (profileid) => {
    try {
      let result = await db.getProfileById(profileid);
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  })(profileid);
});

app.get("/dbmanager/selectprofiledataextended/:profileid", (req, res) => {
  const { profileid } = req.params;

  console.log(
    `Request for search in db for profile id: ${profileid} extended data`
  );

  if (!profileid) {
    throw Error(`Webscraper.Excepton: profileId is not valid!`);
  }

  (async (profileid) => {
    try {
      let result = await db.selectProfileDataExtended(profileid);
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  })(profileid);
});

app.get("/dbmanager/searchposts", (req, res) => {
  console.log(`Request for searchposts has been received`);

  (async () => {
    try {
      let result = await db.selectPosts();
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  })();
});

app.get("/searchtest", (req, res) => {
  const _apibase = `https://api.vk.com/method/`;
  console.log(`GET searchtest event`);

  const searhUsersTest = async () => {
    const res = await fetch(
      `${_apibase}users.search?sort=1&offset=0&count=100&fields=sex,bdate,city,home_town,has_photo,counters,followers_count&city=1&sex=1&status=1&age_from=23&age_to=30&has_photo=1&can_access_closed=true&access_token_2=${access_token_2}&v=5.103`
    );

    if (!res.ok) {
      throw new Error(`Something was wrong`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  };

  searhUsersTest().then((result) => {
    res.send(result);
  });
});

app.ws("/matchprofiles", (ws, req) => {
  ws.on("message", (msg) => {
    console.log("WS RAW request is ");
    console.log(msg);

    const request = JSON.parse(msg);

    const { startId, quantity, id } = request;

    const _apibase = `https://api.vk.com/method/`;

    console.log(new Date().toISOString().replace("T", " ").replace("Z", " "));
    console.log(
      `WS matchprofiles request ${id} for range ID: ${startId} with quantity ${quantity}`
    );

    const getInfoByUserId = async (id) => {
      const res = await fetch(
        `${_apibase}users.get?user_ids=${id}&fields=sex,bdate,sex,city,contacts,country,exports,followers_count,has_photo,photo_max,photo_max_orig,photo_100,online,exports,counters,relation,last_seen&access_token_2=${access_token_2_2}&v=5.103`
      );
      if (!res.ok) {
        throw new Error(`Something was wrong`);
      }
      const data = await res.json();
      return data;
    };

    const getAsyncData = async (f, t) => {
      let resultarray = [];
      let matcharray = [];
      let currentCounter = 0;

      for (i = f; i < t; i++) {
        await waitTimeout(600);

        getInfoByUserId(i).then((data) => {
          currentCounter++;
          //process.stdout.write(`Processed ${currentCounter} account(s)...`);
          // console.clear();
          // console.log(`Collected ${currentCounter} account(s)...`)
          console.log(`WS Data collected for the profile ${i}`);
          resultarray.push(data.response[0]);
        });
      }

      await waitTimeout(3000);

      console.log(`Starting to process data...`);

      await waitTimeout(3000);

      // console.log('resultarray for CHECK')
      // console.log(resultarray)
      matcharray = processProfileDataSimple(resultarray);
      return matcharray;
    };

    const endId = parseInt(startId, 10) + parseInt(quantity, 10);

    getAsyncData(startId, endId).then((data) => {
      console.log(
        `WS Data collected and processed. Matches (${
          counterNotNull(data).length
        }): ${counterNotNull(data)}`
      );
      console.log(data);
      console.log(JSON.stringify({ id: id, ...data }));

      //res.send(data)
      // console.log('matchesShort')
      //console.log(matchesShort)
      ws.send(JSON.stringify({ id: id, ...data }));
    });
  });
});

app.ws("/test", (ws, req) => {
  const getUniqueId = () => {
    const s4 = () =>
      Math.floor((1 + Math.random()) * 0x100000)
        .toString(16)
        .substring(1);
    return s4() + s4() + "-" + s4();
  };

  const clientId = getUniqueId();

  console.log(`WS: connection has been established ${clientId}`);
  const message = { clientId: clientId };

  ws.send(JSON.stringify(message));

  ws.on("message", (msg) => {
    console.log(msg);

    ws.send(JSON.stringify({ ...message, prop: "another message" }));
  });
});

app.get("/loginvk", (req, res) => {
  console.log(`GET loginvk event`);
  loginToVk.loginToVkVisual();
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
