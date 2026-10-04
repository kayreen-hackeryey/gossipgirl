/* =========================
   CHARACTER BUTTONS
========================= */

function showCharacter(name) {

    const messages = {

        Serena:
            "Spotted: Serena van der Woodsen is back on the Upper East Side...",

        Blair:
            "Queen B has entered the chat. Everyone else, take notes.",

        Chuck:
            "Chuck Bass. Need I say more?",

        Nate:
            "Nate Archibald. Looks like someone has been keeping secrets..."
    };


    alert(messages[name]);
}


/* =========================
   READ MORE
========================= */

function readMore() {

    alert(
        "Gossip Girl here. There's always more to the story... XOXO."
    );

}


/* =========================
   OPEN FORM
========================= */

function openGossipForm() {

    const modal =
        document.getElementById("gossipModal");

    modal.classList.add("active");

}


/* =========================
   CLOSE FORM
========================= */

function closeGossipForm() {

    const modal =
        document.getElementById("gossipModal");

    modal.classList.remove("active");

}


/* =========================
   SUBMIT GOSSIP
========================= */

function submitGossip() {

    const name =
        document.getElementById("gossipName").value.trim();

    const gossip =
        document.getElementById("gossipText").value.trim();


    /* CHECK GOSSIP */

    if (gossip === "") {

        alert("Gossip Girl needs some tea first...");

        return;

    }


    /* ANONYMOUS NAME */

    const username =
        name === ""
            ? "Anonymous"
            : name;


    /* CREATE GOSSIP OBJECT */

    const newGossip = {

        name: username,

        text: gossip,

        date: new Date().toLocaleDateString()

    };


    /* GET OLD GOSSIP */

    let gossips =
        JSON.parse(
            localStorage.getItem("gossipGirlPosts")
        ) || [];


    /* ADD NEW GOSSIP */

    gossips.unshift(newGossip);


    /* SAVE */

    localStorage.setItem(
        "gossipGirlPosts",
        JSON.stringify(gossips)
    );


    /* CLEAR FORM */

    document.getElementById("gossipName").value = "";

    document.getElementById("gossipText").value = "";


    /* CLOSE */

    closeGossipForm();


    /* UPDATE WEBSITE */

    displayGossip();


    alert("Your gossip has been posted. XOXO, Gossip Girl.");

}


/* =========================
   DISPLAY GOSSIP
========================= */

function displayGossip() {

    const container =
        document.getElementById("communityGossip");


    let gossips =
        JSON.parse(
            localStorage.getItem("gossipGirlPosts")
        ) || [];


    if (gossips.length === 0) {

        container.innerHTML = "";

        container.classList.remove("has-gossip");

        return;

    }


    container.classList.add("has-gossip");


    /*
       Only show the latest 3
       gossip posts
    */

    const latest =
        gossips.slice(0, 3);


    container.innerHTML = "";


    latest.forEach(function(post) {

        const card =
            document.createElement("div");

        card.className = "user-gossip";


        card.innerHTML = `

            <div class="gossip-user">
                Spotted by ${escapeHTML(post.name)}
            </div>

            <div class="gossip-message">
                ${escapeHTML(post.text)}
            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================
   SECURITY
========================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================
   LOAD SAVED GOSSIP
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayGossip();

    }
);