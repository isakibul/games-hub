import React, { useContext, useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import MyContext from "../context/MyContext";

const Navbar = ({ onToggleDarkMode, isDarkMode }) => {

    const { search, setSearch } = useContext(MyContext);

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearch(searchTerm);
    };
    return (
        <nav className={`fixed top-0 w-full z-50 ${isDarkMode ? 'bg-black text-white' : 'bg-white'}`}>
            <div className="flex justify-between items-center py-3 mx-2 lg:mx-5 xl:mx-10">
                <div>
                    <img src="/logo.svg" alt="site-logo" className="h-8" />
                </div>
                <div>
                    <input
                        type="search"
                        name=""
                        id=""
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search your favorite game..."
                        className="bg-gray-200 hidden md:block py-2 px-2 md:w-[400px] lg:w-[600px] text-black"
                    />
                </div>
                <div>
                    <button
                        className="text-3xl"
                        onClick={onToggleDarkMode}
                    >
                        {isDarkMode ? <CiLight /> : <MdDarkMode />}
                    </button>
                </div>
            </div>
        </nav>
    );
};


export default Navbar;
