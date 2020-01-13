document.addEventListener('DOMContentLoaded', () => {
  // Called twice to readjust the height
  updateCardHeight()
  updateCardHeight()
  addCardClickListener()
})

window.addEventListener('resize', () => {
  updateCardHeight()
})

const addCardClickListener = (() => {
  let cardImg = null // event.target
  let card = null // Ancestor of cardImg
  let activeCard = null // First of the two showing cards
  let disableEvents = false // Disable card flips
  let totalCards = 0 // Total cards in play
  let solvedCards = 0 // Matched cards
  let timer = null // Timer object for speed measurement

  // Start and display timer on the timerDisplay element
  const handleTimer = () => {
    if (!timer) {
      const timerDisplay = document.getElementById('timerDisplay')
      timer = new Timer(timerDisplay)
      timer.start()
      displayResetButton('show')
    }
  }

  const showCard = () => card.classList.add('rotate-y-180')
  
  // Compare 2 cards and either hide or keep them depending on whether they match
  // Complete the game if all cards have been matched
  const compareCards = () => {
    // Compare and keep the numbers if they match
    if (activeCard.getAttribute('data-value') === card.getAttribute('data-value')) {
      activeCard = null
      solvedCards += 2
      if (solvedCards === totalCards) handleGameComplete()
    } else {
      hideMismatchedCards()
    }
  }

  // Hide the cards and disable events after a delay
  const hideMismatchedCards = () => {
    disableEvents = true
    
    setTimeout(() => {
      card.classList.remove('rotate-y-180')
      activeCard.classList.remove('rotate-y-180')
      activeCard = null
      disableEvents = false
    }, 600)
  }

  const handleGameComplete = () => {
    if (timer) timer.stop()

    // Add blinking effect
    const timerDisplay = document.getElementById('timerDisplay')
    const timerDisplayParent = timerDisplay.parentElement
    const emojiElement = document.createElement('div')
    emojiElement.classList.add('absolute', 'pr-20', 'blink')
    emojiElement.innerHTML = '&#127882;'
    timerDisplayParent.append(emojiElement)
    timerDisplay.classList.add('blink')
  }

  return () => {
    cardImgs = document.getElementsByClassName('card-img')
    if (!totalCards) totalCards = cardImgs.length

    if (!solvedCards) {
      for (cardImg of cardImgs) {
        let cardParent = cardImg.parentElement.parentElement
        if (cardParent.classList.contains('rotate-y-180')) {
          solvedCards += 1
        }
      }
    }

    if (solvedCards === totalCards) {
      handleGameComplete()
    } else {
      const timerDisplay = document.getElementById('timerDisplay')
      if (timerDisplay.innerText !== '00:00') handleTimer()
    }

    // Add a click listener to each card image
    for (cardImg of cardImgs) {
      cardImg.addEventListener('click', event => {
        if (disableEvents) return
        handleTimer() // Start the timer

        cardImg = event.target
        card = cardImg.parentElement.parentElement
        showCard()

        // Assign the active card if this is the first card clicked
        if (!activeCard) {
          activeCard = card
          return
        }
        compareCards()
      })
    }
  }
})()

// Adjust div to fit to card height based on card width
const updateCardHeight = () => {
  cardImgs = document.getElementsByClassName('card-img')

  for (cardImg of cardImgs) {
    const card = cardImg.parentElement.parentElement
    const width = card.offsetWidth
    card.setAttribute('style', `height: ${Math.ceil(width * 1.4)}px;`)
  }
}

// Show or hide the navigation items on clicking the hamburger icon on mobile
const toggleNav = () => {
  const nav = document.getElementById('nav')
  const navClass = nav.classList

  if (navClass.contains('opacity-0')) {
    navClass.replace('pointer-events-none', 'pointer-events-auto')
    navClass.replace('opacity-0', 'opacity-100')
  } else if (navClass.contains('opacity-100')) {
    navClass.replace('opacity-100', 'opacity-0')
    navClass.replace('pointer-events-auto', 'pointer-events-none')
  }
}
