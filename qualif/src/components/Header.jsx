import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../others/ThemeContext";

function Header() {

    const location = useLocation();
    
    const ThemeCtx = useTheme();

    return (
        <div>
            {location.pathname === "/"
            ? <Link to="/favorite" id="btnFavorite">Favorites</Link>
        : <Link to="/" id="btnBack">Back to Home</Link>}
            <div id="title">
                <button onClick={()=>{
                    // console.log("tes:", ThemeCtx)
                    ThemeCtx.changeTheme()
                    }}>
                    <img src="https://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG12.png" alt="" height={40}/>
                </button> 
                <p>Pokemon List</p>
            </div>
        </div>
    );
}

export default Header;