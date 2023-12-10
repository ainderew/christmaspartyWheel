"use client"
function useSound(){
  let regularNotificationSound: HTMLAudioElement;
  let winnerSound: HTMLAudioElement;
  let songSound: HTMLAudioElement;

  if (typeof window !== 'undefined') {
    // Import and use Audio here
    regularNotificationSound = new Audio('/spin.mp3');
    winnerSound = new Audio('/victory.mp3');
    songSound = new Audio('/song.mp3');
  }
  
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