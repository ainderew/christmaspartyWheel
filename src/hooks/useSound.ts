"use client"
function useSound(){
  const regularNotificationSound = new Audio('/spin.mp3');
  const winnerSound = new Audio('/victory.mp3');
  const songSound = new Audio('/song.mp3');

  function playSpinSound(){
    regularNotificationSound.play()
    songSound.pause()
  }

  function playWinnerSound(){
    winnerSound.play()
    songSound.play()
  }

  return{
    playSpinSound,
    playWinnerSound
  }
}

export default useSound