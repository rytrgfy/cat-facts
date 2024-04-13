let btn = document.querySelector("#button");
let input = document.querySelector("#inputs-item");
let factContainer = document.querySelector("#fact-container");

btn.addEventListener("click", async() => {
    if (input.value == "") {
        alert("Please enter something!");
    } else {
        let numberOfFacts = parseInt(input.value);

        if (isNaN(numberOfFacts) || numberOfFacts <= 0) {
            alert("Please enter a valid positive number!");
            return;
        }

        try {
            let response = await fetch(`https://catfact.ninja/facts?limit=${numberOfFacts}`);

            if (!response.ok) {
                console.error("Failed to fetch cat facts:", response.statusText);
                return;
            }

            let data = await response.json();

            factContainer.innerHTML = ""; // Clear previous facts from the container

            // Shuffle the array of facts randomly
            shuffleArray(data.data);

            let ulElement = document.createElement("ul");
            ulElement.classList.add("decimal-list"); // Add a class to style the list

            data.data.forEach((fact, index) => {
                let liElement = document.createElement("li");
                liElement.textContent = fact.fact;
                ulElement.appendChild(liElement);
            });

            factContainer.appendChild(ulElement);

        } catch (error) {
            console.error("Error fetching cat facts:", error);
        }

        // Function to shuffle array elements randomly
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

    }
});