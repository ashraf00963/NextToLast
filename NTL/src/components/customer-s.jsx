import { useState } from 'react';
import './customer-s.css';

function CustomerSupport() {
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [messageSent, setMessageSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && description) {
            setMessageSent(true);
        }
    }

    return (
        <div className='customer-support'>
            {messageSent ? (
                <div className='message-sent'>
                    <p>Your message has been sent to our customer services team. We will be in touch soon on {email}.</p>
                </div>
            ) : (
                <form className='support-form' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='email'>Email Address:</label>
                        <input
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Description:</label>
                        <textarea
                            id='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type='submit' disabled={!email || !description}>Submit</button>
                </form>
            )}
        </div>
    );
}

export default CustomerSupport;
