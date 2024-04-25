import React, { useState } from 'react';

function About() {
    const [backgroundVideos, setBackgroundVideos] = useState({
        part1: 'abstract-yellow.mp4',
        part2: 'greyscale.mp4',
        part3: 'aboutbg.mp4',
        part4: 'hands.mp4',
    });

    return (
        <div>
            {/* First part */}
            <section className="relative h-screen">
                <video className="absolute top-0 left-0 w-full h-full object-cover z-0" src={backgroundVideos.part1} autoPlay loop muted />
                <div className="absolute inset-0" style={{ opacity: '0.70', backgroundColor: '#001B3A' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-center">
                    <h2 className="font-serif italic text-5xl md:text-8xl font-bold">Understanding<br/>Liver Cancer</h2>
                    <p className="mt-5 pt-5 italic text-lg arial">What do we know about Liver Cancer?</p>
                </div>
            </section>


            <section className="relative h-screen">
                {/* Background video */}
                <div className="relative h-screen">
                    <video className="background-video w-full h-full object-cover" src={backgroundVideos.part1} autoPlay loop muted />
                    <div className="absolute inset-0" style={{ opacity: '0.78', backgroundColor: '#001B3A' }}></div>
                </div>



                <div className="absolute inset-0 flex flex-col md:flex-row justify-center items-center"> {/* Center content vertically and horizontally */}
                    <div className="w-full md:w-1/2 flex items-center justify-center">
                        <div className="text-center">
                <br/><br/>
                <img className="mx-auto mb-4 object-cover w-2/3 h-full md:w-2/3 md:h-full lg:w-2/3 lg:h-full" src="Liver-cancer.jpg" alt="Liver" />
                <div className="mt-2 italic text-center">
                        <p>Liver cells with hepatocellular carcinoma (HCC)</p>
                    </div>
            </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
            <div>
                <h2 className=" italic font-semibold text-center lg:text-left text-2xl xl:text-4xl md:text-3xl sm:text-2xl lg:text-3xl mt-4 mb-4">What is Liver Cancer?</h2> 
                <p className="text-base xl:text-base md:text-base sm:text-base text-center lg:text-left lg:text-base mt-4 mb-4">A cancer that starts in the liver. It occurs<br />when a malignant tumor grows on the liver.</p> {/* Adjusted text size for different screen sizes */}
                <br/>
                <h2 className=" italic font-semibold text-center lg:text-left text-2xl xl:text-4xl md:text-3xl sm:text-2xl lg:text-3xl mt-4 mb-4">Causes</h2> 
                <p className="text-base xl:text-base md:text-base sm:text-base text-center lg:text-left lg:text-base mt-4 mb-4">1. Chronic Viral Hepatitis<br />2. Heavy Alcohol Use<br />3. Tobacco Use</p> {/* Adjusted text size for different screen sizes */}
            </div>
        </div>
    </div>

            </section>
            
            





        <section className="relative h-screen flex flex-col items-center justify-center">
            {/* Background video */}
            <video className="absolute top-0 left-0 w-full h-full object-cover z-0" src={backgroundVideos.part1} autoPlay loop muted />
                <div className="absolute inset-0" style={{ opacity: '0.70', backgroundColor: '#001B3A' }}></div>
            {/* Heading */}
            <h2 className="text-lg xl:text-4xl md:text-3xl sm:text-3xl font-bold italic text-center text-white z-10 px-4 py-2">Do you know the symptoms of Liver Cancer?</h2>
            <br/><br/>
            {/* Three pictures */}
            <div className="max-w-screen-xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
            {/* Left Container */}
            <div className="relative col-span-1">
                <div className="absolute inset-0 bg-cover bg-center z-10 transition-opacity duration-500 hover:opacity-100" style={{ backgroundImage: "url('jaundice.jpg')" }}></div>
                    <div className="relative z-20 p-8 md:p-20 bg-black bg-opacity-80 h-full opacity-0 transition-opacity duration-200 hover:opacity-100 flex items-center justify-center">
                        <h2 className="text-center text-base md:text-xl font-semibold text-white">Jaundice</h2>
                </div>
            </div>

            {/* Middle Container */}
            <div className="relative col-span-1">
                <div className="absolute inset-0 bg-cover bg-center z-10 transition-opacity duration-500 hover:opacity-100" style={{ backgroundImage: "url('abdominal-pain.jpg')" }}></div>
                    <div className="relative z-20 p-8 md:p-20 bg-black bg-opacity-80 h-full opacity-0 transition-opacity duration-300 hover:opacity-100 flex items-center justify-center">
                        <h2 className="text-center text-base md:text-xl font-semibold text-white">Abdominal Pain</h2>
                    </div>
            </div>

            {/* Right Container */}
            <div className="relative col-span-1">
                <div className="absolute inset-0 bg-cover bg-center z-10 transition-opacity duration-500 hover:opacity-100" style={{ backgroundImage: "url('nausea.png')" }}></div>
                <div className="relative z-20 p-8 md:p-20 bg-black bg-opacity-80 h-full opacity-0 transition-opacity duration-400 hover:opacity-100 flex items-center justify-center">
                    <h2 className="text-center text-base md:text-xl font-semibold text-white">Nausea</h2>
                </div>
            </div>
            </div>
        </section>



        <section className="relative">
            <div className="relative h-screen">
                <video className="background-video w-full h-full object-cover" src={backgroundVideos.part2} autoPlay loop muted />
                <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>
            <div className="italic absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-center">
                    <p className="text-white text-lg xl:text-4xl md:text-3xl sm:text-3xl mb-4 md:mb-8">"Liver Cancer is the</p>
                    <p className="text-white text-lg xl:text-4xl md:text-4xl sm:text-3xl font-bold mb-4 md:mb-8">6th Most Diagnosed Cancer Worldwide</p>
                    <p className="text-white text-lg xl:text-4xl md:text-3xl sm:text-3xl mb-4 md:mb-8">and the</p>
                    <p className="text-white text-lg xl:text-4xl md:text-4xl sm:text-3xl font-bold mb-4 md:mb-8">4th Leading Cause of Cancer Death Globally."</p>
                    <br/>
                    <p className="text-white text-sm md:text-sm mb-4 md:mb-8 mr-4 md:mr-4">- WORLD HEALTH ORGANISATION, WHO (2020)</p>
                </div>
            </div>
        </section>

            {/* Fourth part */}
        <section className="relative">
            <div className="relative h-screen">
                <div className="absolute inset-0 bg-black opacity-65"></div>
                <video className="background-video w-full h-full object-cover" src={backgroundVideos.part3} autoPlay loop muted />
            </div>
            <div className="absolute inset-0 flex flex-col md:flex-row justify-center items-center"> {/* Center content vertically and horizontally */}
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl sm:text-3xl font-bold mb-4">About Us</h2> {/* Adjusted text size for different screen sizes */}
                        <br/><br/>
                        <img className="mx-auto mb-4 rounded-full object-cover w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80" src="liver.png" alt="Liver" /> {/* Adjusted image size for different screen sizes */}
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
                    <div>
                        <p className="text-base xl:text-base md:text-base sm:text-base mt-4 mb-4">We aim to develop cutting-edge technology<br/>that enhances treatment planning through<br/>real-time simulation.</p> {/* Adjusted text size for different screen sizes */}
                        <br/><br/>
                        <p className="text-base xl:text-base md:text-base sm:text-base">We employ neural operator learning to create<br/>deep learning based models specifically<br/>tailored for radio-frequency (RFA) simulation.</p> {/* Adjusted text size for different screen sizes */}
                    </div>
                </div>
            </div>
        </section>



          

        <section className="relative">
            <div className="relative h-screen">
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <video className="background-video w-full h-full object-cover" src={backgroundVideos.part3} autoPlay loop muted />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-screen-xl w-full flex justify-center">
                    {/* Heading */}
                    <div className="flex flex-col items-center justify-center w-full">
                        <h1 className="text-white text-3xl md:text-3xl lg:text-4xl font-bold pb-10">Technology and Medicine</h1>
                            {/* Vertical line */}
                            <div className="mt-5 w-0.5 h-80 bg-white"></div> {/* Adjusted height to h-80 */}
                    </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-screen-xl w-full flex justify-center">
                    {/* Left side */}
                    <div className="flex flex-col items-center justify-center w-full md:w-1/2 pr-4"> {/* Adjusted width to full width on small screens */}
                        <div className="pl-4 pt-5">
                            <p className="text-base md:text-lg lg:text-xl xl:text-2xl p-2 text-center font-semibold pt-8 pb-8">Neural Operator Learning</p>
                            
                        <div className="flex items-center justify-center">
                            <img src="neuralnetwork.png" alt="Neural Networks Icon" className="w-20 h-20" />
                        </div>

                        <p className="text-xs md:text-sm lg:text-base xl:text-lg p-2 text-center pt-8">Employ neural operator learning to construct a<br/>deep learning based model</p>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex flex-col items-center justify-center w-full md:w-1/2 pl-4"> {/* Adjusted width to full width on small screens */}
                        <div className="pl-4 pt-5">
                            <p className="text-base md:text-lg lg:text-xl xl:text-2xl p-2 text-center font-semibold pt-8 pb-8">Radiofrequency Ablation </p>
                                <div className="flex items-center justify-center">
                                    <img src="surgery.png" alt="Surgery Icon" className="w-20 h-20" />
                                </div>
                            <p className="text-xs md:text-sm lg:text-base xl:text-lg p-2 text-center pt-8">Use heat generated by high frequency electrical current<br/>
                            to treat small liver tumours</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="relative">
            <div className="relative h-screen">
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <video className="background-video w-full h-full object-cover" src={backgroundVideos.part3} autoPlay loop muted />
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center absolute inset-0">
        
            {/* Left side */}
            <div className="text-center p-8 bg-transparent z-10 w-full lg:w-1/2">
                <h1 className="text-white text-3xl md:text-4xl lg:text-5xl sm:text-3xl font-bold">Collaborations and<br/>Partnerships</h1>
            </div>

            {/* Right side */}
            <div className="p-10 bg-transparent z-10 w-full lg:w-1/2 flex items-center justify-center lg:justify-start"> {/* Added flex and justify-center classes */}
                <div className="text-white">
                    <div className="flex flex-col mb-8">
                        <div className="flex items-center">
                            <img src="school.png" alt="Leading Institutions Icon" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mr-4 lg:mr-10" />
                            <p className="text-base md:text-lg lg:text-xl p-2 mb-4 ml-2 lg:ml-10">Leading Institutions</p>
                        </div>
                        <div className="flex items-center mt-5 lg:mt-10">
                            <img src="care.png" alt="Medical Professionals Icon" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mr-4 lg:mr-10" />
                            <p className="text-base md:text-lg lg:text-xl p-2 mb-4 ml-2 lg:ml-10">Medical Professionals</p>
                        </div>
                        <div className="flex items-center mt-5 lg:mt-10">
                            <img src="research.png" alt="Researchers Icon" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mr-4 lg:mr-10" />
                            <p className="text-base md:text-lg lg:text-xl p-2 mb-4 ml-2 lg:ml-10">Researchers</p>
                        </div>
                    </div>
                 </div>
                </div>
            </div>
        </section>


        {/* Last part */}
        <section className="relative">
            <div className="relative h-screen">
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <video className="background-video w-full h-full object-cover" src={backgroundVideos.part4} autoPlay loop muted />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-screen-xl w-full flex justify-center">
                {/* Content */}
                    <div className="text-white text-center">
                        <h2 className="text-4xl mb-3 xl:text-7xl md:text-6xl sm:text-5xl font-bold">Join Us in the Fight<br/>Against Liver Cancer</h2>
                        <p className="mt-5 pt-5 italic text-base xl:text-base md:text-base sm:text-base arial">Explore our vision for the future of our project and our
                        <br/>commitment to continued growth and improvement</p>
                    </div>
                </div>
            </div>
        </section>

    </div>
    );
}

export default About;
