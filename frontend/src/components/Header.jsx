import React, { useEffect, useState } from 'react';
import "./Header.css";

function Header() {
    const images = [
        "/src/Images/Header/pexels-pixabay-262405.jpg",
        "/src/Images/Header/pexels-team-evelo-413077137-15020730.jpg",
        "/src/Images/Header/pexels-nordic-overdrive-202768-627678.jpg",
        "/src/Images/Header/pexels-pixabay-417451.jpg",
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="header-container flex flex-col items-center justify-center py-8 text-white">
            <div className="header-slider" style={{ backgroundImage: `url(${images[currentImage]})` }}>
                <div className="overlay"></div>
                <div className="content">
                    <h1 className="text-9xl p-4 space-x-10 font-bold text-white">RENT EASE</h1>
                    <p className="text-2xl mt-2 text-lime-600 font-medium tracking-widest">Rental Magic, No Need To Panic!</p>
                    
                </div>
            </div>
        </div>
    );
}

export default Header;
