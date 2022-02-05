/* eslint-disable */
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { useEffect, useState, Component } from "react";
import "./Main.css";
import UserVideoComponent from "./UserVideoComponent";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import {
  Button,
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Carousel,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import Data from "./data.js";
import MainCarousel from "./MainCarousel";
import MainAccordion from "./MainAccordion.js";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";

function Main({ onIsLogin }) {
  // const [isLogin, setIsLogin] = useState(false);
  // if (isLogin) {
  //   onIsLogin(isLogin);
  // }
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      // setIsLogin(true);
      onIsLogin(true);
    }
  }, []);

  AOS.init({
    duration: 1000,
  });
  const [Notes, NoteChange] = useState(Data);

  return (
    <div>
      <Container>
        <Row>
          <div data-aos="fade-up">
            {" "}
            <MainCarousel></MainCarousel>
          </div>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={10}>
            <div data-aos="zoom-in">
              <MainAccordion></MainAccordion>
            </div>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col xs={10}>
            <div data-aos="zoom-in-down">
              <h1>밖에서 술 드시기 힘드시죠?</h1>
              <p>
                이런 공간이 있다면 어떨까요... 온라인 술자리도 오프라인 술자리
                처럼 느낄 수 있는 공간. 소중한 단짝 친구들과 바로 옆에 있는 듯한
                느낌을 주는 우리만의 공간. 더 쉽게, 매일 어울리고 즐겁게 술 마실
                수 있는 그런 공간 말이에요.
              </p>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Main;
