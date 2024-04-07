import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import _ from 'lodash';
import Image6 from './images/ahorcado6.jpg';
import Image5 from './images/ahorcado5.jpg';
import Image4 from './images/ahorcado4.jpg';
import Image3 from './images/ahorcado3.jpg';
import Image2 from './images/ahorcado2.jpg';
import Image1 from './images/ahorcado1.jpg';
import Image0 from './images/ahorcado0.jpg';
import image1 from './images/youWin1.jpg';
import image2 from './images/youWin2.jpg';
import image3 from './images/youWin3.jpg';
import gameOverImage from './images/gameover.jpg';
import youWinBlankImage from './images/youWinBlank.jpg'; // Import your blank image


const HangmanGame = () => {
    const phrases = [
        "NO HAY QUE IR PARA ATRÁS NI PARA DARSE IMPULSO - LAO TSÉ",
        "NO HAY CAMINOS PARA LA PAZ, LA PAZ ES EL CAMINO - MAHATMA GANDHI",
        "HAZ EL AMOR Y NO LA GUERRA - JOHN LENNON",
        "UN DÍA SIN REÍR ES UN DÍA PERDIDO - CHARLES CHAPLIN",
        "CADA DÍA SABEMOS MÁS Y ENTENDEMOS MENOS - ALBERT EINSTEIN",
        "LO QUE NO TE MATA, TE HACE MÁS FUERTE - FRIEDRICH NIETZSCHE",
        "LE HARÉ UNA OFERTA QUE NO PODRÁ RECHAZAR - VITO CORLEONE",
        "DEJA DE PENSAR EN LA VIDA Y RESUÉLVETE A VIVIRLA - PAULO COELHO",
        "NO HAY NOCHE, POR LARGA QUE SEA, QUE NO ENCUENTRE EL DÍA - W. SHAKESPEARE",
        "LADRAN, SANCHO, SEÑAL QUE CABALGAMOS - MIGUEL DE CERVANTES",
        "LA VERDAD ESTÁ AHÍ FUERA - THE X-FILES",
        "TODO LO QUE PUEDO SABER ES QUE NO SÉ NADA - SÓCRATES",
        "EL MAYOR ENEMIGO DE LA CONOCIMIENTO NO ES LA IGNORANCIA, ES LA ILUSIÓN DE CONOCIMIENTO - STEPHEN HAWKING",
        "LA VIDA SIN EXAMEN NO MERECE LA PENA SER VIVIDA - SÓCRATES",
        "LA VERDAD TE HARÁ LIBRE - JESÚS DE NAZARET",
        "NO PUEDES BAÑARTE DOS VECES EN EL MISMO RÍO - HERÁCLITO",
        "SÉ EL CAMBIO QUE QUIERES VER EN EL MUNDO - MAHATMA GANDHI",
        "EL UNICO HOMBRE QUE NO SE EQUIVOCA ES EL QUE NUNCA HACE NADA - GOETHE",
        "TODO LO QUE SOMOS ES EL RESULTADO DE LO QUE HEMOS PENSADO - BUDA",
    ];
    

    const [phrase, setPhrase] = useState('');
    const [lives, setLives] = useState(6);
    const [usedLetters, setUsedLetters] = useState(new Set());
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [hiddenPhrase, setHiddenPhrase] = useState('');
    const [lastLetter, setLastLetter] = useState('');
    const [pressedNum, setPressedNum] = useState('');
    const [millisec, setMillisec] = useState(1000);
    const [level, setLevel] = useState(1);
    const [keyTimer, setKeyTimer] = useState(null);
    const [author, setAuthor] = useState('');
    const [imageIndex, setImageIndex] = useState(0);
    const images = [youWinBlankImage, image1, image2, image3];
    const [currentImage, setCurrentImage] = useState(youWinBlankImage); // Set initial image to youWinBlankImage

    const generateRandomPhrase = () => phrases[Math.floor(Math.random() * phrases.length)];
    
    const resetGame = () => {
        setGameWon(false);
        setGameOver(false);
        handleStartGame(); 
       
    };
    
    useEffect(() => {
      if (!gameWon) return; // Exit if gameWon is false
  
      const intervalId = setInterval(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 60); // Change images every 100 milliseconds when gameWon is true
  
      return () => clearInterval(intervalId); // Cleanup on component unmount or when gameWon becomes false
    }, [gameWon, images]); // Re-run effect when gameWon or images change
  

     // Function to get the appropriate image URL based on the remaining lives
const getHangmanImage = () => {
    // Define the base URL for the hangman images
    const baseUrl = './images/';

    // Get the corresponding variable name based on the remaining lives
    let imageVariable;
    switch (lives) {
       
        case 5:
            imageVariable = Image1;
            break;
        case 4:
            imageVariable = Image2;
            break;
        case 3:
            imageVariable = Image3;
            break;
        case 2:
            imageVariable = Image4;
            break;
        case 1:
            imageVariable = Image5;
            break;    
        case 0:
            imageVariable = Image6;
            break;    
        default:
            imageVariable = Image0; // Default to the last image
    }

    // Return the complete URL of the image
    return imageVariable;
};

    

    
    useEffect(() => {
        if (!gameWon) return; // Exit if gameWon is false
    
        const intervalId = setInterval(() => {
          setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 30); // Change images every 100 milliseconds when gameWon is true
    
        return () => clearInterval(intervalId); // Cleanup on component unmount or when gameWon becomes false
      }, [gameWon, images]); // Re-run effect when gameWon or images change
    
      
      
    const generateHiddenPhrase = (phrase) => {
        const { mainPhrase } = splitPhrase(phrase);
        const normalizedPhrase = _.deburr(mainPhrase);
        
        // Replace each non-space character except commas with an underscore
        const hiddenPhrase = normalizedPhrase.replace(/[^,\s]/g, '_');
        
        // Replace spaces with pipes
        const finalPhrase = hiddenPhrase.replace(/ /g, ' ');
    
        return finalPhrase;
    };
    
    const splitPhrase = (phrase) => {
        const parts = phrase.split(' - ');
        return {
            mainPhrase: parts[0],
            author: parts[1]
        };
    };

    const handleStartGame = () => {
        setCurrentImage(youWinBlankImage); // Set current image to youWinBlankImage when gameWon becomes false

        const randomPhrase = generateRandomPhrase();
        setPhrase(randomPhrase.toUpperCase());
        setHiddenPhrase(generateHiddenPhrase(randomPhrase.toUpperCase()));
        const { author } = splitPhrase(randomPhrase);
        setAuthor(author);
        setLives(6);
        setUsedLetters(new Set());
        setCurrentImage(youWinBlankImage); // Set current image to youWinBlankImage when gameWon becomes false

    };

    const getNum = (num) => {
        const number = num;
        console.log("number:", number); // Log the resulting letter
    
        clearTimeout(keyTimer); // Clear any existing timer
    
        setPressedNum(prevNum => prevNum + number);
    };

    const handleGuess = (letter) => {
        if (gameOver || gameWon || usedLetters.has(letter.toLowerCase())) return;

        const { mainPhrase, author } = splitPhrase(phrase);
        const normalizedMainPhrase = _.deburr(mainPhrase);
        let letterGuessed = false;
        const newHiddenPhrase = normalizedMainPhrase.split('').map((char, index) => {
            if (char.toLowerCase() === letter.toLowerCase()) {
                letterGuessed = true;
                return phrase[index];
            } else {
                return hiddenPhrase[index];
            }
        }).join('');

        setHiddenPhrase(newHiddenPhrase);

        if (!newHiddenPhrase.includes('_')) {
            setGameWon(true);
        } else if (!letterGuessed) {
            setLives(lives - 1);
            if (lives === 1) {
                setGameOver(true);
            }
        }

        setUsedLetters(new Set([...usedLetters, letter.toLowerCase()]));
        setLastLetter(letter);
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key.toUpperCase();
            if (/^[A-Z]$/.test(key)) {
                // Handle character keys
                handleGuess(key);
            } else if (/^[0-9]$/.test(key)) {
                // Handle number keys
                getNum(key);
            }
        };
    
        window.addEventListener('keydown', handleKeyPress);
    
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleGuess, getNum]);

    
    useEffect(() => {
        const handleTimer = () => {
            numToLetter(); // Call numToLetter when the timer is up
        };
    
        if (pressedNum !== '') {
            // Start the timer based on the current level
            const timerId = setTimeout(handleTimer, level * 1000);
    
            // Return a cleanup function to clear the timer if the component unmounts
            return () => clearTimeout(timerId);
        }
    }, [pressedNum, level]); // Re-run the effect when pressedNum or level changes
    
    
    

    const getLevel = (operator) => {
        switch (operator) {
            case '+':
                setLevel((prevLevel) => Math.min(prevLevel + 1, 5));
                break;
            case '-':
                setLevel((prevLevel) => Math.max(prevLevel - 1, 1));
                break;
            default:
                break;
        }
        setMillisec(level * 1000);
    };

    const numToLetter = () => {

        let letter = '';
        
        switch (pressedNum) {
            case '1':
                letter = 'Q';
                break;
            case '11':
                letter = 'W';
                break;
            case '111':
                letter = 'E';
                break;
            case '2':
                letter = 'R';
                break;
            case '22':
                letter = 'T';
                break;
            case '222':
                letter = 'Y';
                break;
            case '3':
                letter = 'U';
                break;
            case '33':
                letter = 'I';
                break;
            case '333':
                letter = 'O';
                break;
            case '4':
                letter = 'P';
                break;
            case '44':
                letter = 'A';
                break;
            case '444':
                letter = 'S';
                break;
            case '5':
                letter = 'D';
                break;
            case '55':
                letter = 'F';
                break;
            case '555':
                letter = 'G';
                break;
            case '6':
                letter = 'H';
                break;
            case '66':
                letter = 'J';
                break;
            case '666':
                letter = 'K';
                break;
            case '7':
                letter = 'L';
                break;
            case '77':
                letter = 'Ñ';
                break;
            case '777':
                letter = 'Z';
                break;
            case '8':
                letter = 'X';
                break;
            case '88':
                letter = 'C';
                break;
            case '888':
                letter = 'V';
                break;
            case '9':
                letter = 'B';
                break;
            case '99':
                letter = 'N';
                break;
            case '999':
                letter = 'M';
                break;
            default:
                break;
        }

        console.log("Resulting letter:", letter); // Log the resulting letter
        handleGuess(letter);
        setPressedNum('');
    };

    const printSentence = () => {
        // Retrieve the current hidden sentence
        const sentence = hiddenPhrase;
    
        // Split the sentence into words based on spaces
        const words = sentence.split(' ');
    
        // Create an array to hold JSX elements representing each word and line breaks
        const sentenceElements = [];
    
        // Loop through each word in the sentence
        for (const word of words) {
            // Loop through each character in the word
            for (const char of word) {
                // Create a <span> element for each character
                const charElement = <span className="sentenceLetter">{char}</span>;
                // Push the character element into the array
                sentenceElements.push(charElement);
            }
            // Add a line break after each word
            sentenceElements.push(<br />);
        }
    
        // Return the array of JSX elements representing the sentence
        return sentenceElements;
    };
    
       return (

        
            <div className = "container"> 
                     
                    <div className="title">
                     <h3>Hangman Game</h3>
                    </div>
                     <div>
                    {/* Button to start/reset the game */}
                    <button onClick={resetGame} autoFocus>
                        Start Game
                    </button>
                    <br></br>
                    <br></br>
                    </div>
  
                    <div className="images-container">
    {/* Left container for game state images */}
    <div className="game-state-images left">
        {/* Conditionally render game over image */}
        {gameOver && (
            <img className="image" src={gameOverImage} alt="Game Over" />
        )}
        {/* Conditionally render game won strobe effect */}
        {gameWon && (
            // Strobe images or game won images
            <img className="image" src={images[imageIndex]} alt={`Image ${imageIndex + 1}`} />
        )}
    </div>

    {/* Container for counter images */}
    <div className="counter-images">
        <img className="counterImage" src={getHangmanImage()} alt={`Hangman - Stage ${lives}`} />
    </div>

    {/* Right container for game state images */}
    <div className="game-state-images right">
        {/* Conditionally render game over image */}
        {gameOver && (
            <img className="image" src={gameOverImage} alt="Game Over" />
        )}
        {/* Conditionally render game won strobe effect */}
        {gameWon && (
            // Strobe images or game won images
            <img className="image" src={images[imageIndex]} alt={`Image ${imageIndex + 1}`} />
        )}
    </div>
</div>



                    <div className="letterDisplay">
                        <p id="letter">{lastLetter}</p>
                    </div>
                    {/* Display the author and sentence squares */}
                    <div id="display">
                        <p id="author">{author}</p>
                        <div id="squares">
                        {/* Render the sentence squares */}
                        {printSentence()}
                        </div>
                    </div>


                    <Draggable defaultPosition={{ x: 10, y: 10 }} >
                    <div className = "keyboard">

                    <div>

                        <div className="charKeyboard">
                    <button className="button" onClick={() => handleGuess('Q')}><span id="keyMap">1</span>
                        Q
                    </button>
                    <button className="button" onClick={() => handleGuess('Q')}><span id="keyMap">11</span>
                        W
                    </button>
                    <button className="button" onClick={() => handleGuess('E')}><span id="keyMap">111</span>
                        E
                    </button>
                    <button className="button" onClick={() => handleGuess('R')}><span id="keyMap">2</span>
                        R
                    </button>
                    <button className="button" onClick={() => handleGuess('T')}><span id="keyMap">22</span>
                        T
                    </button>
                    <button className="button" onClick={() => handleGuess('Y')}><span id="keyMap">222</span>
                        Y
                    </button>
                    <button className="button" onClick={() => handleGuess('U')}><span id="keyMap">3</span>
                        U
                    </button>
                    <button className="button" onClick={() => handleGuess('I')}><span id="keyMap">33</span>
                        I
                    </button>
                    <button className="button" onClick={() => handleGuess('O')}><span id="keyMap">333</span>
                        O
                    </button>
                    <button className="button" onClick={() => handleGuess('P')}><span id="keyMap">4</span>
                        P
                    </button>
                    <br />
                    <button className="button" onClick={() => handleGuess('A')}><span id="keyMap">44</span>
                        A
                    </button>
                    <button className="button" onClick={() => handleGuess('S')}><span id="keyMap">444</span>
                        S
                    </button>
                    <button className="button" onClick={() => handleGuess('D')}><span id="keyMap">5</span>
                        D
                    </button>
                    <button className="button" onClick={() => handleGuess('F')}><span id="keyMap">55</span>
                        F
                    </button>
                    <button className="button" onClick={() => handleGuess('G')}><span id="keyMap">555</span>
                        G
                    </button>
                    <button className="button" onClick={() => handleGuess('H')}><span id="keyMap">6</span>
                        H
                    </button>
                    <button className="button" onClick={() => handleGuess('J')}><span id="keyMap">66</span>
                        J
                    </button>
                    <button className="button" onClick={() => handleGuess('K')}><span id="keyMap">666</span>
                        K
                    </button>
                    <button className="button" onClick={() => handleGuess('L')}><span id="keyMap">7</span>
                        L
                    </button>
                    <button className="button" onClick={() => handleGuess('Ñ')}><span id="keyMap">77</span>
                        Ñ
                    </button>
                    <br />
                    <button className="button" onClick={() => handleGuess('Z')}><span id="keyMap">777</span>
                        Z
                    </button>
                    <button className="button" onClick={() => handleGuess('X')}><span id="keyMap">8</span>
                        X
                    </button>
                    <button className="button" onClick={() => handleGuess('C')}><span id="keyMap">88</span>
                        C
                    </button>
                    <button className="button" onClick={() => handleGuess('V')}><span id="keyMap">888</span>
                        V
                    </button>
                    <button className="button" onClick={() => handleGuess('B')}><span id="keyMap">9</span>
                        B
                    </button>
                    <button className="button" onClick={() => handleGuess('N')}><span id="keyMap">99</span>
                        N
                    </button>
                    <button className="button" onClick={() => handleGuess('M')}><span id="keyMap">999</span>
                        M
                    </button>
                    <br />
                </div>
                <div className="numKeyboard">

                    <div class="br">
                        <p id="leyenda">  CAPTURA(seg)</p>
                    </div>
                    <div className = "levelAcces2">
                        <button className="button3" onClick={() => getLevel('+')}>+</button>
                        <div className="levelAcces"> {level}</div>
                        <button className="button3" onClick={() => getLevel('-')}>-</button>
                    </div>
                    <div className = "keyboard">
                    <button className="button2" onClick={() => getNum('1')}>
                        1
                    </button>
                    <button className="button2" onClick={() => getNum('2')}>
                        2
                    </button>
                    <button className="button2" onClick={() => getNum('3')}>
                        3
                    </button>
                    <br />
                    <button className="button2" onClick={() => getNum('4')}>
                        4
                    </button>
                    <button className="button2" onClick={() => getNum('5')}>
                        5
                    </button>
                    <button className="button2" onClick={() => getNum('6')}>
                        6
                    </button>
                    <br />
                    <button className="button2" onClick={() => getNum('7')}>
                        7
                    </button>
                    <button className="button2" onClick={() => getNum('8')}>
                        8
                    </button>
                    <button className="button2" onClick={() => getNum('9')}>
                        9
                    </button>
                    <br />
                    <button className="button2" onClick={() => getNum('#')}>
                        #
                    </button>
                    <button className="button2" onClick={() => getNum('0')}>
                        0
                    </button>
                    <button className="button2" onClick={() => getNum('*')}>
                        *
                    </button>
                    <br />
                    </div>
                </div>
                
            </div>
            </div>
            </Draggable>

           
        </div>
    );
};

export default HangmanGame;
