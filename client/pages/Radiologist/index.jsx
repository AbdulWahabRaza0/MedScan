import React, { useState, useEffect, useContext } from "react";
import { NavContext } from "../_app";
import { Container, Row, Col, Wrapper } from "../../Components/Layout";
import Footer from "../../Components/Footer";
import NavbarComp from "../../Components/Navbar";
import { Carousel } from "react-responsive-carousel";
import { BtnProfile } from "../../Components/Buttons";
import CardComp from "../../Components/Card";
import Loading from "../../Components/Loading";
import styles from "styled-components";
import { useRouter } from "next/router";
const CarouselStyle = styles.span` 

`;
const ImageStyle = {
  width: "100%",
  border: "1px solid black",
};
const CeroselData=[
  "assets/banner3.jpg",
  "assets/banner2.jpg",
  "assets/banner1.jpg"
]
const Index = () => {
  const [mount, setMount] = useState(false);
  const [data,setData]=useState(null);
  const { NavState, NavDispatch } = useContext(NavContext);
  useEffect(() => {
    async function verifyRadiologist() {
      // authRadiologist();
      const login = localStorage.getItem("login");
      if (!login) {
        setMount(false);
        Router.push("/Login");
      } else {
        const info=await JSON.parse(login);
        console.log("This is data ",info);
        setData(info);
        setMount(true);
        NavDispatch({ type: "Nav", payload: "radiologist" });
      
      }
    }
    verifyRadiologist();
  }, []);
  return mount ? (
    <>
      <NavbarComp name={data.name}/>
      <Container style={{ marginTop: "20vh" }}>
        <Row className="pb-5">
          <Col sm={6} md={6}>
            <CarouselStyle className="text-center">
              <Carousel
                dynamicHeight={false}
                autoplay={true}
                infiniteLoop={true}
                showStatus={false}
                showArrows={false}
                showThumbs={false}
              >
                {
                CeroselData.map((val,index)=>{
                  return( 
                    <>
                    <div key={index}>
                  <img
                    style={{ borderRadius: "25px" }}
                    src={val}
                  />
                </div>
                    </>
                  )
                })
              }
              </Carousel>
            </CarouselStyle>
          </Col>
          <Col sm={6} md={6} className="mt-4">
            <h1>Hello, {data.name}</h1>
            <p style={{ color: "gray" }}>Nice to Meet you!</p>
            <BtnProfile>Docs</BtnProfile>
          </Col>
        </Row>
        <hr className="mt-1" />
        <Wrapper className="mt-4 mb-5">
          <h2 className="text-center text-bold">Services</h2>
          <Wrapper className="d-flex flex-row mt-5">
            <CardComp mode={"radiologist"}/>
          </Wrapper>
        </Wrapper>
      </Container>
      <Footer />
    </>
  ) : (
    <>
      <Loading />
    </>
  );
};

export default Index;
