import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

const ScrollTop = () => {
  const [bottomPosition, setBottomPosition] = useState(800); // Posição inicial
  const [isActive, setIsActive] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsActive(true);
      setBottomPosition(18); // Define a posição de bottom quando ativo
    } else {
      setIsActive(false);
      setBottomPosition(800); // Retorna à posição inicial quando não ativo
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={scrollToTop}
      className={`scroll-top-button ${isActive ? "active" : ""}`}
      style={{ bottom: `${bottomPosition}px` }} // Valor dinâmico para bottom
    >
       <FontAwesomeIcon icon={faChevronUp} />
    </div>
  );
};

export default ScrollTop;
