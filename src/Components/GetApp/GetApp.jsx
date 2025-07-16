import React, { useContext, useState } from "react";
import { DarkModeContext } from "../../Context/DarkModeContext";
import phoneMockup from '../../assets/images/EliteMart-App-photo.png';
import toast from "react-hot-toast";

const GetApp = () => {
    const [contactMethod, setContactMethod] = useState("email");
    const [contactValue, setContactValue] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { darkMode } = useContext(DarkModeContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (contactValue.trim()) {
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 3000);
            setContactValue("");
        }
    };

    return (
        <section className="relative py-12 md:py-16 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center justify-around gap-6 lg:gap-8">
                    {/* Compact phone mockup */}
                    <div className="relative w-full max-w-[280px] lg:max-w-[240px] mb-8 lg:mb-0">
                        <div className="relative">
                            <div className={`absolute -inset-3 bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'}   rounded-[2.5rem] rotate-[5deg]`}></div>
                            <div className={`relative ${!darkMode ? 'bg-gray-900' : 'bg-gray-800'} rounded-[2rem] p-3 shadow-xl`}>
                                <div className={`h-4 w-24 mx-auto ${!darkMode ? 'bg-gray-800' : 'bg-gray-700'} rounded-full mb-3`}></div>
                                <div className={`bg-gradient-to-br ${!darkMode ? 'from-white to-white' : 'from-purple-950 to-fuchsia-800'} rounded-[1.8rem] overflow-hidden aspect-[9/19] flex items-center justify-center`}>
                                    <div className="w-full h-full flex flex-col items-center justify-center p-2">
                                        <img
                                            src={phoneMockup}
                                            alt="EliteMart App Screenshot"
                                            className="w-full h-auto rounded-md"
                                        />
                                    </div>
                                </div>
                                <div className="mt-3 flex justify-center">
                                    <div className="h-1 w-16 bg-gray-700 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Compact content section */}
                    <div className="w-full max-w-xl lg:max-w-lg">
                        <div className="text-center lg:text-left">
                            <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'}   text-white font-medium text-sm md:text-sm mb-3`}>
                                🚀 New & Improved
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-3">
                                Get the <span className={`text-transparent bg-clip-text bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'}`}>EliteMart</span> App
                            </h2>
                            <p className="text-sm md:text-sm text-gray-600 mb-6">
                                We'll send you a download link to get the app on your phone. Enjoy a seamless grocery shopping experience!
                            </p>
                        </div>

                        <div className={`${!darkMode ? 'bg-white border-gray-100' : 'bg-purple-950 border-purple-700'} rounded-xl shadow-lg p-4 border backdrop-blur-sm`}>
                            {/* Contact method selection */}
                            <div className="mb-4">
                                <h3 className={`font-medium ${!darkMode ? 'text-gray-700' : 'text-gray-300'}   mb-2 text-md lg:text-sm`}>Send link via:</h3>
                                <div className="flex gap-3">
                                    <ContactMethodButton
                                        active={contactMethod === "email"}
                                        onClick={() => setContactMethod("email")}
                                        icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                        }
                                        label="Email"
                                    />
                                    <ContactMethodButton
                                        active={contactMethod === "phone"}
                                        onClick={() => setContactMethod("phone")}
                                        icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                        }
                                        label="SMS"
                                    />
                                </div>
                            </div>

                            {/* Contact form */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="contact-input" className={`block text-md lg:text-xs font-medium ${!darkMode ? 'text-gray-700' : 'text-gray-300'} mb-1`}>
                                        {contactMethod === "email" ? "Email Address" : "Phone Number"}
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="contact-input"
                                            type={contactMethod === "email" ? "email" : "tel"}
                                            placeholder={contactMethod === "email" ? "your@email.com" : "+1 (123) 456-7890"}
                                            value={contactValue}
                                            onChange={(e) => setContactValue(e.target.value)}
                                            className={`w-full py-3 px-4 lg:py-2 lg:px-3 rounded-lg border ${!darkMode ? 'border-orange-300 focus:ring-orange-300 focus:border-orange-500 focus:outline-orange-600 bg-white text-gray-900 placeholder:text-orange-400' : 'border-purple-600 focus:ring-purple-500 focus:border-purple-500 focus:outline-purple-600 bg-purple-800 text-white placeholder:text-purple-300'}  focus:ring-2 transition-all duration-300 shadow-sm text-sm`}
                                            required
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                            <span className="text-gray-400 text-sm">
                                                {contactMethod === "email" ? "✉️" : "📱"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full py-3 px-5 lg:py-2 lg:px-4 bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00] hover:from-orange-500 hover:to-yellow-500' : 'from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700'} text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1 text-sm`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                                    </svg>
                                    Share App Link
                                </button>

                                {/* Submission feedback */}
                                {isSubmitted && (
                                    <div className={`flex items-center mt-3 p-2 ${!darkMode ? 'bg-orange-100 border-orange-300 text-orange-700' : 'bg-purple-500/30 border-purple-700 text-purple-300'} border rounded-md text-center text-xs`}>
                                        <div className={`w-4 h-4 rounded-full ${!darkMode ? 'bg-orange-500' : 'bg-purple-400'}   flex items-center justify-center mr-2`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        Download link sent to your {contactMethod}!
                                    </div>
                                )}
                            </form>

                            {/* App store buttons */}
                            <div className={`mt-6 pt-4 border-t ${!darkMode ? 'border-orange-300' : 'border-purple-700'}`}>
                                <p className={`text-center ${!darkMode ? 'text-orange-500' : 'text-purple-400'}  font-medium mb-3 text-md lg:text-sm`}>Download app from</p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <AppStoreButton
                                        icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        }
                                        subtitle="Download on the"
                                        title="App Store"
                                    />
                                    <AppStoreButton
                                        icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                            </svg>
                                        }
                                        subtitle="GET IT ON"
                                        title="Google Play"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Reusable Contact Method Button Component
const ContactMethodButton = ({ active, onClick, icon, label }) => {
    const { darkMode } = useContext(DarkModeContext);
    return (
        <button
            onClick={onClick}
            className={`flex-1 py-4 px-5 lg:py-2 md:px-3 rounded-lg transition-all duration-300 text-xs ${active
                ? `${!darkMode ? 'from-[#ff7f00] to-[#ffcc00] shadow-orange-200' : 'from-purple-600 to-fuchsia-600 shadow-purple-900/30 '} bg-gradient-to-r text-white font-semibold shadow-md`
                : `${!darkMode ? 'bg-orange-100 text-orange-500 hover:bg-orange-200' : 'bg-purple-800 text-purple-200 hover:bg-purple-600'}`
                }`}
        >
            <div className="flex items-center justify-center gap-1">
                {icon}
                {label}
            </div>
        </button>
    )

}


// Reusable App Store Button Component
const AppStoreButton = ({ icon, subtitle, title }) => {
    const { darkMode } = useContext(DarkModeContext);
    return (
        <a
            href="#"
            className={`flex-1 ${!darkMode ? 'bg-gray-900 hover:bg-black' : 'bg-purple-800 hover:bg-purple-900'} text-white rounded-lg p-3 lg:p-2 transition-all duration-300 shadow hover:shadow-md flex items-center gap-2 group text-xs`}
        >
            <div className={`w-7 h-7 rounded-md flex items-center justify-center ${!darkMode ? 'bg-gray-700 group-hover:bg-orange-500' : 'bg-purple-600 group-hover:bg-purple-500'}  transition-colors`}>
                {icon}
            </div>
            <div className="text-left">
                <div className={`text-[0.65rem] ${!darkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-purple-400 group-hover:text-purple-200'}  `}>{subtitle}</div>
                <div className={`font-semibold ${!darkMode ? 'group-hover:text-orange-300' : 'group-hover:text-purple-300'} text-xs`}>{title}</div>
            </div>
        </a>
    )



}



export default GetApp;