// Implement your race logic here
let raceFinished = false;
let money = 100;
let animationInProgress = false;
let minSpeed = 0;
let betPlaced = false;
let isRain = false;
const cars = ['Red Bull', 'Mercedes', 'Ferrari', 'Aston Martin'];
let hoverSound;
let carSound;

//tan awn sa nako ang size sa window kay giatay
const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

console.log(`Window width: ${windowWidth}, Window height: ${windowHeight}`);

//kwaon ang chosenCar variable gikan sa startGame.js
const urlParams = new URLSearchParams(window.location.search);
const chosenCar = urlParams.get('chosenCar');

//sfx ni aring dapita
document.addEventListener('DOMContentLoaded', function () {
    var backgroundMusic = document.getElementById('backgroundMusic');
    var hoverSound = new Audio('SFX/bitSelect.mp3');
 

    // Preload the audio file
    hoverSound.load();
    playBackgroundMusic();
    //backgroundMusic.volume = 0.5; 

    //backbutton sfx
    var backButton = document.getElementById('backButton');
    backButton.addEventListener('mouseover', function () {
        hoverSound.currentTime = 0; // Reset the audio to the beginning
        hoverSound.play();
    });

    backButton.addEventListener('click', function () {
        playClickSound(); // Play click sound when backButton is clicked
        startGame();
      });

      var startRaceButton = document.querySelector('.startQuitContainer img[alt="Start Race"]');
    startRaceButton.addEventListener('mouseover', function () {
        hoverSound.currentTime = 0; // Reset the audio to the beginning
        hoverSound.play();
    });
    startRaceButton.addEventListener('click', function () {
        playClickSound(); // Play click sound when backButton is clicked
      });

    // Hover sound for the "Quit Race" button
    var quitRaceButton = document.querySelector('.startQuitContainer img[alt="Quit"]');
    quitRaceButton.addEventListener('mouseover', function () {
        hoverSound.currentTime = 0; // Reset the audio to the beginning
        hoverSound.play();
    });
    quitRaceButton.addEventListener('click', function () {
        playClickSound(); // Play click sound when backButton is clicked
      });
      
      var betButton = document.querySelector('.place-bet-button img[alt="Place Bet"]');
      betButton.addEventListener('mouseover', function () {
          hoverSound.currentTime = 0; // Reset the audio to the beginning
          hoverSound.play();
      });

    function playBackgroundMusic() {
        // Play the background music automatically
        if (document.location.href.includes('rainy.html')) {
            backgroundMusic.src = "SFX/RainyTerrain.mp3";
        } else if (document.location.href.includes('night.html')) {
            backgroundMusic.src = "SFX/NightTerrain.mp3";
        } else {
            backgroundMusic.src = "SFX/SunnyTerrain.mp3";
        }
        backgroundMusic.play();
    }
});

function startRace() {
    // Add logic to start the race
    // Move the cars, determine the winner, update money, etc.
    //alert('Race started! Implement your race logic here.');
    animationInProgress = false;
    raceFinished = false;
    
    playCarSound();
    // Check if the bet amount is 0
    if (!betPlaced) {
        stopCarSound();
        alert('Place a bet before starting the race.');
        return;
    } else {
        
        var road = document.getElementById('road');
        road.classList.add('moveRoad');

        startCar('Red Bull');
        startCar('Mercedes');
        startCar('Ferrari');
        startCar('Aston Martin');

        /*var puddle1 = document.getElementById('puddle1');
        puddle1.classList.add('moveObstacle');
        var puddle2 = document.getElementById('puddle2');
        puddle2.classList.add('moveObstacle');
        var puddle3 = document.getElementById('puddle3');
        puddle3.classList.add('moveObstacle');
        var puddle4 = document.getElementById('puddle4');
        puddle4.classList.add('moveObstacle');*/
        animationInProgress = true;
        setTimeout(function () {
            raceFinished = true;
            displayResults();
            openModal();
        }, minSpeed * 1000);


        if (isRain) {
            var puddle1 = document.getElementById('puddle1');
            puddle1.classList.add('moveObstacle');
            var puddle2 = document.getElementById('puddle2');
            puddle2.classList.add('moveObstacle');
            var puddle3 = document.getElementById('puddle3');
            puddle3.classList.add('moveObstacle');
            var puddle4 = document.getElementById('puddle4');
            puddle4.classList.add('moveObstacle');
        } else {
            var duck1 = document.getElementById('duck1');
            duck1.classList.add('moveObstacle');
            var duck2 = document.getElementById('duck3');
            duck2.classList.add('moveObstacle');

            var rock1 = document.getElementById('rock1');
            rock1.classList.add('moveObstacle');
            var rock2 = document.getElementById('rock3');
            rock2.classList.add('moveObstacle');
        }
        
        hoverSound.currentTime = 0; // Reset the audio to the beginning
        hoverSound.play();
    }
}



function startCar(carId) {

    var speed = Math.random() * 9 + 6;

    if (speed > minSpeed) {
        minSpeed = speed;
    }

    var car = document.getElementById(carId);

    //var animation = car.style.animation;
    //var duration = parseFloat(animation.split(' ')[1]);

    const currentUrl = window.location.href;

    //if it is opened in the rainy.html
    if (currentUrl.includes('rainy.html') && (currentUrl.includes('?chosenCar=' + chosenCar) || currentUrl.includes('?chosenCar=Aston%20Martin') || currentUrl.includes('?chosenCar=Red%20Bull'))) {
        isRain = true;
        car.classList.add('moveStuck');
        car.style.animation = 'moveStuck ' + speed + 's linear forwards';
    
    //if it is opened in the night.html
    } else if (currentUrl.includes('night.html') && (currentUrl.includes('?chosenCar=' + chosenCar) || currentUrl.includes('?chosenCar=Aston%20Martin') || currentUrl.includes('?chosenCar=Red%20Bull'))) {
        //alert('night baka piste');
        
        car.classList.add('moveDownRight');
        car.style.animation = 'moveDownRight ' + speed + 's linear forwards';

    } else {
        //alert('This is not the specific HTML file or does not have the correct chosenCar parameter');
        car.classList.add('moveRight');
        car.style.animation = 'moveRight ' + speed + 's linear forwards';    
    }

    
}



function updateMoneyDisplay() {
    document.getElementById('money').innerText = `${money}`;
}

function displayResults() {
    console.log("Displaying results");
    if (raceFinished) {
        animationInProgress = false;
        // Sort cars based on the finish time (animation duration)
        cars.sort((a, b) => {
            const carA = document.getElementById(a);
            const carB = document.getElementById(b);
            return parseFloat(getComputedStyle(carA).animationDuration) -
                parseFloat(getComputedStyle(carB).animationDuration);
        });

        // Display the results in an alert
        let resultMessage = 'Race Results:\n';
        for (let i = 0; i < cars.length; i++) {
            const carId = cars[i];
            resultMessage += `Position ${i + 1}: ${carId}\n`;
        }
        

        // Get the first car (winner) from the sorted array
        const winner = cars[0];


        // Check if the winner matches the chosenCar
        if (winner === chosenCar) {
            // User's chosen car won, update user's money
            const betAmount = parseFloat(document.getElementById('betAmount').value);
            money += (betAmount * 4);
            resultMessage += `\nCongratulations! Your chosen car (${chosenCar}) won. You won ${betAmount} coins.`;
        } else {
            // User's chosen car didn't win, deduct from user's money
            const betAmount = parseFloat(document.getElementById('betAmount').value);
            //money -= betAmount;
            resultMessage += `\nSorry, your chosen car (${chosenCar}) didn't win. You lost ${betAmount} coins.`;
        }
        updateMoneyDisplay();

        // Update the user's money in the HTML
        document.getElementById('money').innerText = `${money}`;

        // Update the content of the rankingModal
        const rankingModalContent = document.querySelector('.ranking-container');
        rankingModalContent.innerHTML = `
            <div class="ranking">RANKINGS</div>
            <div class="ranking">1st Place: ${cars[0]}</div>
            <div class="ranking">2nd Place: ${cars[1]}</div>
            <div class="ranking">3rd Place: ${cars[2]}</div>
            <div class="ranking">4th Place: ${cars[3]}</div>
            <br> <!-- Add a line break here -->
            <div class="ranking">${cars[0] === chosenCar ? `Congratulations! Your chosen car (${chosenCar}) won.` : `Sorry, your chosen car (${chosenCar}) didn't win.`}</div>
            <br> <!-- Add a line break here -->
            <div class="ranking">Total Money: ${money} coins</div>
            <button onclick="closeModal()">Bet Again</button>
        `;
        // Show the modal after a delay (e.g., 500 milliseconds)
        setTimeout(() => {
            stopCarSound();
            // Display the modal
            openModal();
        }, 500);
    }
}


function goBack() {
    // Add logic to go back to the previous page or handle navigation
    //alert('Going back to the previous page.');
    window.location.href = 'vroom.html';
}


function placeBet() {
    const betAmount = parseFloat(document.getElementById('betAmount').value);

    // Check if the bet amount is valid
    if (isNaN(betAmount) || betAmount <= 0) {
        alert('Please enter a valid bet amount.');
        ErrorSound();
        return;
    }

    // Check if the user has enough money to place the bet
    if (betAmount > money) {
        alert('You don\'t have enough money to place this bet.');
        ErrorSound();
        return;
    }

    if (money < 0) {
        alert('You don\'t have enough money');
        ErrorSound();
        return;
    }

    // Update the user's money (deduct the bet amount)
    money -= betAmount;
    playBetSound();
    // Update the displayed money in the HTML
    updateMoneyDisplay();
    betPlaced = true;
}

function reset() {
    // Remove animation class from road
    var road = document.getElementById('road');
    road.classList.remove('moveRoad');

    // Reset car positions
    resetCarPosition('Red Bull');
    resetCarPosition('Mercedes');
    resetCarPosition('Ferrari');
    resetCarPosition('Aston Martin');

    if (isRain) {
        //Reset puddle animation
        var puddle1 = document.getElementById('puddle1');
        puddle1.classList.remove('moveObstacle');
        puddle1.style.transform = 'translateX(1800px)';

        var puddle2 = document.getElementById('puddle2');
        puddle2.classList.remove('moveObstacle');
        puddle2.style.transform = 'translateX(1800px)';

        var puddle3 = document.getElementById('puddle3');
        puddle3.classList.remove('moveObstacle');
        puddle3.style.transform = 'translateX(1800px)';

        var puddle4 = document.getElementById('puddle4');
        puddle4.classList.remove('moveObstacle');
        puddle4.style.transform = 'translateX(1800px)';
    } else {
        // Reset duck positions
        var duck1 = document.getElementById('duck1');
        duck1.classList.remove('moveObstacle');
        duck1.style.transform = 'translateX(1800px)';
        
        var duck2 = document.getElementById('duck3');
        duck2.classList.remove('moveObstacle');
        duck2.style.transform = 'translateX(1800px)';
        
        // Reset rock positions
        var rock1 = document.getElementById('rock1');
        rock1.classList.remove('moveObstacle');
        rock1.style.transform = 'translateX(1800px)';
        
        var rock2 = document.getElementById('rock3');
        rock2.classList.remove('moveObstacle');
        rock2.style.transform = 'translateX(1800px)';

    }

    
}


function resetCarPosition(carId) {
    var car = document.getElementById(carId);
    car.classList.remove('moveRight', 'moveDownRight', 'moveObstacle');
    car.style.animation = 'none'; // Reset the animation
    car.style.transform = 'translateX(0)'; // Reset the position
}   


//rankings modal ari lng modify
function openModal() {
    // Show the overlay
    document.querySelector('.overlay').style.display = 'block';
    // Show the modal
    document.getElementById('rankingModal').style.display = 'block';
}

function closeModal() {
    
    betPlaced = false;

    // Clear the betAmount input field
    document.getElementById('betAmount').value = '';
    // Hide the overlay
    document.querySelector('.overlay').style.display = 'none';
    // Hide the modal
    document.getElementById('rankingModal').style.display = 'none';
    reset();

}

function playClickSound() {
    var clickSound = new Audio('SFX/bitClick.mp3'); // Replace 'SFX/bitClick.mp3' with the path to your click sound
    clickSound.play();
}


function ErrorSound() {
    var errorSound = new Audio('SFX/errorSound.mp3'); // Replace 'SFX/bitClick.mp3' with the path to your click sound
    errorSound.play();
}

function playBetSound() {
    var engineStart = new Audio('SFX/EngineStart.mp3'); 
    var betSound = new Audio('SFX/MoneySpent.mp3'); // Replace 'SFX/bitClick.mp3' with the path to your click sound
    betSound.play();
    engineStart.play();
    setTimeout(function () {
        engineStart.pause();
        engineStart.currentTime = 0;
    }, 10000); // 10000 milliseconds = 10 seconds
}

function playCarSound() {
    carSound = new Audio('SFX/CarSound.mp3');
    // Play CarSound continuously until the modal is open
    carSound.loop = true;
    carSound.volume = 0.5;
    carSound.play();
}

function stopCarSound() {
    if (carSound) {
        // Gradually decrease volume before pausing
        var volume = carSound.volume;
        var fadeInterval = 50; // Adjust the fade interval as needed

        var fadeOut = setInterval(function () {
            if (volume > 0) {
                volume -= 0.05; // Adjust the volume decrement as needed
                carSound.volume = volume;
            } else {
                clearInterval(fadeOut);
                carSound.pause();
                carSound.currentTime = 0;
                carSound.volume = 0.5; // Reset the volume to its original value
            }
        }, fadeInterval);
    }
}

