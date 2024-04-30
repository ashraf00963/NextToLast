import './App.css';
import { BlueCollection, Footer, GreenCollection, Header, RedCollection } from './components';


function HomePage () {
    return (
        <>
            <Header />
            <RedCollection />
            <GreenCollection />
            <BlueCollection />
            <Footer />
        </>
    )
}

export default HomePage;