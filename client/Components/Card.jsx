import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Spacer } from "./Spacer";
import MaterialCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "react-bootstrap/Card";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { Row, Col, Wrapper,useMediaQuery } from "./Layout";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { P, H5 } from "./Typography";
import Tooltip from "@mui/material/Tooltip";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const ContactCard = (props) => {
  return (
    <>
      <Col md={4} className="mt-5">
        <props.icon
          className="mt-1 mb-2"
          style={{ color: "gray", fontSize: "30px" }}
        />
        <h4>{props.title}</h4>
        <p>
          <b className="me-2">{props.title}:</b>
          {props.content}
        </p>
      </Col>
    </>
  );
};

const CardComp = (props) => {
  const Router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "background.paper",
    boxShadow: 24,
    height: "100vh",
    overflow: "scroll",
    p: 2,
  };


  
 
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2>Report Generation</h2>
            </div>
            <CloseIcon
              style={{ cursor: "pointer", fontSize: "40px" }}
              onClick={handleClose}
            />
          </div>
          {props.children}
   
        </Box>
      </Modal>
      <MaterialCard
        sx={{ maxWidth: 345 }}
        style={{ boxShadow: "5px 5px 10px gray" }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="/assets/service1.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            X Ray Report
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your Report Status can check from here and if your report is
            available then your can easily access your report and contact to
            your doctor
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              if (props.restrict) Router.push("/Login");
              else handleOpen();
            }}
          >
            <b>Go</b>
          </Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </MaterialCard>
    </>
  );
};
const StepsCard = (props) => {
  const isResponsive = useMediaQuery({
    query: '(max-width: 453px)'
  })
  return (
    <>
      <Card
        className="mt-4"
        style={{
          width: "100%",
          height: "150px",
          overflow: "auto",
          boxShadow: "5px 5px 10px gray",
        }}
      >
      <div className={props.mode === "admin_report_gen"?"ps-2 d-flex flex-row align-items-center":""}>
      {
        props.mode === "admin_report_gen"&&!isResponsive?<img className="img-fluid" src="/assets/profile.jpg" alt="Profile" width="120px" height="120px"/>:null
      }
        <Card.Body>
          <Card.Title style={{ color: "#183e8f", fontWeight: "600" }}>
            {props.title}
          </Card.Title>
          <Card.Text style={{ color: "gray" }}>{props.description}</Card.Text>
          {props.mode === "admin_report_gen" ? (
            <>
              <Spacer height="20px" />
              <Wrapper className="d-flex flex-row">
                <Tooltip title="Patients">
                  <VaccinesIcon
                    style={{ color: "#183e8f", cursor: "pointer" }}
                  />
                </Tooltip>
                <Tooltip className="ms-2" title="Delete Radiologist">
                  <DeleteOutlineIcon
                  className="pt-1"
                    style={{  color: "#183e8f", cursor: "pointer" }}
                  />
                </Tooltip>
              </Wrapper>
            </>
          ) : null}
        </Card.Body>
        </div>
      </Card>
    </>
  );
};
export { StepsCard, ContactCard };
export default CardComp;
