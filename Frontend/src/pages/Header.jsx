// Header.jsx
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Monitor from '../assets/image/monitor.png';

const Header = ({ breadcrumb }) => {
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        updateDate();
    }, []);

    const updateDate = () => {
        const options = { weekday: "long", day: "2-digit", month: "long" };
        let dateStr = new Date().toLocaleDateString("pt-BR", options);
        dateStr = dateStr.replace("-feira", "");
        dateStr = dateStr.replace(/(^\w{1})|(\s\w{1})/g, (match) =>
            match.toUpperCase()
        );
        dateStr = dateStr.replace(" De ", " de ");
        setCurrentDate(dateStr);
    };

    return (
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center lg:flex-row flex-col gap-4">
            {/* Links de navegação */}
            <div className="flex flex-col items-center gap-4 w-full lg:flex-row">
                <div className="flex items-center space-x-2">
                    <a href="#" className="text-gray-500">
                        Home
                    </a>
                    <span className="text-gray-400">&gt;</span>
                    <span
                        id="breadcrumb-main"
                        className="text-gray-500 font-medium w-[120px] overflow-hidden text-ellipsis whitespace-nowrap text-left inline-block"
                    >
                        {breadcrumb}
                    </span>
                </div>
                {/* Título "Monitorando" */}
                <div className="text-sm flex flex-col items-center space-x-2 py-2 rounded-lg md:flex-row">
                    <span>
                        <img
                            src={Monitor}
                            alt="Monitor Icon"
                            className="space-x-2 w-[23px]"
                        />
                    </span>
                    <span className="mx-4 text-gray-500">Monitorando:</span>
                    <span className="mx-4 text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">
                        27 eventos encontrados
                    </span>
                </div>
            </div>

            {/* Barra de busca e data */}
            <div className="flex flex-col items-center justify-end gap-4 w-full lg:flex-row lg:gap-11 relative">
                <div className="relative w-full lg:w-[148px]">
                    <input
                        type="text"
                        placeholder="Busca"
                        className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10b981] bg-gray-100"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                        <i className="fas fa-search text-gray-400"></i>
                    </div>
                </div>
                <span
                    id="current-date"
                    className="text-gray-500 font-medium w-full text-left lg:text-center lg:w-auto"
                >
                    {currentDate}
                </span>
            </div>
        </header>
    );
};
Header.propTypes = {
    breadcrumb: PropTypes.string.isRequired,
};

export default Header;
