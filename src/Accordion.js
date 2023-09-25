import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const Button = styled.button`
  color: white;
  font-size: 0.9em;
  margin: 0.6em;
  border: none;
  padding: 0.2em 1em;
  background-color: transparent;
`;
const Img = styled.img`
  height: 25px;
  width: 25px;
  padding-right: 10px;
`;
const Para = styled.p`
  color: white;
  text-align: center;
`;

function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [infoData, setInfoData] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);

    const params = items.data[index];
    const apiUrl = `https://api.apis.guru/v2/${params}.json`;

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;

        for (const key in data.apis) {
          if (data.apis.hasOwnProperty(key)) {
            const api = data.apis[key];
            const swaggerUrl = api.swaggerUrl;
            console.log(swaggerUrl,"swaggerUrl on accordian");
            const info = api.info;
            console.log(info,"info");
            info.swaggerUrl = swaggerUrl;
            console.log(info,"info");
            if (info) {
              setInfoData(info);
            } else {
              console.log("Info data is missing in the API response.");
            }
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div>
      <Para>Select Provider</Para>
      <div>
        {items.data && items.data.length > 0 ? (
          items.data.map((item, index) => (
            <div
              key={index}
              className={index === activeIndex ? "smallcontain" : ""}
            >
              <div>
                <Button
                  className="toggleButton"
                  onClick={() => handleClick(index)}
                >
                  {item}
                  <i
                    id="iconarrow"
                    className={`fa ${
                      index === activeIndex ? "fa-angle-up" : "fa-angle-down"
                    }`}
                  ></i>
                </Button>

                {index === activeIndex && (
                  <div>
                    <Link
                      to={{
                        pathname: `/apilist/${item}`,
                        search: `?infoData=${JSON.stringify(infoData)}`,
                      }}
                    >
                      {infoData && (
                        <Img src={infoData["x-logo"].url} alt="logo" />
                      )}
                      {infoData ? infoData.title : "Loading..."}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No items to display.</p>
        )}
      </div>
    </div>
  );
}

export default Accordion;
