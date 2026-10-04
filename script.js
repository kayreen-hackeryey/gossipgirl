/* =====================================================
   CHARACTER BUTTONS
===================================================== */

function showCharacter(name) {

    const messages = {

        Serena:
            "Spotted: Serena van der Woodsen is back on the Margonda...",

        Blair:
            "Queen B has entered the chat. Everyone else, take notes.",

        Chuck:
            "Chuck Bass. Need I say more?",

        Nate:
            "Nate Archibald. Looks like someone has been keeping secrets..."

    };


    alert(messages[name]);

}


/* =====================================================
   READ MORE
===================================================== */

function readMore() {

    alert(
        "Gossip Girl here. There's always more to the story... XOXO."
    );

}


/* =====================================================
   OPEN SUBMIT FORM
===================================================== */

function openGossipForm() {

    document
        .getElementById("gossipModal")
        .classList.add("active");

}


/* =====================================================
   CLOSE SUBMIT FORM
===================================================== */

function closeGossipForm() {

    document
        .getElementById("gossipModal")
        .classList.remove("active");

}


/* =====================================================
   SUBMIT GOSSIP
===================================================== */

function submitGossip() {

    const name =
        document
            .getElementById("gossipName")
            .value
            .trim();


    const gossip =
        document
            .getElementById("gossipText")
            .value
            .trim();


    if (gossip === "") {

        alert(
            "Gossip Girl needs some tea first..."
        );

        return;

    }


    const username =
        name === ""
            ? "Anonymous"
            : name;


    const newGossip = {

        name: username,

        text: gossip,

        date: new Date().toLocaleDateString()

    };


    let gossips =
        JSON.parse(
            localStorage.getItem("gossipGirlPosts")
        ) || [];


    gossips.unshift(newGossip);


    localStorage.setItem(
        "gossipGirlPosts",
        JSON.stringify(gossips)
    );


    document
        .getElementById("gossipName")
        .value = "";


    document
        .getElementById("gossipText")
        .value = "";


    closeGossipForm();


    displayGossip();


    alert(
        "Your gossip has been posted. XOXO, Gossip Girl."
    );

}


/* =====================================================
   DISPLAY USER GOSSIP
===================================================== */

function displayGossip() {

    const container =
        document.getElementById(
            "communityGossip"
        );


    let gossips =
        JSON.parse(
            localStorage.getItem("gossipGirlPosts")
        ) || [];


    if (gossips.length === 0) {

        container.innerHTML = "";

        container.classList.remove(
            "has-gossip"
        );

        return;

    }


    container.classList.add(
        "has-gossip"
    );


    const latest =
        gossips.slice(0, 5);


    container.innerHTML = "";


    latest.forEach(function(post) {


        const card =
            document.createElement("div");


        card.className =
            "user-gossip";


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


/* =====================================================
   SECURITY
===================================================== */

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent = text;


    return div.innerHTML;

}


/* =====================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "gossipModal"
            );


        if (
            event.target === modal
        ) {

            closeGossipForm();

        }

    }
);


/* =====================================================
   LOAD SAVED GOSSIP
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayGossip();

    }
);