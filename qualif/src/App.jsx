import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Detail from "./pages/Detail";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import './App.css';
import { ThemeProvider } from "./others/ThemeContext";

export const GlobalContext = createContext({});

function App(){
  const [image, setImage] = useState("");

  const client = new ApolloClient({
    uri: 'https://graphql-pokeapi.graphcdn.app',
    cache: new InMemoryCache()
  });

  return (
      <ApolloProvider client={client}>
        <GlobalContext.Provider value={{image: [image, setImage]}}>
          <ThemeProvider>
          <BrowserRouter>
              <Header/>
            <Routes>
              <Route exact path="/" element={
                <div>
                  {/* <Header/> */}
                  <Home/>
                </div>
              }/>
              <Route exact path="/favorite" element={
                <div>
                  {/* <Header/> */}
                  <Favorite/>
                </div>
              }/>
              <Route exact path="/detail/:name" element={
                <div>
                  {/* <Header/> */}
                  <Detail/>
                </div>
              }/>
            </Routes>
          </BrowserRouter>
          </ThemeProvider>
        </GlobalContext.Provider>
      </ApolloProvider>
  );

}

export default App;