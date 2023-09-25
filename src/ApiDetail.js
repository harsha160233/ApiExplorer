
import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";

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
  const { apiId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const infoDataString = queryParams.get("infoData");
  const apiData = infoDataString ? JSON.parse(infoDataString) : null;
  console.log(apiData);
  const navigate = useNavigate();

  const onOpenAPiExplorer = () => {
    navigate("/");
  };

  return (
    <Container>
      {apiData ? (
        <div className="textwhite">
          <Inlines>
            {apiData["x-logo"].url && (
              <Img src={apiData["x-logo"].url} alt="logo" className="logo" />
            )}
            <p>API Name: {apiData.title}</p>
          </Inlines>
          <Para>Description:</Para>
          {apiData.description}
          <Para>Swagger:</Para>
          {apiData.swaggerUrl}
          {apiData.contact && (
            <div>
              <Para>Contact:</Para>
              {apiData.contact.email && <p>Email: {apiData.contact.email}</p>}
              {apiData.contact.name && <p>Name: {apiData.contact.name}</p>}
              {apiData.contact.url && <p>Url: {apiData.contact.url}</p>}
            </div>
          )}
        </div>
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
