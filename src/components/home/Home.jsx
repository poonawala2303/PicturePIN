import { useEffect, useRef, useState } from 'react';
import Header from "../header/Header";
import { useAuth } from "D:/MUSTAFA'S FOLDER/SEM 7 2024/LY PROJECT 2024/PredictEdge/graphy-pass/src/contexts/authcontexts/index";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';
import DefImg from "D:/MUSTAFA'S FOLDER/SEM 7 2024/LY PROJECT 2024/PredictEdge/graphy-pass/src/assets/signup.png"

const Home = () => {
    const { currentUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const UNSPLASH_ACCESS_KEY = 'FNxL47px-8y7SqgCmvjzVcz-73aUWYoleL3L9xg9h7s'; // Replace with your Unsplash Access Key

    useEffect(() => {
        if (location.state?.successMessage) {
            toast.success('Login Successful!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
                });
            
            // Clear the success message from the location state
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    const [images, setImages] = useState([]); // Store multiple images
    let inputRef = useRef(null);

    const imageGenerator = async () => {
        const query = inputRef.current.value;

        if (query === "") {
            return 0;
        }

        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}&per_page=12`,
            {
                headers: {
                    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
                },
            }
        );

        const data = await response.json();
        setImages(data.results.map(image => image.urls.small)); // Store the URLs of the images
    };

    return (
        <div className='ai-image-generator'>
            <Header />
            <ToastContainer />
            <div className="header">AI Image <span className='aiwala'>Generator</span> </div>
            <div className="img-loading">
                <div className="images-grid">
                    {images.length > 0 ? (
                        images.map((url, index) => (
                            <div className="image" key={index}>
                                <img style={{ width: '90%' }} src={url} alt={`Generated ${index}`} />
                            </div>
                        ))
                    ) : (
                        <div className="image">
                            <img style={{ width: '90%' }} src={DefImg} alt="Default" />
                        </div>
                    )}
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className='search-input' placeholder='What do you want to generate' />
                <div className="generate-btn" onClick={() => { imageGenerator() }}>Generate</div>
            </div>
        </div>
    );
};

export default Home;
