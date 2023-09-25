import styled from "styled-components";
import { Fragment } from "react";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import Accordion from "./Accordion";
const Button = styled.button`
  color: #ffffff;
  font-size: 1em;
  margin: 1em;
  padding: 0.55em 1em;
  border: 2px solid #00a1d4;
  border-radius: 3px;
  background-color: #00a1d4;
  position: absolute;
  top: 50%;
`;
const CloseButton = styled(Button)`
  background-color: #42607b;
  border-color: tomato;
  position: absolute;
  top: 0%;
  right: 0%;
`;
const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
function Home() {
  const [movies, setMovies] = useState([]);

  function openSideBarHandler() {
    axios
      .get("https://api.apis.guru/v2/providers.json")
      .then((response) => {
        const data = response.data;
        setMovies(data);

        document.getElementById("mySidenav").style.width = "320px";
        const myDivElement = document.getElementById("mydiv");
        if (myDivElement) {
          myDivElement.className = "backdrop";
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const closeSideBarHandler = () => {
    document.getElementById("mySidenav").style.width = "0";
    let backdropc = document.getElementById("mydiv");
    backdropc.classList.remove("backdrop");
  };

  return (
    <Fragment>
      <div id="mydiv">
        <div id="mySidenav" className="sidenav">
          <CloseButton type="submit" onClick={closeSideBarHandler}>
            X
          </CloseButton>
          <Accordion items={movies} />
        </div>
        <FlexDiv>
          <Button type="submit" onClick={openSideBarHandler}>
            Explore web APIs
          </Button>
        </FlexDiv>
      </div>
    </Fragment>
  );
}

export default Home;
