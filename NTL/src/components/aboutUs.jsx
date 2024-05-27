import { useEffect } from 'react';
import { NTLhead, NTLhead2, NTLhead3, NTLwarehouse1, NTLwarehouse3, NTLwarehouse, officeNTL } from '../assets';
import './aboutUs.css';

function AboutUs() {
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom >= 0) {
                    section.classList.add('visible');
                } else {
                    section.classList.remove('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="about-header">
            <div className="section-image-container">
                <img src={NTLhead} alt="NTL Headquarters" />
                <div className="overlay">
                    <h1>NTL Headquarters</h1>
                    <p>Our headquarters is the hub of innovation and strategy. Here, we manage our global operations, ensuring that our clients receive the highest quality of service.</p>
                </div>
            </div>
            <div className="sections">
                <div id="headquarters-2" className="section">
                    <img src={NTLhead2} alt="NTL Headquarters" className="section-image" />
                    <div className="section-text">
                        <h2>NTL Headquarters</h2>
                        <p>With a dedicated team of professionals, our headquarters is where key decisions are made, driving the company's vision forward.</p>
                    </div>
                </div>
                <div id="headquarters-3" className="section">
                    <img src={NTLhead3} alt="NTL Headquarters" className="section-image" />
                    <div className="section-text">
                        <h2>NTL Headquarters</h2>
                        <p>Our headquarters is equipped with modern facilities to support our operations and enhance productivity.</p>
                    </div>
                </div>
                <div id="warehouse-1" className="section">
                    <img src={NTLwarehouse} alt="NTL Warehouse" className="section-image" />
                    <div className="section-text">
                        <h2>NTL Warehouse</h2>
                        <p>The NTL warehouse is a marvel of efficiency and technology, ensuring that our products are stored and shipped with the utmost care and precision.</p>
                    </div>
                </div>
                <div id="warehouse-2" className="section">
                    <img src={NTLwarehouse1} alt="NTL Warehouse" className="section-image" />
                    <div className="section-text">
                        <h2>NTL Warehouse</h2>
                        <p>Our warehouse operations are streamlined to handle large volumes, ensuring timely and accurate delivery to our clients.</p>
                    </div>
                </div>
                <div id="warehouse-3" className="section">
                    <img src={NTLwarehouse3} alt="NTL Warehouse" className="section-image" />
                    <div className="section-text">
                        <h2>NTL Warehouse</h2>
                        <p>Equipped with the latest technology, our warehouse supports efficient inventory management and logistics.</p>
                    </div>
                </div>
                <div id="office" className="section">
                    <img src={officeNTL} alt="NTL Office" className="section-image" />
                    <div className="section-text">
                        <h2>NTL Office</h2>
                        <p>Our state-of-the-art office is designed to foster collaboration and creativity. We believe in a work environment that supports our team's professional growth.</p>
                        <p>Equipped with modern amenities and technology, our office space is a testament to our commitment to providing the best for our employees.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
