/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

    
    const data = [
        {
            user: {
                name: "Newton",
                avatars: "https://i.imgur.com/73hZDYK.png",
                handle: "@SirIsaac",
            },
            content: {
                text: "If I have seen further it is by standing on the shoulders of giants",
            },
            created_at: 1461116232227,
        },
        {
            user: {
                name: "Descartes",
                avatars: "https://i.imgur.com/nlhLi3I.png",
                handle: "@rd",
            },
            content: {
                text: "Je pense , donc je suis",
            },
            created_at: 1461113959088,
        },
    ];

    const renderTweets = function (tweets) {
        // loops through tweets
        // calls createTweetElement for each tweet
        // takes return value and appends it to the tweets container
        const $tweetContainer = $(".tweets-container");
        for (const tweet of tweets) {
            const $tweet = createTweetElement(tweet);
            $tweetContainer.append($tweet);
        }
    };

    const createTweetElement = function (tweet) {
        const $tweet = $(`
      <article class="tweet">
            <header class="tweet-header">
              <span><img src="${tweet.user.avatars}" ${tweet.user.name}</span>
              <span>${tweet.user.handle}</span>
            </header>
            <p class="msg">
              ${tweet.content.text}
            </p>
            <footer class="tweet-footer">
                100 days ago
              <span class="icons">
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-repeat"></i>
                <i class="fa-solid fa-heart"></i>
              </span>
            </footer>
          </article>`);

        return $tweet;
    };

    $("#form").on("submit", function(event) {
        // alert('submitted');
        
        event.preventDefault();
        const tweetData = $( this ).serialize();
        $.post('/tweets', {text: tweetData}) 
        .done( (response) => { 
            console.log(response);
        })
        
    });
    renderTweets(data);
});
