const Navbar = () => {
    return (
        <nav className="bg-white fixed top-0 w-full z-50">
            <div className="flex justify-between items-center py-3 mx-2 lg:mx-5 xl:mx-10">
                <div>
                    <img src="/logo.svg" alt="site-logo" className="h-8" />
                </div>
                <div>
                    <input
                        type="search"
                        name=""
                        id=""
                        placeholder="Search your favorite game..."
                        className="bg-gray-200 hidden md:block py-2 px-2 md:w-[400px] lg:w-[600px]"
                    />
                </div>
                <div>
                    <button>BG Switch</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
