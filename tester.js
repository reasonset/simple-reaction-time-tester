var nextEvent
var eventTarget = [new Date().getTime()]
var pressing = []
var currentEvent = 0
var timer_event

const TEST_NAMES = [
  "Green back",
  "Red back",
  "Black back",
  "Blue ball",
  "Pale blue ball",
  "Small gray ball",
  "Green line",
  "Random gray line",
  "Random pale orange ball",
  "Quick fox"
]

document.addEventListener("keypress", e => {
  const triggered = new Date().getTime()
  const key = e.key
  if (key !== "Enter") { return }
  if (triggered < eventTarget[currentEvent]) {
    clearTimeout(timer_event)
    document.body.className = "jump"
    nextEvent = null
    return
  }
  if (nextEvent) { nextEvent(triggered) }
})

function reset() {
  document.body.className = "default"
}

function finishEvent() {
  reset()

  pressing.shift()
  const result = document.getElementById("TestResult")

  for (let i=0; i < pressing.length; i++) {
    const tr = document.createElement("tr")
    const td1 = document.createElement("td")
    const td1_text = document.createTextNode(TEST_NAMES[i])
    td1.appendChild(td1_text)
    const td2 = document.createElement("td")
    const td2_text = document.createTextNode((pressing[i] / 1000).toFixed(3))
    td2.appendChild(td2_text)
    tr.appendChild(td1)
    tr.appendChild(td2)
    result.appendChild(tr)
  }

  const mean_tr = document.createElement("tr")
  mean_tr.className = "bold"
  const mean_td1 = document.createElement("td")
  const mean_td1_text = document.createTextNode("Mean")
  mean_td1.appendChild(mean_td1_text)
  const mean_td2 = document.createElement("td")
  const mean_td2_text = document.createTextNode((pressing.reduce((ac, cr) => {return ac + cr}) / pressing.length / 1000).toFixed(3))
  mean_td2.appendChild(mean_td2_text)
  mean_tr.appendChild(mean_td1)
  mean_tr.appendChild(mean_td2)
  result.appendChild(mean_tr)

  document.body.className = "finish"
}

const TEST_VOLUME = 10

function set_test(clsname) {
  reset()
  currentEvent++
  const addition = 3000 + Math.floor(Math.random() * 10000)
  const target_date = new Date().getTime() + addition
  eventTarget.push(target_date)
  timer_event = setTimeout(() => {
    document.body.className = clsname
  }, addition)

  nextEvent = (triggered) => {
    pressing[currentEvent] = (triggered - target_date)
    if (currentEvent < TEST_VOLUME) {
      set_test(`test${currentEvent + 1}`)
    } else {
      finishEvent()
      nextEvent = null
    }
  }
}

nextEvent = function() {
  set_test("test1")
}
