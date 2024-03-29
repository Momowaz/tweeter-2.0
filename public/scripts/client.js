/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
    $(window).scroll(function () {
        const scrollTop = $(this).scrollTop();
        const $navButton = $(".new-tweet button");
        const $scrollTopButton = $(".btn-scroll-top");

        if (scrollTop > 0) {
            $navButton.hide();
            $scrollTopButton.show();
        } else {
            $navButton.show();
            $scrollTopButton.hide();
        }
    });

    $(".btn-scroll-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, "fast");
        $(".new-tweet").slideDown();
        $(".new-tweet textarea").focus();
    });

    $(".new-tweet").hide();

    $(".newTweet").on("click", function () {
        $(".new-tweet").slideToggle("slow", function () {
            $("textarea").focus();
        });
    });
    const renderTweets = function (tweets) {
        // loops through tweets
        // calls createTweetElement for each tweet
        // takes return value and appends it to the tweets container
        const $tweetContainer = $(".tweets-container");
        $tweetContainer.empty();

        for (const tweet of tweets) {
            const $tweet = createTweetElement(tweet);
            $tweetContainer.prepend($tweet);
            $tweet.find(".timeago").timeago("update", new Date(tweet.created_at));
        }
    };

    const createTweetElement = function (tweet) {
        const $tweet = $(`
            <article class="tweet">
                <header class="tweet-header">
                    <span><img src="${tweet.user.avatars}" ${tweet.user.name
            }</span>
                    <span>${tweet.user.handle}</span>
                </header>
                <p class="msg">
                    ${$("<div>").text(tweet.content.text).html()}
                </p>
                <footer class="tweet-footer" data-created-at="${tweet.created_at
            }">
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

    $("#form").on("submit", function (event) {
        event.preventDefault();

        const $form = $(this);
        const $tweetContent = $form.find('textarea[name="tweet"]');
        const tweetContent = $("#tweet-text").val();

        if (!tweetContent) {
            $("#error-message").text("Error: Tweet content is empty").slideDown();
            setTimeout(function () {
                $("#error-message").slideUp();
            }, 3000); // hide the error message after 3 seconds
            return;
        } else if (tweetContent.length > 140) {
            $("#error-message")
                .text("Error: Tweet content exceeds 140 characters")
                .slideDown();
            setTimeout(function () {
                $("#error-message").slideUp();
            }, 3000); // hide the error message after 3 seconds
            return;
        }

        $.post("/tweets", $form.serialize())
            .done((response) => {
                console.log(response);
                loadTweets();
                $("#form")[0].reset(); // Clear the form input
                $(".counter").text("140"); // Reset the character counter
                const $tweet = createTweetElement(response);
                $(".tweets-container").prepend($tweet);
            })
            .fail(function (error) {
                alert(error.message);
            });
    });

    const loadTweets = function () {
        $.getJSON("/tweets", function (data) {
            // success callback function
            renderTweets(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            // error callback function
            console.error("Error loading tweets:", textStatus, errorThrown);
        });
    };

    loadTweets();
    renderTweets(data);
});
