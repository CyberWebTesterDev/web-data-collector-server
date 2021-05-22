module.exports.sqlins = {
    text: "INSERT INTO webscraper_db.public.posts(\n        title, text, creation_date, change_date, author)\n        VALUES ($1, $2, now(), now(), 'webscraper');",
    values: []
};
module.exports.sqlSelectPosts = {
    text: "select * from webscraper_db.public.posts;",
    values: []
};
module.exports.sqlSelectActualPosts = {
    text: "SELECT * FROM webscraper_db.public.posts \n    where id >= 8\n    order by creation_date desc;",
    values: []
};
module.exports.SQL_INSERT_UPDATE_PROFILES_CHECK = {
    text: "insert into profiles_check (is_checked, first_name, last_name, first_checked, check_update, vk_id, estimation, correlation_est)\n    values (\n    true,\n    $2,\n    $3,\n    now(),\n    now(),\n    $1,\n    0,\n    0.0\n    ) on conflict (vk_id) do update set check_update = now(), first_name = $2, last_name = $3;",
    values: []
};
module.exports.SQL_INSERT_UPDATE_PROFILE_DATA = {
    text: "insert into profiles (creation_date, update_time, sex, vk_id, first_name, last_name, counters_followers, counters_friends, counters_photos, last_seen, city, birth_date, is_closed, deactivated)\n        values (now(), now(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)\n        on conflict (vk_id) do update set update_time = now(), first_name = $3, last_name = $4, counters_followers = $5, counters_friends = $6, counters_photos = $7, last_seen = $8, city = $9, birth_date = $10, is_closed = $11, deactivated = $12;",
    values: []
};
module.exports.SQL_INSERT_UPDATE_PROFILE_DATA_TEST = {
    text: "insert into profiles_test (creation_date, update_time, sex, vk_id, first_name, last_name, counters_followers, counters_friends, counters_photos, last_seen, city, is_closed, birth_date)\n    values (now(), now(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)\n    on conflict (vk_id) do update set update_time = now(), first_name = $3, last_name = $4, counters_followers = $5, counters_friends = $6, counters_photos = $7, last_seen = $8, city = $9, is_closed = $10, birth_date = $11;",
    values: []
};
module.exports.SQL_INSERT_UPDATE_PROFILES = {
    text: "insert into profiles (creation_date, update_time, sex, vk_id, first_name, last_name, birth_year)\n    values (now(), now(), 0, $1, $2, $3, $4)\n    on conflict (vk_id) do update set first_name = $2, last_name = $3, birth_year = $4, update_time = now();",
    values: []
};
module.exports.SQL_SELECT_PROFILES_CHECK = {
    text: "SELECT * FROM webscraper_db.public.profiles_check\n    order by first_checked desc;"
};
module.exports.SQL_SELECT_VK_ID_PROFILES_ALL = {
    text: "SELECT vk_id FROM webscraper_db.public.profiles limit 15;"
};
module.exports.SQL_SELECT_VK_ID_PROFILES_BATCH = {
    text: "SELECT vk_id FROM webscraper_db.public.profiles\n    where counters_followers is null\n    and deactivated is null\n    order by update_time desc\n    limit 50;"
};
module.exports.SQL_SELECT_MULTIPLE_PROFILE_DATA_EXTENDED = {
    text: "select \n    p.vk_id, \n    p.first_name, \n    p.last_name, \n    p.birth_date, \n    p.birth_year,\n    p.city,\n    p.counters_friends,\n    p.counters_followers,\n    pc.estimation,\n    pc.has_child,\n    pc.is_in_relationship,\n    pc.correlation_est,\n    p.is_favorite,\n    p.is_related,\n    p.is_closed,\n    p.deactivated,\n    pc.first_checked,\n    p.creation_date,\n    p.update_time,\n    pc.check_update\n    from profiles p, profiles_check pc\n    where p.vk_id = pc.vk_id\n    and p.vk_id = $1",
    values: []
};
module.exports.SQL_SELECT_PROFILES_BY_ID = {
    text: "SELECT * FROM webscraper_db.public.profiles\n    where vk_id = $1;",
    values: []
};
module.exports.SQL_SELECT_PROFILE_SINGLE_CHECK = {
    text: "SELECT * FROM webscraper_db.public.profiles_check\n    where vk_id = $1;",
    values: []
};
module.exports.SQL_UPDATE_PROFILE_CHECK_ESTIMATION = {
    text: "update profiles_check set estimation = $1::numeric, check_update = now ()\n    where vk_id = $2::text",
    values: []
};
module.exports.SQL_UPDATE_PROFILE_DEACTIVATED = {
    text: "update profiles set deactivated = $1, update_time = now()\n    where vk_id = $2::text",
    values: []
};
module.exports.SQL_UPDATE_PROFILE_IS_FAVORITE = {
    text: "update profiles set is_favorite = $1\n    where vk_id = $2::text",
    values: []
};
module.exports.SQL_UPDATE_PROFILE_IS_RELATED = {
    text: "update profiles set is_related = $1\n    where vk_id = $2::text",
    values: []
};
module.exports.SQL_UPDATE_PROFILE_BIRTH_YEAR = {
    text: "update profiles set birth_year = $1\n    where vk_id = $2::text",
    values: []
};
module.exports.SQL_UPDATE_PROFILE_CHECK_CORRELATION_EST = {
    text: "update profiles_check set correlation_est = $1::real, check_update = now ()\n    where vk_id = $2::text",
    values: []
};
module.exports.SQL_UPDATE_PROFILE_CHECK_HAS_CHILD = {
    text: "update profiles_check set has_child = $1::boolean, check_update = now ()\n    where vk_id = $2::text",
    values: []
};
module.exports.SQL_UPDATE_PROFILE_CHECK_IS_IN_RELATIONSHIP = {
    text: "update profiles_check set is_in_relationship = $1::boolean, check_update = now ()\n    where vk_id = $2::text",
    values: []
};
