
function useSpin(){
  const regularNotificationSound = new Audio('/spin.mp3');

  function spinSound(){
    regularNotificationSound.play()
  }

  return{
    spinSound
  }
}

export default useSpin