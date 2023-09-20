import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding-left: 5%;
  padding-right: 5%;
`;

const Para = styled.p`
  margin-top: 3%;
  font-size: 20px;
`;

const Inlines = styled.div`
  display: flex;
  margin-top: 20px;
  color: white;
  align-items: center;
  justify-content: center;
  img,
  p {
    margin: 0;
    padding: 5px;
    font-size: 22px;
  }
`;

const Img = styled.img`
  height: 80px;
  width: 80px;
`;

const Button = styled.button`
  color: #ffffff;
  font-size: 1em;
  margin: 1em;
  padding: 0.55em 1em;
  border: 2px solid #00a1d4;
  border-radius: 6px;
  background-color: #00a1d4;
  margin: auto;
  display: block;
`;

const BtnContainer = styled.div`
  margin-top: 8%;
`;

const ApiDetail = () => {
  const [apiData, setApiData] = useState(null);
  const navigate = useNavigate();

  const onOpenAPiExplorer = () => {
    navigate("/");
  };

  useEffect(() => {
    const currentURL = window.location.href;
    const urlParts = currentURL.split("/");
    const domain = urlParts[urlParts.length - 1];
    const apiUrl = `https://api.apis.guru/v2/${domain}.json`;

    // Replace Fetch with Axios GET request
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        const infoData = [];

        for (const key in data.apis) {
          if (data.apis.hasOwnProperty(key)) {
            const api = data.apis[key];
            const swaggerUrl = api.swaggerUrl;
            const info = api.info;
            if (info) {
              infoData.push({
                title: info.title,
                description: info.description,
                version: info.version,
                logo: info["x-logo"] && info["x-logo"].url,
                contact: info.contact,
                swaggerUrl: swaggerUrl,
              });
            } else {
              console.log("Info data is missing in the API response.");
            }
          }
        }

        setApiData(infoData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Container>
      {apiData ? (
        apiData.map((info, index) => (
          <div key={index} className="textwhite">
            <Inlines>
              {info.logo && <Img src={info.logo} alt="logo" className="logo" />}
              <p>API Name: {info.title}</p>
            </Inlines>
            <Para>Description:</Para>
            {info.description}
            <Para>Swagger:</Para>
            {info.swaggerUrl}
            {info.contact && (
              <div>
                <Para>Contact:</Para>
                {info.contact.email && <p>Email: {info.contact.email}</p>}
                {info.contact.name && <p>Name: {info.contact.name}</p>}
                {info.contact.url && <p>Url: {info.contact.url}</p>}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      <BtnContainer>
        <Button onClick={onOpenAPiExplorer}>Explore more APIs</Button>
      </BtnContainer>
    </Container>
  );
};

export default ApiDetail;
