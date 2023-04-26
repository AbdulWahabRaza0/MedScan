import React, { useState, useEffect, useContext } from "react";
import { useRouter,useLocation } from "next/router";
import NavbarComp from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { NavContext } from "../_app";
import { Carousel } from "react-responsive-carousel";
import { Container, Row, Col, Wrapper } from "../../Components/Layout";
import { BtnProfile } from "../../Components/Buttons";
import { Spacer } from "../../Components/Spacer";
import { P } from "../../Components/Typography";
import Button from "@mui/material/Button";
import CardComp from "../../Components/Card";
import Loading from "../../Components/Loading";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "styled-components";
const CarouselStyle = styles.span` 

`;
const CeroselData=[
    "assets/banner3.jpg",
    "assets/banner2.jpg",
    "assets/banner1.jpg"
]
const ImageStyle = {
  width: "100%",
  border: "1px solid black",
};
const Index = () => {
  const Router = useRouter();
  const [mount, setMount] = useState(false);
  const [data,setData]=useState(null);
  const [showImage, setShowImage] = useState(null);
  const [report, setReport] = useState("Hello...");
  const [gotReport,setGotReport]=useState(false);
  const [loading, setLoading] = useState(false);
  // const [userData, setUserData] = useState({
  //   name: "",
  //   email: "",
  //   radiologistName: "",
  // });
  const [userData, setUserData] = useState([]);
  const { NavState, NavDispatch } = useContext(NavContext);
  const authUser = async () => {
    const res = await fetch("/authUser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      
      credentials: "include",
    });
    const data = await res.json();
    if (data.message === "done") {
   
    } else {
     console.log("Data not found");
    }
  };
  useEffect(() => {
    async function verifyUser() {
    // authUser();
    const login = localStorage.getItem("login");
    if (!login) {
      setMount(false);
      Router.push("/Login");
    } else {
      const info=await JSON.parse(login);
    setData(info);
      setMount(true);
      NavDispatch({ type: "Nav", payload: "user" });
    
    }
  }
  verifyUser();
  }, []);
  const getPatientReport = async (email) => {
    try {
      const res = await fetch("/getPatientReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
        withCredentials: true,
      });
      const data = await res.json();
      
      if (data.message === "done") {
        const userInfo=data.data;
        if (userInfo) {
          // console.log("This is data ",userInfo );
          // console.log("Now Process This data...");
          // console.log("Length of data is ",userInfo.length);
          for(let i=0;i<userInfo.length;i++){
            var arrayBufferView = new Uint8Array(
              userInfo[i].reports.filedata.data.data
          );
          const imageBlob = new Blob([arrayBufferView], {
            type: "image/jpeg",
          });
          setUserData((val)=>
            [...val,{
                radiologistEmail:userInfo[i].radiologistEmail,
                radiologistName:userInfo[i].radiologistName,
                image:imageBlob,
                patientEmail:userInfo[i].reports.patientEmail,
                patientName:userInfo[i].reports.patientName,
                report:userInfo[i].reports.report,
              }
            ]
          )
            
          }
          console.log("User Data is ",userData);
          setGotReport(true);
          // var arrayBufferView = new Uint8Array(
          //   data.data.patientReport.filedata.data.data
          // );
          // const imageBlob = new Blob([arrayBufferView], {
          //   type: "image/jpeg",
          // });
          // setShowImage(imageBlob);
          // setReport(data.data.patientReport.report);
          // setUserData((...val) => ({
          //   name: data.data.patientData.name,
          //   email: data.data.patientData.email,
          //   radiologistName: data.data.radiologistData.name,
          // }));
          // setGotReport(true);
        } else {
          alert("Data not found");
        }
      } else {
        setGotReport(false);
        // alert("Data not found");
        // Router.push("/User/Logout");
      }
    } catch (e) {
      alert("Error!!!");
    }
  };
  useEffect(() => {
      if (data?.email) {
        getPatientReport(data.email);
      }
  }, [data]);
  useEffect(()=>{
console.log("This is user data ",userData.length);
  },[userData])
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
            <CardComp  width="100%" height="100%" heading="Patient">
            <Wrapper className="mt-4">
              <Spacer height="10vh" />
              {
                    gotReport?<>
                    {
                      Array.isArray(userData) &&userData.map((val,index)=>{
                        return(
                          <>
                          <P color="black">Hello World</P>
                          </>
                        )
                      })
                    }
                    {/* <Row>
                <Col md={4}>
                  <Spacer height="25px" />
                  <P className="mb-5" size="24px" color="black" weight="600">
                    Details:
                  </P>
                
                  <Wrapper width="90%">
                    <Wrapper className="d-flex flex-row align-items-center justify-content-between">
                      <Wrapper className="d-flex flex-column">
                        <P weight="500">Patient Name is:</P>
                        <P weight="500">Patient Email is:</P>
                        <P weight="500">Radiologist Name is:</P>
                      </Wrapper>
                      <Wrapper className="d-flex flex-column">
                        <P>{userData.name}</P>
                        <P>{userData.email}</P>
                        <P>{userData.radiologistName}</P>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>

                  <Button
                    className="mt-3"
                    variant="contained"
                    sx={{ background: "#183e8f" }}
                    onClick={() => {
                      console.log("This is download");
                    }}
                  >
                    Download
                  </Button>
                </Col>
                <Col md={4} className="mt-5">
                  <Wrapper>
                    {showImage && (
                      <img
                        alt="not found"
                        width={"70%"}
                        style={{ border: "1px solid black" }}
                        src={URL.createObjectURL(showImage)}
                      />
                    )}
                  </Wrapper>
                </Col>
                <Col md={4} className="mt-5">
                  <Wrapper
                    className="p-3"
                    width="70%"
                    height="25vh"
                    bg="black"
                    border="1px solid gray"
                    color="white"
                    borderRadius="15px"
                  >
                    <P className="mb-0" size="12px">
                      {!loading ? report : "Loading..."}
                    </P>
                  </Wrapper>
                </Col>
              </Row> */}
                    </>:<>
                      <Wrapper className="d-flex flex-row align-items-center justify-content-center" height="70vh">
                        <P color="gray">Data Not Found</P>
                      </Wrapper>
                    </>
                  }
             
            </Wrapper>
            </CardComp>
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
