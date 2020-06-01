// date and username for all posts
select post_id, post_time, post_username from phpbb_posts order by post_time asc;

// number of posts per week
select count(post_id) as posts, DATE_FORMAT(FROM_UNIXTIME(`post_time`), '%Y-%U') AS 'week' from phpbb_posts group by week;

// number of topics per week
select count(topic_id) as topics, DATE_FORMAT(FROM_UNIXTIME(`topic_time`), '%Y-%U') AS 'week' from phpbb_topics group by week;

// Skip topics with no date
select count(topic_id) as topics, DATE_FORMAT(FROM_UNIXTIME(`topic_time`), '%Y-%U') AS 'week' from phpbb_topics where topic_time > 0 and (topic_time < 1344380844 or topic_time > 1344419917) group by week;

// Skip that week in August 2012 where there was a lot of spam
select count(topic_id) as topics, DATE_FORMAT(FROM_UNIXTIME(`topic_time`), '%Y-%U') AS 'week' from phpbb_topics where topic_time > 1344124800   and topic_time < 1344729600   group by week;

select * from phpbb_topics where topic_time > 1344124800   and topic_time < 1344729600;

// Total of posts per user, not counting anonymous posts
select phpbb_posts.poster_id, phpbb_users.username, count(phpbb_posts.poster_id) as posts, phpbb_users.user_avatar as avatar from phpbb_posts join phpbb_users on phpbb_users.user_id = phpbb_posts.poster_id where phpbb_posts.poster_id > 1 group by phpbb_posts.poster_id order by posts desc;