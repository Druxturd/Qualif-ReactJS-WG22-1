import { useContext } from "react"
import { Link } from "react-router-dom"
import { GlobalContext } from "../App"
import { ThemeProvider, useTheme } from "../others/ThemeContext";

export default function Card({src, name, children, id, ...Attr}) {
    const imageDetailContext = useContext(GlobalContext);

    const ThemeCtx = useTheme();

    return (
        
        <div id="card">
            <div id="cardImage" style={{textDecoration: "none"}}>
                <img src={src} alt="" height="100"/>
            </div>
            {children}
            <div style={{
                display: "flex",
                justifyContent: "center",
                width: "100%"
            }}>
                <Link to={`/detail/${name}`}
                onClick={() => {
                    imageDetailContext.image[1](src)
                }}
                style={{
                    textAlign: "center",
                    textDecoration: "none",
                    color: "blue",
                    fontFamily: "cursive"
                }}
                >Details</Link>
            </div>
        </div>
    );
}