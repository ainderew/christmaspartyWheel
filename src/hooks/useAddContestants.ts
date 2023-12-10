import { useState } from "react";

function useAddContestants(){
  const [contestants, setContestants] = useState<string[]>([
    "Andrew",
    "Manuelene",
  ]);

  const [showModal, setShowModal] = useState<boolean>(false)

  const [inputValue, setInputValue] = useState<string>("");

  function addContestant() {
    setContestants((prev) => [...prev, inputValue]);
  }

  function toggleModal(){
    setShowModal(prev =>!prev)
  }

  return {
    contestants,
    setInputValue,
    addContestant,
    showModal,
    toggleModal
  }
}

export default useAddContestants