let newFile = [];
let randomNumber;

fetch ("./lemmad.txt")
    .then((res) => res.text())
    .then((text) => {
        let splitText = text.split("\n");        
        for (let i = 1; i < splitText.length-1; i++) {
            let words = splitText[i].split("\t");
            if (words[0].length === 5) {
                newFile.push(words[0].toUpperCase());
            }
        }
        
        let randomNumber = Math.floor(Math.random() * newFile.length+1);
        let answer = newFile[randomNumber];
        console.log(answer);

        const boxes = document.querySelectorAll(".boxes")

        let i = 0;

        function gameOver() {
            document.removeEventListener("keydown", keyDownHandler);
            const gameOver = document.querySelector(".gameOver");
            setTimeout(() => {
                gameOver.style.display = "flex";
                gameOver.innerText = "Mäng on läbi! Õige vastus on " + answer;
                gameOver.classList.add("zoom-in-gameover");
                setTimeout(() => {
                    location.reload();
                }, 6000);
            }, 2000);
        }

        function writer(event) {
            if (event === "BACKSPACE" && i % 5 !== 0) {
                boxes[i-1].innerText = "";
                i--;
            } else if (event !== "BACKSPACE") {
                boxes[i].innerText = event;            
                i++;
                
                if (i % 5 === 0) {
                    if (isWord(i)) {
                        if (winChecker(i)) {
                            gameOver()
                        } else {
                            letterChecker(i);
                        }
                    } else {
                        i -= 5;
                    }
                }

            }
        }

        let c1 = 0;
        let c2 = 0;
        let c3 = 0;

        function isWord() {
            let testString = "";
            for (let j = 0; j < 5; j++) {
                testString += boxes[c1].innerText;
                c1++;
            }
            if (newFile.includes(testString) && i > 29) {
                gameOver();
                return true;
            } else if (newFile.includes(testString)) {
                return true;
            } else {
                document.removeEventListener("keydown", keyDownHandler);
                const notWord = document.querySelector(".notWord");
                notWord.style.display = "block";
                notWord.classList.add("zoom-in");
                setTimeout(() => {
                    for (let i = c1; i > c1-5; i--) {
                        boxes[i-1].innerText = "";
                    }
                    c1 -= 5;
                    document.addEventListener("keydown", keyDownHandler);
                    notWord.style.display = "none";
                    notWord.classList.remove("zoom-in");
                    return false;
                }, 2000);
            }
        }

        function letterChecker() {
            const KBbuttons = document.querySelectorAll(".hg-button");
            let tempAnswer = answer.split("");
            for (let j = 0; j < 5; j++) {
                if (boxes[c2].innerText === answer[j]) {
                    boxes[c2].style.backgroundColor = "green";
                    const foundKeyGreen = Array.from(KBbuttons).find((element) => element.innerText === boxes[c2].innerText);
                    foundKeyGreen.style.backgroundColor = "green";

                    tempAnswer.splice(tempAnswer.indexOf(answer[j]), 1);
                } else if (tempAnswer.includes(boxes[c2].innerText)) { 
                    boxes[c2].style.backgroundColor = "orange";
                    const foundKeyOrange = Array.from(KBbuttons).find((element) => element.innerText === boxes[c2].innerText);
                    foundKeyOrange.style.backgroundColor = "orange";
                }
                c2++;
            }
        }


        function winChecker() {
            let testString = "";
            for (let j = 0; j < 5; j++) {
                if (boxes[c3].innerText === answer[j]) {
                    testString += answer[j];
                }
                c3++;
            }

            if (testString === answer) {
                for (let i = c3; i > c3 - 5; i--) {
                    boxes[i-1].style.backgroundColor = "green";
                    boxes[i-1].classList.add("zoom-in-finish");
                }
                return true;
            } else {
                return false;
            }
        }

        notKB = ["Dead", "`", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "=",
                "Tab", "'", "CapsLock", "Enter", "Shift", "Control", "Unidentified", "Meta", "Alt",
                " ", "AltGraph", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", ",", ".", "-", "Escape",
                "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];

                
        function keyDownHandler(e) {
            if (!(notKB.includes(e.key))) {
                writer(e.key.toUpperCase());
            }
        };

        document.addEventListener("keydown", keyDownHandler);


        const Keyboard = window.SimpleKeyboard.default;

        const myKeyboard = new Keyboard({
            layout: {
                'default': [
                  'Q W E R T Y U I O P Ü Õ Backspace',
                  'A S D F G H J K L Ö Ä',
                  'Ž Z X C V B N M'
                ]
              },
            display: {
                'Backspace': '⌫'
             },
            buttonTheme: [
                {
                  class: "backspaceBtn",
                  buttons: "Backspace"
                }
            ],
          onKeyPress: button => onKeyPress(button)
        });

        function onKeyPress(button) {
            console.log(button);
            writer(button);
        }        

    })
    .catch((e) => console.error(e)); 


