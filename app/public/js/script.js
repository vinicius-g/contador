// Variáveis

const startBtn = document.querySelector("[data-start]")
const pauseBtn = document.querySelector("[data-pause]")

const actualNumContainers = document.querySelectorAll("[data-num]")
const previousNumContainers = document.querySelectorAll("[data-num-prev]")
const nextNumContainers = document.querySelectorAll("[data-num-next]")

const actualHourContainer = document.querySelector("[data-num=num-hour]")
const actualMinContainer = document.querySelector("[data-num=num-min]")
const actualSecContainer = document.querySelector("[data-num=num-sec]")

const topBtns = document.querySelectorAll("[data-top-btn]")
const bottomBtns = document.querySelectorAll("[data-bottom-btn]")

var actualNumSelected
var previousNumSelected
var nextNumSelected

var interval
var timer

// Iniciar com local Storage 

let initialTime = JSON.parse(localStorage.getItem("timeSelected")) || ["00", "00", "00"]
let previousTime = JSON.parse(localStorage.getItem("previousTimeSelected")) || ["59", "59", "59"]
let nextTime = JSON.parse(localStorage.getItem("nextTimeSelected")) || ["01", "01", "01"]

actualNumContainers.forEach((actualNumContainer, index) => {
    actualNumContainer.innerHTML = initialTime[index]
})
previousNumContainers.forEach((previousNumContainer, index) => {
    previousNumContainer.innerHTML = previousTime[index]
})
nextNumContainers.forEach((nextNumContainer, index) => {
    nextNumContainer.innerHTML = nextTime[index]
})

// Funções

function awakeTopBtns() {
    topBtns.forEach((topBtn) => {
        topBtn.addEventListener("click", (e) => {
            let selectedTimeContainer = e.target.dataset.topBtn
            chooseTimeTop(selectedTimeContainer)
            correctTime(selectedTimeContainer)
            
            actualNumContainers.forEach((actualNumContainer) => {
                actualNumContainer.classList.remove("acabou")
            })
        })

        topBtn.addEventListener("mousedown", (e) => {
            let selectedTimeContainer = e.target.dataset.topBtn
            interval = setInterval(() => {
                chooseTimeTop(selectedTimeContainer)
                correctTime(selectedTimeContainer)
            }, 100)
        })

        topBtn.addEventListener("mouseup", () => {
            clearInterval(interval)
        })
    })
}

function awakeBottomBtns() {
    bottomBtns.forEach((bottomBtn) => {
        bottomBtn.addEventListener("click", (e) => {
            let selectedTimeContainer = e.target.dataset.bottomBtn
            chooseTimeBottom(selectedTimeContainer)
            correctTime(selectedTimeContainer)

            actualNumContainers.forEach((actualNumContainer) => {
                actualNumContainer.classList.remove("acabou")
            })
        })

        bottomBtn.addEventListener("mousedown", (e) => {
            let selectedTimeContainer = e.target.dataset.bottomBtn
            interval = setInterval(() => {
                chooseTimeBottom(selectedTimeContainer)
                correctTime(selectedTimeContainer)
            }, 100)
        })

        bottomBtn.addEventListener("mouseup", () => {
            clearInterval(interval)
        })
    })
}

function chooseTimeTop(timeContainer) {
    actualNumContainers.forEach((actualNumContainer) => {
        if (actualNumContainer.dataset.num === timeContainer) {
            actualNumSelected = actualNumContainer.innerHTML
            actualNumSelected--
            if (actualNumSelected < 0) {
                actualNumSelected = 59
            }
            actualNumContainer.innerHTML = actualNumSelected
        }
    })

    previousNumContainers.forEach((previousNumContainer) => {
        if (previousNumContainer.dataset.numPrev === timeContainer) {
            previousNumSelected = actualNumSelected - 1
            if (previousNumSelected < 0) {
                previousNumSelected = 59
            }
            previousNumContainer.innerHTML = previousNumSelected
        }
    })

    nextNumContainers.forEach((nextNumContainer) => {
        if (nextNumContainer.dataset.numNext === timeContainer) {
            nextNumSelected = actualNumSelected + 1
            if (nextNumSelected > 59) {
                nextNumSelected = 0
            }
            nextNumContainer.innerHTML = nextNumSelected
        }
    })
}

function chooseTimeBottom(timeContainer) {
    actualNumContainers.forEach((actualNumContainer) => {
        if (actualNumContainer.dataset.num === timeContainer) {
            actualNumSelected = actualNumContainer.innerHTML
            actualNumSelected++
            if (actualNumSelected > 59) {
                actualNumSelected = 0
            }
            actualNumContainer.innerHTML = actualNumSelected
        }
    })

    previousNumContainers.forEach((previousNumContainer) => {
        if (previousNumContainer.dataset.numPrev === timeContainer) {
            previousNumSelected = actualNumSelected - 1
            if (previousNumSelected < 0) {
                previousNumSelected = 59
            }
            previousNumContainer.innerHTML = previousNumSelected
        }
    })

    nextNumContainers.forEach((nextNumContainer) => {
        if (nextNumContainer.dataset.numNext === timeContainer) {
            nextNumSelected = actualNumSelected + 1
            if (nextNumSelected > 59) {
                nextNumSelected = 0
            }
            nextNumContainer.innerHTML = nextNumSelected
        }
    })
}

function correctTime(timeContainer) {
    actualNumContainers.forEach((actualNumContainer) => {
        if (actualNumContainer.dataset.num === timeContainer && Number(actualNumContainer.innerHTML) < 10) {
            actualNumContainer.innerHTML = "0" + actualNumSelected
        }
    })

    previousNumContainers.forEach((previousNumContainer) => {
        if (previousNumContainer.dataset.numPrev === timeContainer && Number(previousNumContainer.innerHTML) < 10) {
            previousNumContainer.innerHTML = "0" + previousNumSelected
        }
    })

    nextNumContainers.forEach((nextNumContainer) => {
        if (nextNumContainer.dataset.numNext === timeContainer && Number(nextNumContainer.innerHTML) < 10) {
            nextNumContainer.innerHTML = "0" + nextNumSelected
        }
    })
}

function startTimer() {
    let actualHourSelected = Number(actualHourContainer.innerHTML)
    let actualMinSelected = Number(actualMinContainer.innerHTML)
    let actualSecSelected = Number(actualSecContainer.innerHTML)

    if (actualSecSelected > 0) {    
        topBtns[2].click()
    }
    if (actualMinSelected > 0 && actualSecSelected === 0) {
        topBtns[1].click()
        topBtns[2].click()
    }
    if (actualHourSelected > 0 && actualMinSelected === 0 && actualSecSelected === 0) {
        topBtns[0].click()
        topBtns[1].click()
    }

    if (actualHourSelected === 0 && actualMinSelected === 0 && actualSecSelected === 0) {
        startBtn.classList.remove("bloqueado")
        topBtns.forEach((topBtn) => {
            topBtn.classList.remove("bloqueado")
        })
        bottomBtns.forEach((bottomBtn) => {
            bottomBtn.classList.remove("bloqueado")
        })
        actualNumContainers.forEach((actualNumContainer) => {
            actualNumContainer.classList.add("acabou")
        })
        return
    }

    timer = setTimeout(() => {
        startTimer()
    }, 1000)
}

function saveLocalStorage(itemName, itemValue) {
    localStorage.setItem(itemName, itemValue)
}

function getActualTime() {
    let timeSelected = []
    let previousTimeSelected = []
    let nextTimeSelected = []

    actualNumContainers.forEach((actualNumContainer) => {
        timeSelected.push(actualNumContainer.innerHTML)
    })
    previousNumContainers.forEach((previousNumContainer) => {
        previousTimeSelected.push(previousNumContainer.innerHTML)
    })
    nextNumContainers.forEach((nextNumContainer) => {
        nextTimeSelected.push(nextNumContainer.innerHTML)
    })

    return {
        actualTime: timeSelected,
        previousTime: previousTimeSelected,
        nextTime: nextTimeSelected
    }
}

// Chamar funções

awakeTopBtns()
awakeBottomBtns()

startBtn.addEventListener("click", () => {
    let times = getActualTime()
    
    saveLocalStorage("timeSelected", JSON.stringify(times.actualTime))
    saveLocalStorage("previousTimeSelected", JSON.stringify(times.previousTime))
    saveLocalStorage("nextTimeSelected", JSON.stringify(times.nextTime))

    startBtn.classList.add("bloqueado")
    topBtns.forEach((topBtn) => {
        topBtn.classList.add("bloqueado")
    })
    bottomBtns.forEach((bottomBtn) => {
        bottomBtn.classList.add("bloqueado")
    })
    startTimer()
})

pauseBtn.addEventListener("click", () => {
    topBtns.forEach((topBtn) => {
        topBtn.classList.remove("bloqueado")
    })
    bottomBtns.forEach((bottomBtn) => {
        bottomBtn.classList.remove("bloqueado")
    })
    clearInterval(timer)
    startBtn.classList.remove("bloqueado")
})

// Usar teclas de atalho

var keys = []

window.addEventListener("keydown", (e) => {
    keys.push(e.key)
    
    if (keys.includes("Control") && e.key === "i" && !startBtn.classList.contains("bloqueado")) {
        e.preventDefault()
        startBtn.click()
    }

    if (keys.includes("Control") && e.key === "p") {
        e.preventDefault()
        pauseBtn.click()
    }
})

window.addEventListener("keyup", () => {
    keys = []
})