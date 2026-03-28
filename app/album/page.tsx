"use client";

import { useState, useRef } from "react";

export default function Album() {
    // New state variables for the message box lock
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const MESSAGE_PASSCODE = "tiramisu"; // Change this to whatever you want!

    // Handle password submission for the message
    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === MESSAGE_PASSCODE) {
            setIsUnlocked(true);
        } else {
            alert("Nice try!");
            setPasswordInput("");
        }
    };

    // State to track which image is currently zoomed, if any
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);
    
    // A reference to hold our 500ms timer
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Your photos. Just update the file names and captions here!
    const photos = [
        { id: 1, src: "/photo1.jpg", caption: "i love the smiths!" },
        { id: 2, src: "/photo2.jpg", caption: "i love bags by clairo!" },
        { id: 3, src: "/photo3.jpg", caption: ":( :)" },
        { id: 4, src: "/photo4.jpg", caption: ":) :(" },
        { id: 5, src: "/photo5.jpg", caption: "oink w mom" },
        { id: 6, src: "/photo6.jpg", caption: "oink w dad" },
        { id: 7, src: "/photo7.jpg", caption: "roses?" },
        { id: 8, src: "/photo8.jpg", caption: "sure!" },
        { id: 9, src: "/photo9.jpg", caption: "skateboard rack" },
        { id: 10, src: "/photo10.jpg", caption: "bag rack" },
        { id: 11, src: "/photo11.jpg", caption: "✌️✌️✌️" },
        { id: 12, src: "/photo12.jpg", caption: "✌️✌️" },
        { id: 13, src: "/photo13.jpg", caption: "best view" },
        { id: 14, src: "/photo14.jpg", caption: "view" },
        { id: 15, src: "/photo15.jpg", caption: "make a wish" },
        { id: 16, src: "/photo16.jpg", caption: "what did you wish for?" },
        
    ];

    // Triggered the exact millisecond they touch the photo
    const handlePressStart = (src: string) => {
        timerRef.current = setTimeout(() => {
            setZoomedImage(src);
            // Gives a tiny haptic vibration on Android/supported devices when it pops
            if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(50);
            }
        }, 500); // 500 milliseconds = the standard long-press time
    };

    // Triggered if they let go before 500ms, or if they scroll away
    const handlePressCancel = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };


  return (
        <main className="relative min-h-screen text-neutral-100 p-4 font-sans selection:bg-pink-500/30">
            {/* Background Layers */}
            <div className="fixed inset-0 -z-20 h-full w-full bg-[url('/bg.jpg')] bg-cover bg-center"></div>
            <div className="fixed inset-0 -z-10 h-full w-full bg-neutral-950/40"></div>

            <div className="max-w-2xl mx-auto pt-24 pb-12 space-y-8 px-4">

                {/* The Copyright Message */}
                <div className="text-center text-xs text-neutral-900 font-medium tracking-widest uppercase">
                © 2026 Abel Wang
                </div>
                
                {/* Header */}
                <div className="text-center backdrop-blur-md bg-neutral-900/60 p-8 rounded-3xl border border-neutral-800 shadow-[0_0_40px_-10px_rgba(236,72,153,0.25)]">
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">
                        Happy 2 Months!
                    </h1>
                    <p className="text-neutral-400 font-medium">Some things that matched.</p>
                </div>

                {/* The Heartfelt Message Box (Password Protected) */}
                {!isUnlocked ? (
                    <form onSubmit={handleUnlock} className="backdrop-blur-md bg-neutral-900/60 p-6 sm:p-8 rounded-3xl border border-pink-500/30 shadow-[0_0_30px_-10px_rgba(236,72,153,0.15)] text-center relative overflow-hidden flex flex-col gap-4 max-w-sm mx-auto w-full">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full pointer-events-none"></div>
                        
                        <h2 className="text-xl font-bold text-white relative z-10">...</h2>
                        <p className="text-sm text-neutral-400 relative z-10">miss you food lowercase</p>
                        
                        <input
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            placeholder="Passcode..."
                            className="mt-2 block w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-center tracking-widest relative z-10"
                        />
                        
                        <button
                            type="submit"
                            className="mt-2 w-full bg-pink-500/20 hover:bg-pink-500/40 text-pink-300 border border-pink-500/50 font-bold text-lg py-3 rounded-xl transition-all active:scale-[0.98] relative z-10"
                        >
                            Unlock
                        </button>
                    </form>
                ) : (
                    <div className="backdrop-blur-md bg-neutral-900/60 p-6 sm:p-8 rounded-3xl border border-pink-500/30 shadow-[0_0_30px_-10px_rgba(236,72,153,0.15)] text-center relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full pointer-events-none"></div>
                        <p className="text-neutral-200 leading-relaxed text-sm sm:text-base relative z-10">
                            Hi Grace, happy 2 months! Building this site and looking through these photos just reminded me of how incredibly fun the last couple of months have been with you. My favorite part of any day is getting to spend it with you. You always ask about it, but you should already know the answer before you do. Whenever I'm not with you, I instantly want tiramisu sososososo much. Here's to logging a lot more matches, a lot more tgt😛 tags, and making a lot more memories together. Hopefully, I'll eventually rise victorious in Wordle.
                        </p>
                        <p className="text-pink-400 font-bold mt-4 relative z-10">
                            Love, yy
                        </p>
                    </div>
                )}

                {/* Photo Grid - dynamically mapping the 6 photos */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {photos.map((photo) => (
                        <div 
                            key={photo.id}
                            className="backdrop-blur-md bg-neutral-900/60 p-2 sm:p-3 rounded-2xl sm:rounded-3xl border border-neutral-800 transition-all duration-300 select-none cursor-pointer"
                            
                            /* All the event listeners needed to catch touches and mouse clicks */
                            onTouchStart={() => handlePressStart(photo.src)}
                            onTouchEnd={handlePressCancel}
                            onTouchMove={handlePressCancel}
                            onMouseDown={() => handlePressStart(photo.src)}
                            onMouseUp={handlePressCancel}
                            onMouseLeave={handlePressCancel}
                            
                            /* CRITICAL: Stops the default Apple "Save Image" menu from interrupting us */
                            onContextMenu={(e) => e.preventDefault()}
                            style={{ WebkitTouchCallout: "none" }}
                        >
                            {/* Adding pointer-events-none to children so the parent div catches all the touches smoothly */}
                            <div className="aspect-square rounded-xl sm:rounded-2xl bg-neutral-800 overflow-hidden mb-2 relative pointer-events-none">
                                <img src={photo.src} alt="Us" className="object-cover w-full h-full pointer-events-none" />
                            </div>
                            <p className="text-center text-xs sm:text-sm text-pink-400 font-medium pb-1 pointer-events-none">
                                {photo.caption}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* The Apple-Style Expanded Overlay */}
            {zoomedImage && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl transition-opacity cursor-pointer"
                    onClick={() => setZoomedImage(null)} // Tap anywhere to close
                >
                    <img 
                        src={zoomedImage} 
                        alt="Zoomed" 
                        // Scales it up beautifully while keeping it contained to the screen
                        className="max-w-full max-h-full rounded-xl shadow-2xl object-contain shadow-pink-500/20"
                    />
                    
                    {/* A sleek close 'X' button in the top right */}
                    <button 
                        className="absolute top-6 right-6 p-2 bg-neutral-800/50 rounded-full text-white hover:bg-neutral-700 transition-colors"
                        onClick={() => setZoomedImage(null)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
            )}
        </main>
    );
}