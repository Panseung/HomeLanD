import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { useHistory,useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Button,Navbar,Container,Nav,NavDropdown,Carousel,Row,Col } from 'react-bootstrap';
import {CSSTransition} from "react-transition-group"

function Main(){
  return (
    <div>
<Container>
  <Row>
    <Col></Col>
    <Col xs={6}>
      
      <h1>밖에서 술 드시기 힘드시죠?</h1>
      <p>이런 공간이 있다면 어떨까요...
...온라인 술자리도 오프라인 술자리 처럼 느낄 수 있는 공간. 소중한 단짝 친구들과 바로 옆에 있는 듯한 느낌을 주는 우리만의 공간. 더 쉽게, 매일 어울리고 즐겁게 술 마실 수 있는 그런 공간 말이에요.</p>
    </Col>
    <Col></Col>
  </Row>
  <Row>
    <Col></Col>
    <Col xs={6}>

      <h1>방개설하기 // 코드입력란</h1>
      <h1>최근 업데이트 내역 삽입</h1>
      <h2>서비스에 대해 설명하는창...</h2>

    </Col>
    <Col></Col>
  </Row>

</Container>
    </div>
  )
}




export default Main