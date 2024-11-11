import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "D:/MUSTAFA'S FOLDER/SEM 7 2024/LY PROJECT 2024/PredictEdge/graphy-pass/src/contexts/authcontexts/index"
import { doSignOut } from "D:/MUSTAFA'S FOLDER/SEM 7 2024/LY PROJECT 2024/PredictEdge/graphy-pass/src/firebase/auth"
import './Header.css';


const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    return (
        <nav className='nobie'>
            {
                userLoggedIn
                    ?
                    <>
                        <button style={{backgroundColor: 'khaki' , padding: '7px' , borderRadius: '50px' , width: '150px' , fontWeight: 'bold'}} onClick={() => { doSignOut().then(() => { navigate('/login') }) }}>Logout</button>
                    </>
                    :
                    <>
                        <Link className='text-sm text-blue-600 underline' to={'/'}>Home</Link>
                        {/* <Link className='text-sm text-blue-600 underline' to={'/'}>Contact</Link> */}
                    </>
            }

        </nav>
    )
}

export default Header