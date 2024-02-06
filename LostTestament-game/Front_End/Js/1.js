'use strict';

import {cityData} from './cities.js';

function startScreen() {
    const targetElem = document.body;


    // STAR TREK STUFF ENDs //
    const logoContainer = document.createElement('div');
    logoContainer.id = 'logoContainer';
    targetElem.appendChild(logoContainer);

    // Create and add the logo
    const logo = document.createElement('img');
    logo.src = '../img/logo.png';
    logo.id = 'logo';
    logo.classList.add('cyanGlow');
    //logo.classList.add('hide')
    logoContainer.appendChild(logo);

    // Create container for the "Enter the game" button
    const gameContainer = document.createElement('div');
    gameContainer.id = 'gameContainer';
    targetElem.appendChild(gameContainer);

    // Create and add the "Enter the game" button
    const enterGame = document.createElement('button');
    enterGame.innerText = 'Start The Game';
    enterGame.id = 'enterGameButton';
    enterGame.classList.add('hide');

    gameContainer.appendChild(enterGame);

    // Add the 'show' class with a transition when the DOM is loaded
    document.addEventListener('DOMContentLoaded', function () {

        // Triggering the reflow/repaint before adding the 'show' class
        enterGame.offsetHeight;

        // Add a class to the button to trigger the transition
        enterGame.classList.add('magentaGlow');
        enterGame.classList.add('show');
        //logo.classList.add('show')
    });
    document.getElementById('enterGameButton').addEventListener('click', function (event) {
        event.preventDefault();
        // Assuming 'starTrek' is a function to be called
        logo.classList.remove('show');
        logo.classList.add('hide');
        enterGame.classList.remove('show');
        setTimeout(() => {
            starTrek();

        }, 2000);

    });
}

function starTrek() {// Create container for the start screen
    // STAR TREK STUFF HERE //
    const targetElem = document.getElementById('gameContainer');
    targetElem.innerHTML = '';
    let mySound = new Audio('../music/INTRO.wav');
    mySound.volume = 0.2;
    mySound.play();
    const starTrek = document.createElement('section');
    starTrek.classList.add('starTrek');
    starTrek.classList.add('hide')
    targetElem.appendChild(starTrek);

    const scrollText = document.createElement('div');
    starTrek.appendChild(scrollText);
    scrollText.classList.add('scrollText');
    const intro1 = document.createElement('p')
    intro1.innerText = "It's the year 2043. Climate change and a three-decade-long inflation-deflation cycle have scourged Europe. At the beginning of Paavo Väyrynen's third presidential term, the European Union took action. The use of the Euro as a currency was abandoned, and all trade began to be conducted with emission permits (EP). When Turkey and the North African countries adopted the EU's economic and environmental reforms, they obtained full EU membership. For the first time in history, the EU has expanded beyond the borders of Europe, thus becoming the New European Union (NEU)."
    const intro2 = document.createElement('p')
    intro2.innerText = "Facinated by the fast development of the cultural change in Europe, your grandmother went on a holiday travelling around the NEU. Things went smoothly until she lost her luggage somewhere, and now she can't remember where. Being her typical self, she also had her testament in the luggage..."
    const intro3 = document.createElement('p')
    intro3.innerText = "Whoever finds the grandma's luggage, might be remembered in her testament. You must embark on a long trip around Europe and find it before your sibling does!"
    setTimeout(() => {

        starTrek.classList.add('show')
    }, 400);
    scrollText.appendChild(intro1);
    scrollText.appendChild(intro2);
    scrollText.appendChild(intro3);
    let keypress = 0;

    function introInterrupt(event) {
        event.preventDefault();
        mySound.pause();
        starTrek.classList.remove('show');
        keypress = 1;
        selectGame();
        console.log("Keyboard interrupt, keypress=", keypress);
        //remove event listener
        document.removeEventListener("keypress", introInterrupt);
    }


    document.addEventListener("keypress", introInterrupt, {once: true});


    const timeoutId = setTimeout(() => {
        if (keypress === 0) {
            starTrek.classList.remove('show');
            //document.getElementById('logo').classList.add('show');
            //setTimeout(() => {
                //document.getElementById('logo').classList.remove('show');
                setTimeout(() => {
                    selectGame();
                }, 2000);
           // }, 4000);
        }
        // remove evenlistener after 58 sec
        document.removeEventListener("keypress", introInterrupt);
    }, 58000);
}

async function selectGame() {

    setTimeout(() => {
        const targetElem = document.getElementById('gameContainer');
        targetElem.innerHTML = '';
        document.getElementById('logo').classList.add('show')
        // Create and add the "New game" Form
        const newGameForm = document.createElement('form');
        newGameForm.id = 'newGameForm';
        newGameForm.classList.add('hide');
        targetElem.appendChild(newGameForm);

        // Create input field for game name
        const inputNewGame = document.createElement('input');
        inputNewGame.type = 'text';
        inputNewGame.id = 'gameName';
        inputNewGame.name = 'gameName';
        inputNewGame.action = '';
        inputNewGame.classList.add('form');
        inputNewGame.placeholder = 'Enter New/Saved Game Name';

        // Add input to form
        newGameForm.appendChild(inputNewGame);

        // Create submit button
        const inputButton = document.createElement('button');
        inputButton.type = 'submit';
        targetElem.appendChild(inputButton);
        inputButton.classList.add('hide');
        inputButton.id = 'selectGame';
        inputButton.style.width = '2rem';
        inputButton.innerText = '>';

        // Add the 'show' class with a transition
        setTimeout(() => {
            newGameForm.classList.add('magentaGlow', 'show');
            inputButton.classList.add('show');

            // Add event listener for "Enter" key press on the input field
            inputNewGame.addEventListener('keypress', function (event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    inputButton.click();
                }
            });

            // Add event listener for button click
            inputButton.addEventListener('click', async function (event) {
                event.preventDefault();
                const gameName = document.getElementById('gameName').value;
                const savedGameData = await get_saveGame(gameName);

                if (savedGameData.gameName === null) {
                    setTimeout(() => {
                        // If the saved game is not found, create a new game and update gameContainer

                        const gameContainer = document.getElementById('gameContainer');
                        gameContainer.innerHTML = '';

                        const newGameForm = document.createElement('form');
                        newGameForm.classList.add('hide');
                        newGameForm.style.display = 'flex';
                        gameContainer.appendChild(newGameForm);

                        const playerList = [];

                        for (let i = 0; i < 2; i++) {
                            const inputNewPlayer = document.createElement('input');
                            inputNewPlayer.type = 'text';
                            inputNewPlayer.id = `player${i + 1}`;
                            inputNewPlayer.classList.add('form');
                            inputNewPlayer.placeholder = `Player ${i + 1}`;
                            newGameForm.appendChild(inputNewPlayer);
                            playerList.push(inputNewPlayer);
                        }

                        const inputButton = document.createElement('button');
                        inputButton.type = 'submit';
                        gameContainer.appendChild(inputButton);
                        inputButton.classList.add('hide');
                        inputButton.id = 'addPlayer';

                        inputButton.style.width = '2rem';
                        inputButton.innerText = '>';

                        setTimeout(() => {
                            inputButton.classList.add('show');
                            newGameForm.classList.add('show');
                            newGameForm.classList.add('magentaGlow');
                        }, 200);
                        newGameForm.addEventListener('keypress', function (event) {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                inputButton.click();
                            }
                        });
                        inputButton.addEventListener('click', async function (event) {
                            event.preventDefault();
                            const playerName1 = document.getElementById('player1').value;
                            const playerName2 = document.getElementById('player2').value;
                            // add players to savegame
                            await playerSaveData(gameName, playerName1, playerName2);
                            await mainGame(gameName);

                        });
                    }, 400);
                } else {

                    await mainGame(gameName);

                }

            });
        }, 200);
    }, 300);
}

async function get_saveGame(gameName) {
    // makes json request from Flask-server

    const gameNameResponse = await fetch(
        `http://127.0.0.2:3000/get_saveGame/${gameName}`);
    console.log('gamenameresponse: ', gameNameResponse);
    const jsonData = await gameNameResponse.json();
    console.log('jsondata: ', jsonData);
    console.log(jsonData);
    return jsonData;
}

async function playerSaveData(gameName, playerName1, playerName2) {
    const addPlayerResponse = await fetch(
        `http://127.0.0.2:3000//add_player/${gameName}/${playerName1}/${playerName2}`);
    const jsonData = await addPlayerResponse.json();
    //console.log('saved games list:', jsonData.gameName);
    //console.log('pelaaja1', jsonData.players.player2.player_name);
    //palauttaa pelin nimen jsonData.game.game_name);
}

function mainGame(gameName) {

    setTimeout(() => {

        const gameContainer = document.getElementById('gameContainer');
        // Clear the gamecontainer content
        gameContainer.innerHTML = '';

        // Set the body height to 100%
        document.body.style.height = '100%';
        gameContainer.classList.add('mainGame');

        //gameContainer.style.border = '1px solid #19caca';

        //make map // map is 800x600 = 50rem x 37.5rem

        const mapFrame = document.createElement('div');
        mapFrame.setAttribute('id', 'map');
        gameContainer.appendChild(mapFrame);

        mapFrame.classList.add('hide');
        const accessToken = 'c6moPjpSN7QLOooqQRQkhGSswG714yj1foLNEIYWMqAcvVJVqx1LFPDqpl9tCvet';
        let map = L.map('map').setView([52.3503, 14.0460], 3);
        L.tileLayer(
            `https://tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=${accessToken}`,
            {
                attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>',
                maxZoom: 22,
            },
        ).addTo(map);
        // Adding different markers
        let greenMarker = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [12, 20],
            iconAnchor: [12, 20],
            popupAnchor: [-5, -15],
            shadowSize: [20, 20],
        });
        let greyMarker = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [12, 20],
            iconAnchor: [12, 20],
            popupAnchor: [-5, -15],
            shadowSize: [20, 20],
        });
        let redMarker = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [12, 20],
            iconAnchor: [12, 20],
            popupAnchor: [-5, -15],
            shadowSize: [20, 20],
        });
        let player1Marker = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });
        let player2Marker = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });

        //gameContainer.appendChild(uiCont);

        // add player action buttons

        const sideBar = document.createElement('div');
        gameContainer.appendChild(sideBar);
        sideBar.classList.add('sideBar');
        sideBar.classList.add('hide');
        const infoCont = document.createElement('div');

        infoCont.classList.add('infoContainer');
        const nameCont = document.createElement('div');
        nameCont.classList.add('nameContainer');

        const flyButton = document.createElement('button');
        const hikeButton = document.createElement('button');
        const sailButton = document.createElement('button');
        const workButton = document.createElement('button');
        const currentPlayer = document.createElement('p');
        const currentPlayerName = document.createElement('p');
        currentPlayer.classList.add('staticCurrentPlayer');
        const PlayerData = document.createElement('p');
        const PlayerMoneyStatic = document.createElement('p');
        const PlayerMoneyValue = document.createElement('p');
        //console.log('p1', get_saveGame(gameName).players.player_name.player1, 'p2',
        //get_saveGame(gameName).players.player_name.player2);
        currentPlayer.textContent = `Current player:`;

        async function refreshPlayerData(selectedButton, gameState, newTurn = 0) {
            // Trying to make flyButton active
            console.log('refreshPlayerdata');
            const player1 = gameState.players.player1;
            const player2 = gameState.players.player2;
            const visitedList = gameState.game.visited;
            let bubbleGumNewTurn = newTurn;
            let currentPlayer;
            let notCurrentPlayer;
            if (gameState.game.round_counter % 2 == 1) {
                currentPlayer = player2;
                notCurrentPlayer = player1;
            } else {
                currentPlayer = player1;
                notCurrentPlayer = player2;
            }

            currentPlayerName.textContent = currentPlayer.screen_name;
            if (selectedButton == workButton) {
                let playerId = currentPlayer.player_id;
                let cityId = currentPlayer.location;
                playerAction(gameName, playerId, 'work', cityId);
            }
            PlayerData.classList.add('playerData');
            PlayerMoneyStatic.textContent = 'Money:';
            PlayerMoneyValue.textContent = currentPlayer.current_pp + ' PP';

            // Here we render all markers on map
            renderMarkers(currentPlayer, visitedList, selectedButton, player1, bubbleGumNewTurn)
        }

        function renderMarkers(currentPlayer, visitedList, selectedButton, player1, newTurn) {
            let bubbleGumNewTurn = newTurn;
            console.log(bubbleGumNewTurn);
            let flyCities = [];
            let hikeCities = [];
            let sailCities = [];
            for (let flyCity of currentPlayer.cities_in_range.fly) {
                flyCities.push(flyCity[0]);
            }
            for (let hikeCity of currentPlayer.cities_in_range.hike) {
                hikeCities.push(hikeCity[0]);
            }
            for (let sailCity of currentPlayer.cities_in_range.sail) {
                sailCities.push(sailCity[0]);
            }
            console.log('These are cities to hike', hikeCities);
            console.log('these are cities to fly', flyCities);
            console.log('these are cities to sail', sailCities);
            console.log('citydata', cityData);
            console.log('typeof visitedlist number:', typeof (visitedList[0]));
            // Markerclear from chatGPT
            map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });
            let playerInPort = false;
            for (let city of cityData) {
                if (currentPlayer.location == Number(city.id) && city.port_city ==
                    '1') {
                    playerInPort = true;
                }
            }
            let hereMarker
            let cityCoords
            for (let city of cityData) {
                if (currentPlayer.location == Number(city.id)) {
                    cityCoords = [city.latitude_deg, city.longitude_deg];
                    if (currentPlayer === player1) {
                        console.log(currentPlayer)
                        hereMarker = L.marker([city.latitude_deg, city.longitude_deg],
                            {icon: player1Marker}).addTo(map);
                        hereMarker.bindPopup(`${currentPlayer.screen_name}, You are here!`);
                    } else {
                        hereMarker = L.marker([city.latitude_deg, city.longitude_deg],
                            {icon: player2Marker}).addTo(map);
                        hereMarker.bindPopup(`${currentPlayer.screen_name}, You are here!`);
                    }
                } else if (selectedButton === hikeButton) {
                    if (hikeCities.includes(Number(city.id))) { // city.id is string by default
                        if (visitedList.includes(city.id)) {
                            let marker = L.marker([city.latitude_deg, city.longitude_deg],
                                {icon: greenMarker}).addTo(map);
                            marker.bindPopup(`<a href="#" id="hikeLink${city.id}">Hike to ${city.name}</a>`);
                            marker.on('click', function (event) {
                                document.getElementById(`hikeLink${city.id}`).addEventListener('click', function (e) {
                                    e.preventDefault(); // Prevent the default behavior of the link
                                    playerAction(gameName, currentPlayer.player_id, 'hike', city.id);
                                })
                            })
                        } else {
                            let marker = L.marker([city.latitude_deg, city.longitude_deg],
                                {icon: redMarker}).addTo(map);
                            marker.bindPopup(`<a href="#" id="hikeLink${city.id}">Hike to ${city.name}</a>`);
                            marker.on('click', function (event) {
                                document.getElementById(`hikeLink${city.id}`).addEventListener('click', function (e) {
                                    e.preventDefault(); // Prevent the default behavior of the link
                                    playerAction(gameName, currentPlayer.player_id, 'hike', city.id);
                                })
                            })
                        }
                    } else {
                        let marker = L.marker([city.latitude_deg, city.longitude_deg],
                            {icon: greyMarker}).addTo(map);
                    }
                } else if (selectedButton === sailButton) {
                    if (sailCities.includes(Number(city.id)) && playerInPort == true) { // city.id is string by default
                        if (visitedList.includes(city.id)) {
                            let marker = L.marker([city.latitude_deg, city.longitude_deg],
                                {icon: greenMarker}).addTo(map);
                            marker.bindPopup(`<a href="#" id="sailLink${city.id}">Sail to ${city.name}</a>`);
                            marker.on('click', function (event) {
                                document.getElementById(`sailLink${city.id}`).addEventListener('click', function (e) {
                                    e.preventDefault(); // Prevent the default behavior of the link
                                    playerAction(gameName, currentPlayer.player_id, 'sail', city.id);
                                })
                            })
                        } else {
                            let marker = L.marker([city.latitude_deg, city.longitude_deg],
                                {icon: redMarker}).addTo(map);
                            marker.bindPopup(`<a href="#" id="sailLink${city.id}">Sail to ${city.name}</a>`);
                            marker.on('click', function (event) {
                                document.getElementById(`sailLink${city.id}`).addEventListener('click', function (e) {
                                    e.preventDefault(); // Prevent the default behavior of the link
                                    playerAction(gameName, currentPlayer.player_id, 'sail', city.id);
                                })
                            })
                        }
                    } else {
                        let marker = L.marker([city.latitude_deg, city.longitude_deg],
                            {icon: greyMarker}).addTo(map);
                    }

                } else {
                    if (flyCities.includes(Number(city.id))) { // city.id is string by default
                        if (visitedList.includes(city.id)) {
                            let marker = L.marker([city.latitude_deg, city.longitude_deg],
                                {icon: greenMarker}).addTo(map);
                            marker.bindPopup(`<a href="#" id="flyLink${city.id}">Fly to ${city.name}</a>`);
                            marker.on('click', function (event) {
                                document.getElementById(`flyLink${city.id}`).addEventListener('click', function (e) {
                                    e.preventDefault(); // Prevent the default behavior of the link
                                    playerAction(gameName, currentPlayer.player_id, 'fly', city.id);
                                })
                            });
                        } else {
                            let marker = L.marker([city.latitude_deg, city.longitude_deg],
                                {icon: redMarker}).addTo(map);
                            marker.bindPopup(`<a href="#" id="flyLink${city.id}">Fly to ${city.name}</a>`);
                            marker.on('click', function (event) {
                                document.getElementById(`flyLink${city.id}`).addEventListener('click', function (e) {
                                    e.preventDefault(); // Prevent the default behavior of the link
                                    playerAction(gameName, currentPlayer.player_id, 'fly', city.id);
                                })
                            });
                        }
                    } else {
                        let marker = L.marker([city.latitude_deg, city.longitude_deg],
                            {icon: greyMarker}).addTo(map);
                    }
                }
            }
            console.log('citycoords: ', cityCoords)
            if (bubbleGumNewTurn == 1) {
                map.setView(cityCoords, 7, {
                    "animate": true,
                    "pan": {
                        "duration": 100
                    }
                });
            }
            hereMarker.fire('click');
        }

        async function playerAction(gameName, playerId, action, cityId) {
            console.log('playerAction: ', gameName, playerId, action, cityId);
            let response = await fetch(
                `http://127.0.0.2:3000/action/${gameName}/${playerId}/${action}/${cityId}`);
            console.log('response: ', response);
            let gameData = await response.json();
            flyButton.classList.add('selected');
            hikeButton.classList.remove('selected');
            sailButton.classList.remove('selected');
            let newTurn = 1;
            await refreshPlayerData(flyButton, gameData, newTurn);
            popupEvent(gameData);
        }

        function popupEvent(gameState) {
            let currentPlayer;
            let notCurrentPlayer;
            const player1 = gameState.players.player1;
            const player2 = gameState.players.player2;
            const targetElem = document.getElementById('map');
            const modal = document.createElement('dialog');
            modal.classList.add('modal');
            targetElem.appendChild(modal);
            const modalContent = document.createElement('div');
            modalContent.classList.add('modal-content');
            const closeButton = document.createElement('button');
            closeButton.classList.add('closeButton');
            closeButton.innerText = 'Close';
            closeButton.addEventListener('click', function () { 
                modal.close();
                if (notCurrentPlayer.prizeholder == 1) {
                    endEvent(gameName);
                }
            }
            )
            if (gameState.game.round_counter % 2 == 1) {
                currentPlayer = player2;
                notCurrentPlayer = player1;
            } else {
                currentPlayer = player1;
                notCurrentPlayer = player2;
            }
            if (notCurrentPlayer.prizeholder == 1) {
                modalContent.innerHTML = `<p>${notCurrentPlayer.screen_name} YOU HAVE FOUND OLD GRAMMAS LOST TESTAMENT</p>`;
                modal.appendChild(modalContent);
                modalContent.appendChild(closeButton);
                modal.showModal();
            } else if (gameState.players.last_turn_item.work_salary !== null) {

                modalContent.innerHTML = `<p>${notCurrentPlayer.screen_name} 
                has earned ${gameState.players.last_turn_item.work_salary} EP</p>`;
                modal.appendChild(modalContent);
                modalContent.appendChild(closeButton);
                modal.showModal();
            }


            else if (gameState.players.last_turn_item.string !== null) {
                modalContent.innerHTML = `<p>${notCurrentPlayer.screen_name} 
                has found a ${gameState.players.last_turn_item.string} and its worth 
                ${gameState.players.last_turn_item.value} EP</p>`; 
                modal.appendChild(modalContent);
                modalContent.appendChild(closeButton);
                modal.showModal();

            }

        }

        flyButton.classList.add('actionButtons');
        hikeButton.classList.add('actionButtons');
        sailButton.classList.add('actionButtons');
        workButton.classList.add('workButton');

        const plane = document.createElement('img');
        const walk = document.createElement('img');
        const ship = document.createElement('img');

        plane.src = '../img/plane_cyan.png';
        walk.src = '../img/walking_cyan.png';
        ship.src = '../img/ship_cyan.png';

        flyButton.appendChild(plane);
        hikeButton.appendChild(walk);
        sailButton.appendChild(ship);

        plane.classList.add('icon');
        walk.classList.add('icon');
        ship.classList.add('icon');
        workButton.innerHTML = '$&ensp;&ensp;&ensp;&ensp;work&ensp;&ensp;&ensp;&ensp;$';

        sideBar.appendChild(flyButton);
        sideBar.appendChild(hikeButton);
        sideBar.appendChild(sailButton);
        sideBar.appendChild(workButton);
        sideBar.appendChild(infoCont);
        infoCont.appendChild(nameCont);
        nameCont.appendChild(currentPlayer);
        nameCont.appendChild(currentPlayerName);
        infoCont.appendChild(PlayerData);
        PlayerData.appendChild(PlayerMoneyStatic)
        PlayerData.appendChild(PlayerMoneyValue)

        function handleButtonClick(selectedButton, otherButton1, otherButton2) {
            selectedButton.classList.add('selected');
            otherButton1.classList.remove('selected');
            otherButton2.classList.remove('selected');
        }

        flyButton.addEventListener('click', async function () {
            handleButtonClick(flyButton, hikeButton, sailButton);
            let gameData = await get_saveGame(gameName);
            refreshPlayerData(flyButton, gameData);
        });

        hikeButton.addEventListener('click', async function () {
            handleButtonClick(hikeButton, flyButton, sailButton);
            let gameData = await get_saveGame(gameName);
            refreshPlayerData(hikeButton, gameData);
        });

        sailButton.addEventListener('click', async function () {
            handleButtonClick(sailButton, hikeButton, flyButton);
            let gameData = await get_saveGame(gameName);
            refreshPlayerData(sailButton, gameData);
        });

        workButton.addEventListener('click', async function () {
            let gameData = await get_saveGame(gameName);
            refreshPlayerData(workButton, gameData);
        });

        flyButton.click();
        setTimeout(() => {
            sideBar.classList.add('show');
            gameContainer.classList.add('lightblueGlow');
            gameContainer.classList.add('show');
            mapFrame.classList.add('show');
        }, 600);

        /*const map =L.tileLayer('https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
     attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
     minZoom: 0,
     maxZoom: 22,
     subdomains: 'abcd',
     accessToken: '<your accessToken>'*/
    }, 600);

}


async function endEvent(gameName) {
    document.getElementById(
        'gameContainer').innerHTML = '<img src="../img/youwan.jpeg">';
    const nukeResponse = await fetch(`http://127.0.0.2:3000/end_game/${gameName}`);
    const jsonData = await nukeResponse.json();
    console.log(jsonData, gameName, 'Database removed');
    let mySound = new Audio('../music/INTRO.wav');
    mySound.volume = 0.2;
    mySound.play();
    document.addEventListener("keypress", function (event) {
            event.preventDefault();
            mySound.pause();
            location.reload();
        }
        , {once: true});
}

/*********************** PROGRAM STARTS FROM HERE**********************/
startScreen();

