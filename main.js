// let userList = [];

let id;

let tweetList = [];



//set the Areas
let userNameInputArea = document.getElementById("userNameInputArea");
let contentInputArea = document.getElementById("contentInputArea");
document.getElementById("tweetArea").innerHTML="saysum"
// let userName;

// //save data to local storage
// function saveUser(){
//     let str = JSON.stringify(userList);
//     localStorage.setItem("userList", str);
// }

// //get data from local storage
// function getUser(){
//     let str = localStorage.getItem("userList");
//     userList = JSON.parse(str);
//     if(!userList){
//         userList=[]
//     }
// }

let addButton = document.getElementById("tweetButton")
addButton.addEventListener("click",addTweet);
//Add a tweet
function addTweet(e){
    e.preventDefault()
    let userName = userNameInputArea.value;
    let content = contentInputArea.value;
    let tweet = {
        id: id,
        user: userName,
        content: content,
        timePosted: null,
        isLiked: false,
        comments: []
    }
    tweetList.push(tweet);
    console.log('tweetList:',tweetList);
    render(tweetList);
    id++
}

function render(array){
    let htmlForTweet = array.map((item) => {
        return `<form>
        <div class="card nguyen-card" style="width: 100%;">
            <div class="card-body nguyen-card-body d-flex">
                <div class="left col-2">
                    <img src="logo.png" width="90px"> 
                </div>
                <div class="right col-10">
                    <h5 class="card-title">Earl Pullara</h5>
                    <h6 class="card-subtitle mb-2 text-muted">@earlpullara</h6>
                    <p class="card-text">${item.content}</p>
                    <a href="#" class="card-link" onclick="toggleLike('${item.id}')">Like</a>
                    <a href="#" class="card-link" onclick="comment('${item.id}')">Comment</a>
                    <a href="#" class="card-link" onclick="retweet('${item.id}')">Retweet</a>
                    <a href="#" class="card-link" onclick="deleteTweet('${item.id}')">Delete</a>
                </div>      
            </div>
          </div>
      </div>
</form>`
    })
    document.getElementById("tweetArea").innerHTML=htmlForTweet
}

//when pressed Like
function toggleLike(tweetID){
//find the tweet
//change the like to unlike
}

function retweet(originID){
    let originTweet = tweetList.filter((tweet) => tweet.id == originID);
    let retweetObject = {
        id: id,
        content: originTweet.content,
        originTweetID: originID,
        isLiked: false,
        timePosted: null
    }
    render(tweetList);
    console.log(tweetList);
    id++
}

function deleteTweet(deleteID){
    //filter OUT tweets without the deleteID -- both origin tweet and retweets
    let tweetList = tweetList.find((tweet) => {
        return tweet.id == !deleteID && tweet.originTweetID == !deleteID
    });
    render (tweetList);
}

