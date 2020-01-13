// Display reset button when timer starts, which would show reset modal on click
const displayResetButton = type => {
  const resetButton = document.getElementById('reset-button')

  if (type === 'show') {
    resetButton.classList.replace('opacity-0', 'opacity-100')
  } else if (type === 'hide') {
    resetButton.classList.replace('opacity-100', 'opacity-0')
  }
}

// Modal for game reset confirmation
const displayResetModal = (type, text, cardNum) => {
  const resetModal = document.getElementById('reset-modal')

  if (type === 'show') {
    const resetModalText = document.getElementById('reset-modal-text')
    resetModalText.innerText = text
    resetModal.classList.remove('hidden')

    const resetYes = document.getElementById('reset-yes')
    resetYes.addEventListener('click', () => {
      document.location.href = `/${cardNum}/`
    })
  } else if (type === 'hide') {
    resetModal.classList.add('hidden')
  }
}

// Show reset modal on click
const resetButton = document.getElementById('reset-button')
resetButton.addEventListener('click', () => {
  const nav = document.getElementById('nav')
  const navActive = nav.querySelector('.active')
  const cardNum = navActive.getAttribute('data-count')
  displayResetModal('show', 'Restart the game?', cardNum)
})

const resetModalBg = document.getElementById('reset-modal-bg')
resetModalBg.addEventListener('click', () => displayResetModal('hide', null, null))

const resetModalClose = document.getElementById('reset-modal-close')
resetModalClose.addEventListener('click', () => displayResetModal('hide', null, null))

const resetNo = document.getElementById('reset-no')
resetNo.addEventListener('click', () => displayResetModal('hide', null, null))