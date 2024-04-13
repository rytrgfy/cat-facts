let btn = document.querySelector("#button");
let input = document.querySelector("#inputs-item");
let factContainer = document.querySelector("#fact-container");

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

btn.addEventListener("click", async() => {
    if (input.value === "") {
        alert("Please enter a number!");
        return;
    }

    let numberOfFacts = parseInt(input.value);

    if (isNaN(numberOfFacts) || numberOfFacts <= 0) {
        alert("Please enter a valid positive number!");
        return;
    }

    try {
        let response = await fetch(`https://catfact.ninja/facts?limit=${numberOfFacts}`);

        if (!response.ok) {
            throw new Error("Failed to fetch cat facts");
        }

        let data = await response.json();

        factContainer.innerHTML = "";

        shuffleArray(data.data);

        let ulElement = document.createElement("ul");
        ulElement.classList.add("decimal-list");

        data.data.forEach((fact, index) => {
            let liElement = document.createElement("li");
            ulElement.appendChild(liElement);
            factContainer.appendChild(ulElement);

            animateText(fact.fact, liElement);
        });

    } catch (error) {
        console.error("Error fetching cat facts:", error);
        alert("Failed to fetch cat facts. Please try again later.");
    }
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function animateText(text, element) {
    const delay = 50;

    for (let i = 0; i < text.length; i++) {
        await sleep(delay);
        element.textContent += text.charAt(i);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}