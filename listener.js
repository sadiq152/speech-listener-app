const PlayButton = document.getElementById('playbutton')
const skipButton = document.getElementById('skipbutton')
const stopButton = document.getElementById('stopbutton')
const restartButton = document.getElementById('restartbutton')
const speech = document.getElementById('text')
const recognition = new SpeechRecognition()

recognition.lang = "en-IN"
recognition.continuous = true
recognition.interimResults = true
recognition.maxAlternatives = 5

let arr = []
function normalizeword(word){
    word = word.toLowerCase()
    word = word.replace(/[-.,!?;:"'-*`~—–]/g, "")
    const wordtonumber = {
        "zero": "0",
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9",
        "ten": "10"
    }
    if (wordtonumber[word]) {
        return wordtonumber[word]
    }
    return word
        
}

function updateDisplay(lastSpoken) {
    //word and index are just parameters 
    document.getElementById('highlight').innerHTML = arr.map(function(word,index){
        
            if (i >= arr.length){
                recognition.stop()
            }
            
            if(index === i){
                return `<mark>${word}</mark>`
            }
            else{
                return word
            }
        }
    ).join(" ")


            const expectedEl = document.getElementById("expected")
            if (expectedEl){
            const expectedWord = arr[i] ?? "END"
            if (i >= arr.length){
                expectedEl.innerHTML = `Spoken: ${lastSpoken} <br> ✅Completed`
                recognition.stop()
            }
            else {
                expectedEl.innerHTML = `Spoken: ${lastSpoken} <br> Expected: ${expectedWord}`
            }
        }
    }  


let i
let ispaused = false
PlayButton.addEventListener('click', function(){
    
    if (!ispaused){
        i = 0
        arr = speech.value.toLowerCase().trim().split(/[\s—–-]+/).map(normalizeword)
        updateDisplay("Listening....")
    }
    recognition.start()
    ispaused = false
})
stopButton.addEventListener('click', function(){
    ispaused = true
    recognition.stop()
})
restartButton.addEventListener('click', function(){
    recognition.stop()
    i = 0
    ispaused = false
    //.split(/[\s—–-]+/) this split the any two words if it sees a place in between(\s) or a dash(-)
    arr = speech.value.toLowerCase().trim().split(/[\s—–-]+/).map(normalizeword)
    updateDisplay("Listening....")
})
recognition.onend = function(){
    if (!ispaused){
        recognition.start()
    }
}
skipButton.addEventListener('click', function(){
    if (i < arr.length)
    i++
    updateDisplay()
})
recognition.addEventListener('result', function(e){
    if (i >= arr.length){
        recognition.stop()
        return
    }
    let matchFound = false;
    let spokenWord = "";
    let firstGuess = "";
    let expectedWord = arr[i];
    let latestTake = e.results[e.results.length - 1]
    for (let j = 0; j < latestTake.length; j++){
        let currentGuess = normalizeword(latestTake[j].transcript.trim().toLowerCase().split(/\s+/)[0])
        
        if(j === 0){
            firstGuess = currentGuess;
        }

        if(currentGuess == expectedWord){
            matchFound = true;
            spokenWord = currentGuess;
            break;
        }
    }
        if(matchFound){
            i++;
            
            if(i >= arr.length){
                recognition.stop()
            }
            updateDisplay(spokenWord);
        }
        else{
            updateDisplay(firstGuess)
        }
        
     
        
        console.log(document.getElementById("expected"))
        console.log("spokenWord:", spokenWord)
        console.log("expectedWord:", arr[i] ?? "END")
        
})


