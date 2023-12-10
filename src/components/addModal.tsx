import { CloseCircleOutlined } from "@ant-design/icons";

interface addModalProps {
  setInputValue: any;
  addContestant: () => void;
  toggleModal: () => void
}

function AddModal({
  setInputValue,
  addContestant,
  toggleModal
}: addModalProps): React.ReactElement {
  return (
    <div className='z-20 w-full h-full absolute flex items-center justify-center bg-[rgba(0,0,0,0.3)]'>
      <div className='p-8 shadow-xl flex flex-col gap-4 bg-white'>
        <CloseCircleOutlined style={{color:"black"}} onClick={toggleModal} />
        <input
          onChange={(e) => setInputValue(e.target.value)}
          type='text'
          className='text-black border-2'
        />
        <button className='bg-black' onClick={addContestant}>
          Add Contestant
        </button>
      </div>
    </div>
  );
}

export default AddModal;
