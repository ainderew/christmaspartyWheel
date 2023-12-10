"use client";
import { useEffect, useRef, useState } from "react";
import useSpin from "@/hooks/useSpin";
import Image from "next/image";
import SideBar from "@/components/sidebar";
import AddModal from "@/components/addModal";
import useAddContestants from "@/hooks/useAddContestants";

const spinDuration = 60000;
let currentAngle = 0;
const arrowAngle = -Math.PI / 2; // Arrow points to the top (north)

export default function Home() {
  const { spinSound } = useSpin();
  const { addContestant, contestants, setInputValue, toggleModal, showModal } =
    useAddContestants();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [spinning, setSpinning] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>("");
  const [angle, setAngle] = useState<number>(0)

  const getRandomColor = (index: number): string => {
    const choices = [
      "#EC534E",
      "#F1AA08",
      "#275CAB",
      "#9C1A4B",
      "#279374",
      "#BDBBA9",
      "#BC2C2D",
    ];

    return choices[index % 6];
  };

  const initialLoad = useRef<boolean>(true);


  function drawWheel(){
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");

    if (context && canvas) {
      const slices = contestants.length;
      setAngle((2 * Math.PI) / slices)

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = centerX - 100;

      const arrowLength = radius + 20; // Length of the arrow
     

    
      

        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw wheel
        context.beginPath();
        context.arc(
          centerX,
          centerY,
          radius,
          currentAngle,
          currentAngle + 2 * Math.PI
        );
        context.fillStyle = "blue";
        context.fill();
        context.closePath();
        // Draw contestants
        contestants.forEach((contestant, index) => {
          const startAngle = currentAngle + index * angle;
          const endAngle = currentAngle + (index + 1) * angle;

          context.beginPath();
          context.moveTo(centerX, centerY);
          context.arc(centerX, centerY, radius, startAngle, endAngle);
          context.fillStyle = getRandomColor(index);
          context.fill();
          context.closePath();

          // Draw the text at the center of each slice
          const textAngle = currentAngle + index * angle + angle / 2;
          const textX = centerX + Math.cos(textAngle) * (radius / 2);
          const textY = centerY + Math.sin(textAngle) * (radius / 2);

          // Rotate the context to display text vertically
          context.save();
          context.translate(textX, textY);
          context.rotate(textAngle + Math.PI); // Rotate by 90 degrees
          context.textAlign = "center";
          context.textBaseline = "middle";

          // Draw the text
          context.fillStyle = "white";
          context.font = "bold 15px Arial"; // Adjust font size as needed
          context.fillText(contestant, 0, 0);
          context.restore();
        });

        // Draw arrow
        const arrowX = centerX + Math.cos(arrowAngle) * arrowLength;
        const arrowY = centerY + Math.sin(arrowAngle) * arrowLength;

        context.beginPath();
        context.moveTo(centerX, centerY - 300);
        context.lineTo(arrowX, arrowY);
        context.lineWidth = 5;
        context.strokeStyle = "gold";
        context.stroke();
        context.closePath();
      }
  }

  useEffect(() => {
    let startTime: number;
    let currentSpeed = 0;

      const spin = (timestamp: number) => {
        if (!startTime) startTime = timestamp;

        const elapsed = timestamp - startTime;
        const spinPercentage = Math.min(elapsed / spinDuration, 1);

        currentSpeed *= 0.995; // Adjust deceleration factor as needed
        currentAngle += currentSpeed;

        drawWheel();

        if (spinPercentage < 1 && Math.abs(currentSpeed) > 0.001) {
          requestAnimationFrame(() => spin(spinDuration));
        } else {
          setSpinning(false);

          // Determine the winner based on the arrow angle
          const arrowAngleNormalized =
            ((arrowAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
          const wheelAngleNormalized =
            ((currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

          // Find the contestant index that corresponds to the arrow
          const winnerIndex = Math.floor(
            ((arrowAngleNormalized - wheelAngleNormalized) % (2 * Math.PI)) /
              angle
          );

          // Set the winner based on the calculated index
          const winnerName =
            contestants[
              (winnerIndex + contestants.length) % contestants.length
            ];
          setWinner(winnerName);
        }
      };

      if (spinning) {
        setWinner(null);
        currentSpeed = Math.random() * 0.5 + 0.5; // Initial random speed
        startTime = 0;
        requestAnimationFrame(spin);
      }

      if (initialLoad.current) {
        drawWheel();
        initialLoad.current = false;
      }

    
  }, [spinning]);
  

  useEffect(() => {
    if (!winner) return;
    // alert(winner);
  }, [winner]);

  useEffect(() => {
    drawWheel()
  }, [angle,contestants.length]);

  return (
    <div className='main w-full h-screen flex items-center justify-center bg-[url("/bg.jpg")] bg-center'>
      {showModal && <AddModal addContestant={addContestant} setInputValue={setInputValue} toggleModal={toggleModal} /> }
      
      <SideBar toggleModal={toggleModal} />
      <div className='inner rounded-full outline outline-[40px] outline-[#98040F] w-[800px] h-[800px] bg-transparent absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl shadow-yellow-100'>
          <Image src={"/arrow.png"} width={80} height={107} alt='any' />
        </div>

        <div className='lights absolute -top-5 left-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-yellow-100 shadow-lg shadow-yellow-100 z-20' />

        <div className='lights absolute top-1 left-[15rem] w-3 h-3 rounded-full bg-yellow-100 shadow-lg shadow-yellow-100 z-20' />
        <div className='lights absolute top-1 right-[15rem] w-3 h-3 rounded-full bg-yellow-100 shadow-lg shadow-yellow-100 z-20' />

        <div className='lights absolute top-[12%] left-[6rem] w-3 h-3 rounded-full bg-yellow-100 shadow-lg shadow-yellow-100 z-20' />
        <div className='lights absolute top-[12%] right-[6rem] w-3 h-3 rounded-full bg-yellow-100 shadow-lg shadow-yellow-100 z-20' />

        <div className='lights absolute top-[30%] left-[0rem] w-3 h-3 rounded-full bg-yellow-100 shadow-lg shadow-yellow-100 z-20' />
        <div className='lights absolute top-[30%] right-[0rem] w-3 h-3 rounded-full bg-yellow-100 shadow-lg shadow-yellow-100 z-20' />

        <div className='lights absolute top-[50%] -left-[1rem] w-3 h-3 -translate-x-1/2 rounded-full bg-yellow-100 shadow-lg shadow-yellow-100 z-20' />
        <div className='lights absolute top-[50%] -right-[1rem] w-3 h-3 translate-x-1/2 rounded-full bg-yellow-100 shadow-lg shadow-yellow-100 z-20' />

        <div className='lights absolute bottom-1 left-[15rem] w-3 h-3 rounded-full bg-yellow-100 shadow-lg shadow-yellow-100 z-20' />
        <div className='lights absolute bottom-1 right-[15rem] w-3 h-3 rounded-full bg-yellow-100 shadow-lg shadow-yellow-100 z-20' />

        <div className='lights absolute bottom-[12%] left-[6rem] w-3 h-3 rounded-full bg-yellow-100 shadow-lg shadow-yellow-100 z-20' />
        <div className='lights absolute bottom-[12%] right-[6rem] w-3 h-3 rounded-full bg-yellow-100 shadow-lg shadow-yellow-100 z-20' />

        <div className='lights absolute bottom-[30%] left-[0rem] w-3 h-3 rounded-full bg-yellow-100 shadow-lg shadow-yellow-100 z-20' />
        <div className='lights absolute bottom-[30%] right-[0rem] w-3 h-3 rounded-full bg-yellow-100 shadow-lg shadow-yellow-100 z-20' />

        <div className='lights absolute -bottom-5 left-1/2 translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-yellow-100 shadow-lg shadow-yellow-100 z-20' />
      </div>
      <canvas
        ref={canvasRef}
        className='canvas'
        width={1000}
        height={1000}
      ></canvas>

      <button
        className='absolute top-0'
        onClick={() => {
          setSpinning(true);
          spinSound();
        }}
      >
        Spin
      </button>
    </div>
  );
}

