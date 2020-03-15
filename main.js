// let userList = [];

let id = 0;
let tweetList = [];

// Danny's Variables
let page = 1
let newsList = [];
let apiKey = `c74225add6af4f70b0edb124c26f779e`;
let todoList = [];
let currentUser = "danny"  // let's a ssume the current user is danny (you will have to make it so that user can choose whatever the name)

// Danny's Function
let callAPI = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}&page=${page}`
    let data = await fetch(url);
    let result = await data.json();
    console.log("data", data);
    console.log("json", result)

    newsList = newsList.concat(result.articles);
    console.log('data', data);
    console.log('json', result);
    console.log('article list', newsList);

    twitterRender(newsList)
}


//set the Areas
let userNameInputArea = document.getElementById("userNameInputArea");
let contentInputArea = document.getElementById("contentInputArea");

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
addButton.addEventListener("click", addTweet);
//Add a tweet
function addTweet(e) {
    e.preventDefault()
    let userName = userNameInputArea.value;
    let content = contentInputArea.value;
    let tweet = {
        id: id,
        user: userName,
        content: content,
        timePosted: null,
        comments: [],
        likes :[]
    }
    tweetList.push(tweet);
    console.log('tweetList:', tweetList);
    render(tweetList);
    id++
}
function checkIfUserHasLike(item){
    return item.likes.includes(currentUser)  // item here is passed when called, item is a single tweet, and it has likes array inside. This function will return a BOOLEAN
    // if already liked (true) we render "unlike" text, if not liked yet, render "like" 
}

function render(array) { // wait, why do you have
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
                    <a href="#" class="card-link" onclick="toggleLike('${item.id}')">${ checkIfUserHasLike(item) ? "unlike" : "like"}</a>
                    <a href="#" class="card-link" onclick="comment('${item.id}')">Comment</a>
                    <a href="#" class="card-link" onclick="retweet('${item.id}')">Retweet</a>
                    <a href="#" class="card-link" onclick="deleteTweet('${item.id}')">Delete</a>
                </div>      
            </div>
          </div>
      </div>
</form>`
    }).join('')
    document.getElementById("tweetArea").innerHTML = htmlForTweet;

}
    

let twitterRender = (array) => { 
        let htmlForNews = array.map((item, index) => {
            return `<div id="newsArea">
           <img style="height: 125px;"
           src="${item.urlToImage}"
               alt="">
           <div>
               <h5>${item.title}</h5>
               <p>${item.author}</p>
               <a href="${item.url}">Get Full Coverage</a> 
                <div>${item.description}</div>
                <div>${moment(item.publishedAt, "YYYYMMDD").fromNow()}</div>
           </div>   
       </div> 
       `;
        }).join('')

        document.getElementById('newsArea').innerHTML = htmlForNews;
    }
    callAPI()

    function toggleLike(tweetID) {
    

        let index = tweetList.findIndex(e=> e.id == tweetID);
        // now instead of switching true false ( only work with 1 user). We now add the currentuser to the likes array ok
        // but first define the like array first, go back to where we add a new tweet
        // everytime user click this button, we check if that user already like this tweet or not. (using includes method)
        

        // if yes, we unlike by remove this user from the array
        if(tweetList[index].likes.includes(currentUser))  // currentUser defined at the top
        tweetList[index].likes = tweetList[index].likes.filter(e => e !== currentUser) // filter to keep only users that not match currentUser
        // if no, we add this user to the like array
        else 
        tweetList[index].likes.push(currentUser) // pushing currentUser to likes array

        render(tweetList) // now render
    }



    

    function retweet(originID) {
        let originTweet = tweetList.filter((tweet) => tweet.id == originID);
        let retweetObject = {
            id: id,
            content: originTweet[0].content,
            originTweetID: originID,
            isLiked: false,
            timePosted: null
        }
        tweetList.push(retweetObject);
        render(tweetList);
        console.log(tweetList);
        id++
    }

    function deleteTweet(deleteID) {
        //filter OUT tweets without the deleteID -- both origin tweet and retweets
        let tweetList = tweetList.find((tweet) => {
            return tweet.id == !deleteID && tweet.originTweetID == !deleteID
        });
        render(tweetList);
    }





