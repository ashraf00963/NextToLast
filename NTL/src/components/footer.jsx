import './footer.css';

function Footer () {
    return (
        <div className='footer red-blue-green-0deg '>
            <div className='footer-section-one'>
                <h2 className='blue-white-font'>Contact Us:</h2>
                <p>123 Time Avenue, Suite 456 <br />Watchtown, Timezone 78901</p>
                <p>Phone: 555-555-5555</p>
                <p>Email: info@ntlstore.com</p>
            </div>
            <div className='footer-section-two'>
                <h2 className='blue-white-font'>Connect With Us:</h2>
                <p>Follow us on social media</p>
                <p><a href='#'>Facebook</a> | <a href='#'>instgram</a> | <a href='#'>Twitter</a></p>
            </div>
            <div className='footer-section-three'>
                <h2 className='blue-white-font'>Stay Updated:</h2>
                <p>Subscribe to our newsletter for the latest updates.</p>
                <div className='footer-newsletter'>
                    <input type='text' placeholder='Email' />
                    <button>Sign up</button>
                </div>
            </div>
        </div>
    )
}


export default Footer;