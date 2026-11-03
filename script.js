const picsContainer = document.getElementById("pics")
const audioContainer = document.getElementById("audio")
const audioButton = document.getElementById("playAudio")





let levels = {
    "1":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    "2":[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
    "3":[41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69]
}



let pairs;
let currentIndex;
let selectedNumber;




function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
}


function startRound(level) {
    pairs = [...levels[level]];
    shuffle(pairs);

    currentIndex = 0;
    selectedNumber = null;

    nextRound();
}


function nextRound() {
    selectedNumber = null;

    const currentAudio = pairs[currentIndex];

    picsContainer.innerHTML = "";

    const memePreview = document.getElementById("meme-preview");
    memePreview.src = "";

    setAudio(currentAudio);
    showImages(currentAudio);
}


function showImages(correctNumber) {
    let options = [correctNumber];

    while (options.length < 4) {
        const randomNumber =
            pairs[Math.floor(Math.random() * pairs.length)];

        if (!options.includes(randomNumber)) {
            options.push(randomNumber);
        }
    }

    shuffle(options);

    for (let i = 0; i < options.length; i++) {
        const number = options[i];

        const card = document.createElement("div");
        card.classList.add("image-card");
        card.id = number;

        const img = document.createElement("img");
        img.src = `files/memes/${number}.jpg`;

        card.append(img);
        picsContainer.append(card);

        card.addEventListener("click", () => {
            document.querySelectorAll(".image-card").forEach(card => {
                card.classList.remove("selected", "wrong");
            });

            selectedNumber = Number(card.id);
            card.classList.add("selected");

            const memePreview = document.getElementById("meme-preview");
            memePreview.src = `files/memes/${card.id}.jpg`;
        });
    }
}

const player = document.getElementById("player")

function setAudio (audio) {
    player.src = `files/audio/${audio}.MP3`;
}

function playAudio () {
    
        
        player.currentTime = 0;
        player.play();
}


audioButton.addEventListener("click", () => {
 playAudio ()
})

//Meme Preview
const checkButton = document.getElementById("checkAnswer")
checkButton.addEventListener("click", () => {
    checkAnswer()
})
 

function checkAnswer() {


      if (selectedNumber === null) {
        return;
    }

    const correctNumber = pairs[currentIndex];

    if (selectedNumber === correctNumber) {

        const selectedCard =
            document.querySelector(".image-card.selected");

            
        selectedCard.classList.remove("selected")
        selectedCard.classList.add("correct");

        setTimeout(() => {
            selectedCard.classList.remove("correct");
        }, 300);



        currentIndex++;

        if (currentIndex >= pairs.length) {
            showModal()
            return;
        }

        nextRound();

    } else {

        const selectedCard =
            document.querySelector(".image-card.selected");

            
        selectedCard.classList.remove("selected")
        selectedCard.classList.add("wrong");

        setTimeout(() => {
            selectedCard.classList.remove("wrong");
        }, 300);

    }
}


function showModal() {
    const modal = document.getElementById("modal");

    modal.style.display = "block";
    
}


//startRound("2") 