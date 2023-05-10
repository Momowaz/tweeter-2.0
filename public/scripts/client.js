/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

    const renderTweets = function (tweets) {
        // loops through tweets
        // calls createTweetElement for each tweet
        // takes return value and appends it to the tweets container
        const $tweetContainer = $(".tweets-container");
        $tweetContainer.empty();

        for (const tweet of tweets) {
            const $tweet = createTweetElement(tweet);
            $tweetContainer.prepend($tweet);
            $tweet.find('.timeago').timeago("update", new Date());
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
                <footer class="tweet-footer" data-created-at="${tweet.created_at}">
                    <span class="timeago"></span>
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
        
        const $form = $(this);
        const $tweetContent = $form.find('textarea[name="tweet"]');
        const tweetContent = $("#tweet-text").val();

        if (!tweetContent) {
            alert('Error: Tweet content is empty');
            return;
        } else if (tweetContent.length > 140) {
            alert('Error: Tweet content exceeds 140 characters');
            return;
        }
        
        $.post('/tweets', $form.serialize()) 
        .done( (response) => { 
            console.log(response);
            loadTweets();
            $("#form")[0].reset(); // Clear the form input
            $("#counter").text("140"); // Reset the character counter
            const $tweet = createTweetElement(response);
            $(".tweets-container").prepend($tweet);
        })
        .fail(function(error) {
            alert(error.message);
        });
        // $tweetContent.val("");
    });

    const loadTweets = function() {
        $.getJSON('/tweets', function(data) {
          // success callback function
          console.log('Received JSON data:', data);
          renderTweets(data);
        }).fail(function(jqXHR, textStatus, errorThrown) {
          // error callback function
          console.error('Error loading tweets:', textStatus, errorThrown);
        });
      };
      
    loadTweets();
    renderTweets(data);
});
