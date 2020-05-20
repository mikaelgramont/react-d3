// date and username for all posts
select post_id, post_time, post_username from phpbb_posts order by post_time asc;

// number of posts per week
select count(post_id) as posts, DATE_FORMAT(FROM_UNIXTIME(`post_time`), '%Y-%U') AS 'week' from phpbb_posts group by week;

// number of topics per week
select count(topic_id) as topics, DATE_FORMAT(FROM_UNIXTIME(`topic_time`), '%Y-%U') AS 'week' from phpbb_topics group by week;