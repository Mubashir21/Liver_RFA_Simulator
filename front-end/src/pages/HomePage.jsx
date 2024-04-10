import React, { useState, useEffect } from 'react';

function TypingEffect({ strings, typeSpeed, backSpeed, loop }) {
    const [text, setText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [typingForward, setTypingForward] = useState(true);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (typingForward) {
          // Typing forward
          if (text.length < strings[currentIndex].length) {
            setText(strings[currentIndex].slice(0, text.length + 1));
          } else {
            // After typing full string, wait for backSpeed before starting to delete
            setTimeout(() => setTypingForward(false), backSpeed);
          }
        } else {
          // Typing backward
          if (text.length > 0) {
            setText(strings[currentIndex].slice(0, text.length - 1));
          } else {
            // After deleting full string, move to next string or loop
            if (loop || currentIndex < strings.length - 1) {
              const nextIndex = (currentIndex + 1) % strings.length;
              setCurrentIndex(nextIndex);
              setTypingForward(true);
            }
          }
        }
      }, typingForward ? typeSpeed : backSpeed);
  
      return () => clearInterval(interval);
    }, [text, currentIndex, typingForward, strings, typeSpeed, backSpeed, loop]);
  
    return (
      <span>{text}</span>
    );
  }

  function HomePage() {
    return (
        <>
            <div className="relative h-screen">
                <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover z-0">
                    <source src="test1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 bg-black opacity-40"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                    <div className="max-w-[800px] mx-auto text-center">
                        <h1 style={{ fontSize: '3rem' }} className="md:text-3xl font-bold py-8">Next-Gen</h1>
                        <h1 style={{ fontSize: '3rem' }} className="md:text-3xl font-bold">RFA Simulation<br></br><br></br><br></br></h1>
                        <TypingEffect className="text-lg mb-6" strings={["NOL-driven Treatment Planning for Liver Cancer"]} typeSpeed={80} backSpeed={70} loop />
                    </div>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
                {/* Left Container */}
                <div className="relative col-span-1">
                    <div className="absolute inset-0 bg-cover bg-center z-10 transition-opacity duration-500 hover:opacity-100" style={{ backgroundImage: "url('revolution.jpg')" }}></div>
                    <div className="relative z-20 p-20 md:p-20 bg-black bg-opacity-80 h-full opacity-75 transition-opacity duration-500 hover:opacity-100">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">REVOLUTIONIZE</h2>
                        <p className="text-lg">Revolutionizing healthcare with AI</p>
                    </div>
                </div>

                {/* Middle Container */}
                <div className="relative col-span-1">
                    <div className="absolute inset-0 bg-cover bg-center z-10 transition-opacity duration-500 hover:opacity-100" style={{ backgroundImage: "url('realtime.jpg')" }}></div>
                    <div className="relative z-20 p-20 md:p-20 bg-black bg-opacity-80 h-full opacity-80 transition-opacity duration-500 hover:opacity-100">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">REAL TIME</h2>
                        <p className="text-lg">Navigate the future with instant insights</p>
                    </div>
                </div>

                <div className="relative col-span-1">
                    <div className="absolute inset-0 bg-cover bg-center z-10 transition-opacity duration-500 hover:opacity-100" style={{ backgroundImage: "url('Nature.jpeg')" }}></div>
                    <div className="relative z-20 p-20 md:p-20 bg-black bg-opacity-80 h-full opacity-75 transition-opacity duration-500 hover:opacity-100">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">PERSONALIZE</h2>
                        <p className="text-lg">Tailored wellness just for you</p>
                    </div>
                </div>

                </div>

                <div className="relative h-screen">
                <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover z-0">
                    <source src="test7.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 bg-black opacity-70"></div>

                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-20">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center py-1">Unlocking precision through AI</h2>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center py-1">for advanced</h2>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center py-1">liver cancer treatment planning</h2>
                        <p className="text-lg text-center p-10">Revolutionizing healthcare for tomorrow</p>
                    </div>
                </div>
        </>
    );
}

export default HomePage;
