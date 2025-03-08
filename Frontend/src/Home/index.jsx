import Hero from "../components/Hero";
import Features from "../components/Features";
import Stats from "../components/Stats";
import NavBar from "../components/Navbar";
import ScrollTopButton from "../components/ScrollTopButton";
import Footer from "../components/Footer";
import { useEffect } from "react";
export default function Home() {
	useEffect(() => {
		const grid = document.querySelector(".blockchain-grid");
		let blocks = "";
		for (let i = 0; i < 100; i++) {
		  const x = Math.random() * 100;
		  const y = Math.random() * 100;
		  const size = Math.random() * 2 + 1;
		  const duration = Math.random() * 3 + 2;
		  const delay = Math.random() * 2;
		  blocks += `
	      <div style="
		position: absolute;
		left: ${x}%;
		top: ${y}%;
		width: ${size}px;
		height: ${size}px;
		background: ${Math.random() > 0.5 ? "var(--primary)" : "var(--secondary)"};
		opacity: 0.3;
		border-radius: 50%;
		animation: float ${duration}s ${delay}s infinite alternate;
	      "></div>
	    `;
		}
		grid.innerHTML = blocks;
	      }, []);
  return (
	<div>
		  <NavBar />
		   <Hero />
          <Features />
          <Stats />
	  <ScrollTopButton />
	  <Footer />
	</div>
  );
}
