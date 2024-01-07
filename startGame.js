let terrainSelected = false; // Variable to track whether a terrain is selected
let carSelected = false; // Variable to track whether a car is selected
let selectedTerrain;
let selectedCar;

//SFX
document.addEventListener('DOMContentLoaded', function () {
    // Get the audio element
    var backgroundMusic = document.getElementById('backgroundMusic');
    var hoverSound = new Audio('SFX/bitSelect.mp3');
    var switchSound = new Audio('SFX/SwitchSelection.mp3');

    // Preload the audio file
    hoverSound.load();
    backgroundMusic.volume = 0.3; 

    document.addEventListener('keydown', function(event) {
        // Check if the pressed key is the spacebar (key code 32)
        if (event.keyCode === 32) {
            toggleBackgroundMusic();
        }
    });
    

    // Add hover + click sound to startButton
    var startButton = document.getElementById('startButton');
    startButton.addEventListener('mouseover', function () {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });

    startButton.addEventListener('click', function () {
        playClickSound();
        startGame();
      });



    // Add hover + click sound to quitButton
    var quitButton = document.getElementById('quitButton');
    quitButton.addEventListener('mouseover', function () {
        hoverSound.currentTime = 0; 
        hoverSound.play();
        
    });

    quitButton.addEventListener('click', function () {
        playClickSound();
        quitGame();
      });

    //hover + click sound to backbutton in terrain selection
    var backButtonTerrainSelection = document.getElementById('backButtonTerrainSelection');
    backButtonTerrainSelection.addEventListener('mouseover', function () {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
    backButtonTerrainSelection.addEventListener('click', function(){
        playClickSound();
        goBack();
    })

    var nextButtonTerrainSelection = document.getElementById('nextButtonTerrainSelection');  
    nextButtonTerrainSelection.addEventListener('mouseover', function () {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });

    nextButtonTerrainSelection.addEventListener('click', function () {
        playClickSound();
        proceedToNextStepAfterTerrain();
    });

    // hover + click sound to back button in car selection
    var backButtonCarSelection = document.getElementById('backButtonCarSelection');
    backButtonCarSelection.addEventListener('mouseover', function () {
        hoverSound.currentTime = 0; 
        hoverSound.play();
    });
    backButtonCarSelection.addEventListener('click', function(){
        playClickSound();
        openTerrainSelection();
    })
    

    // hover + click sound to next button in car selection
    var nextButtonCarSelection = document.getElementById('nextButtonCarSelection');
    nextButtonCarSelection.addEventListener('mouseover', function () {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
    nextButtonCarSelection.addEventListener('click', function(){
        playClickSound();
        proceedToNextStep();
    })

     //selection sfx
     var carElements = document.querySelectorAll('.car');
     carElements.forEach(function (carElement) {
         carElement.addEventListener('mouseover', function () {
             switchSound.currentTime = 0; // Reset the audio to the beginning
             switchSound.play();
         });
     });
 
     var terrainElements = document.querySelectorAll('.terrain');
     terrainElements.forEach(function (terrainElement) {
         terrainElement.addEventListener('mouseover', function () {
             switchSound.currentTime = 0; // Reset the audio to the beginning
             switchSound.play();
         });
     });
});



function startGame() {
    // Hide the start screen
    document.getElementById('startScreen').style.display = 'none';

    // Move the car
    var carFront = document.getElementById('carFront');
    var carImg = carFront.querySelector('img');
    
    if (!carFront.classList.contains('animated')) {
        // Move the car
        carFront.classList.add('animated'); // Add a class to mark the car as animated
        carImg.style.animation = 'moveRight 2s linear forwards';
    }
    // Optionally, you can add logic here to proceed to the next step
    setTimeout(function () {
        showTerrainSelection();
    }, 10);
}

function showTerrainSelection() {
    // Hide the start screen
    document.getElementById('startScreen').style.display = 'none';

    // Show the terrain selection screen
    document.getElementById('terrainSelection').style.display = 'block';
}

function selectTerrain(chosenTerrain) {
        selectedTerrain = chosenTerrain.dataset.terrain;
        terrainSelected = true;

    var previouslySelectedTerrain= document.querySelector('.terrain.enlarged');
    if (previouslySelectedTerrain) {
        previouslySelectedTerrain.classList.remove('enlarged');
    }

    // Enlarge the newly selected car
    chosenTerrain.classList.add('enlarged');
    playClickSound();
}

function showCarSelection() {
    // Hide the terrain selection screen
    document.getElementById('terrainSelection').style.display = 'none';

    // Show the car selection screen
    document.getElementById('carSelectionScreen').style.display = 'block';
}

function selectCar(chosenCar) {
    // If no car is selected, set the selected car
    selectedCar = chosenCar.dataset.car;
    carSelected = true;

    var previouslySelectedCar = document.querySelector('.car.enlarged');
    if (previouslySelectedCar) {
        previouslySelectedCar.classList.remove('enlarged');
    }

    // Enlarge the newly selected car
    chosenCar.classList.add('enlarged');
    playClickSound();


    // Optionally, you can remove the alert here
    //alert('You selected: ' + selectedCar);
}



function goBack() {
    // Check if the car selection screen is visible
    if (document.getElementById('carSelectionScreen').style.display === 'block') {
        // If yes, go back to terrain selection
        document.getElementById('carSelectionScreen').style.display = 'none';
        document.getElementById('terrainSelection').style.display = 'block';
        carSelected = false; // Reset car selection
    } else if (document.getElementById('terrainSelection').style.display === 'block') {
        // If terrain selection screen is visible, go back to start screen
        document.getElementById('terrainSelection').style.display = 'none';
        document.getElementById('startScreen').style.display = 'block';
        terrainSelected = false; // Reset terrain selection
    }

    // Reset the car animation
    resetCarAnimation();
}

function resetCarAnimation() {
    var carFront = document.getElementById('carFront');
    var carImg = carFront.querySelector('img');
    carImg.style.animation = '';
    carFront.classList.remove('animated');
}

function openTerrainSelection() {
    document.getElementById('terrainSelection').style.display = 'block';
    document.getElementById('carSelectionScreen').style.display = 'none';
}

function proceedToNextStepAfterTerrain() {
    // Check if a terrain is selected
    if (!terrainSelected) {
        //alert('Please select a terrain before proceeding.');
        return;
    }

    terrainSelected = true;
    document.getElementById('terrainSelection').style.display = 'none';

    showCarSelection();
}


function proceedToNextStep() {

    // Check if a car is selected
    if (!carSelected) {
        //alert('Please select a car before proceeding.');
        return;
    }

    // Set the carSelected flag
    carSelected = true;

    // Hide the car selection screen
    document.getElementById('carSelectionScreen').style.display = 'none';

    // Instead of showing an alert, you can directly redirect to the terrain with the selected car
    redirectToTerrain(selectedTerrain, selectedCar);
    var backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

// Add click event listener to the "Next" button on the carSelectionScreen
var nextButtonCarSelection = document.getElementById('nextButtonCarSelection');
nextButtonCarSelection.addEventListener('click', proceedToNextStep);

function redirectToTerrain(chosenTerrain, chosenCar) {
    const terrainHtml = {
        'terrain1': 'sunny.html',
        'terrain2': 'rainy.html',
        'terrain3': 'night.html',
    };

    // Get the HTML file path for the chosen terrain
    const htmlFilePath = terrainHtml[chosenTerrain];

    if (htmlFilePath) {
        // Redirect to the corresponding HTML file
        window.location.href = htmlFilePath + '?chosenCar=' + chosenCar;
    } else {
        // Handle the case where the HTML file path is not defined
        alert('Error: HTML file path not defined for terrain ' + chosenTerrain + chosenCar);
    }
}

//sfx ni ari dapit sad
function playClickSound() {
    var clickSound = new Audio('SFX/bitClick.mp3'); // Replace 'SFX/bitClick.mp3' with the path to your click sound
    clickSound.play();
}

function ErrorSound() {
    var errorSound = new Audio('SFX/errorSound.mp3'); // Replace 'SFX/bitClick.mp3' with the path to your click sound
    errorSound.play();
}

function toggleBackgroundMusic() {
    var backgroundMusic = document.getElementById('backgroundMusic');
    //var speakerIcon = document.getElementById('speakerIcon');

    // Check if the background music is currently playing
    if (!backgroundMusic.paused) {
        // Pause the background music
        backgroundMusic.pause();
        // Change the speaker icon to crossed out when music is paused
        //speakerIcon.src = "img/speaker-off.png";
    } else {
        // Play the background music
        backgroundMusic.play();
        // Change the speaker icon to the normal speaker when music is playing
        //speakerIcon.src = "img/speaker-on.png";
    }
}