import { useState, useEffect, useRef } from "react";
import "./GamePanel.css";
import CountDown from "./CountDown";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Container, Row, Col } from "react-bootstrap";
import { IoReturnUpBack } from "react-icons/io5";
const MySwal = withReactContent(Swal);

function GamePanel(props) {
  let [gameCategory, selectCategory] = useState(props.gameCategory);
  let [display, Setdisplay] = useState(props.gamePanel);
  let [sessionData, SetsessionData] = useState(props.sessionData);
  let [mySessionId, SetmySessionId] = useState(props.mySessionId);
  let [myUserName, SetmyUserName] = useState(props.myUserName);
  let [session, Setsession] = useState(props.session);
  let [publisher, Setpublisher] = useState(props.publisher);
  let [subscribers, Setsubscribers] = useState(props.subscribers);
  let [connectionId, SetconnectionId] = useState(props.connectionId);
  let [connections, Setconnections] = useState(props.connections);
  let [connectionUser, SetconnectionUser] = useState(props.connectionUser);
  let [host, Sethost] = useState(props.host);
  let [isHost, SetisHost] = useState(props.isHost);

  const prevGameCategoryRef = useRef("main");
  const prevGameCategory = prevGameCategoryRef.current;

  useEffect(() => {
    if (props.cnt) {
      selectCategory("countDown");
      prevGameCategoryRef.current = gameCategory;
    } else {
      selectCategory(prevGameCategory);
      prevGameCategoryRef.current = gameCategory;
    }
  }, [props.cnt]);

  useEffect(() => {
    props.gamePanel ? Setdisplay(true) : Setdisplay(false);
  }, [props.gamePanel]);

  useEffect(() => {
    selectCategory(props.gameCategory);
  }, [props.gameCategory]);

  useEffect(() => {
    SetsessionData(props.sessionData);
  }, [props.sessionData]);

  useEffect(() => {
    SetmySessionId(props.mySessionId);
  }, [props.mySessionId]);

  useEffect(() => {
    SetmyUserName(props.myUserName);
  }, [props.myUserName]);

  useEffect(() => {
    Setsession(props.session);
  }, [props.session]);

  useEffect(() => {
    Setpublisher(props.publisher);
  }, [props.publisher]);

  useEffect(() => {
    Setsubscribers(props.subscribers);
  }, [props.subscribers]);

  useEffect(() => {
    SetconnectionId(props.connectionId);
  }, [props.connectionId]);

  useEffect(() => {
    Setconnections(props.connections);
  }, [props.connections]);

  useEffect(() => {
    SetconnectionUser(props.connectionUser);
  }, [props.connectionUser]);

  useEffect(() => {
    Sethost(props.host);
  }, [props.host]);

  useEffect(() => {
    SetisHost(props.isHost);
  }, [props.isHost]);

  //LiarGame Start
  let [liarOrNot, SetLiarOrNot] = useState("");
  let [liar, SetLiar] = useState("");
  let [liarSubject, SetLiarSubject] = useState("");
  let [liarGameState, SetLiarGameState] = useState("main");
  let [userNames, SetUserNames] = useState([]);
  let [liarVote, SetLiarVote] = useState("");
  let [voteResult, SetVoteResult] = useState([]);
  let [isVote, SetIsVote] = useState(false);
  let [defaultUserVote, SetDefaultUserVote] = useState([]);

  const liarVoteHandler = (item) => {
    SetLiarVote(item);
  };
  //LiarGame End

  //UpAndDown Start
  let [gameState, SetGameState] = useState(false);
  let [range, SetRange] = useState(10);
  let [randomNum, SetRandomNum] = useState(5);
  let [upAndDownNum, SetUpAndDownNum] = useState(0);
  let [matchingUpDown, SetMatchingUpDown] = useState(" ");
  let [fromSignalUserName, SetFromSignalUserName] = useState("");

  const onChangeRange = (e) => {
    e.preventDefault();
    SetRange(parseInt(e.target.value));
  };
  const onChangeUpAndDownNum = (e) => {
    e.preventDefault();
    SetUpAndDownNum(parseInt(e.target.value));
  };
  //UpAndDown End

  useEffect(() => {
    receiveSignal();
  }, []);

  useEffect(() => {
    session.on("signal:settingVoteResult", (event) => {
      var voteResultCopy = [...voteResult];
      const voteLiar = event.data;
      voteResultCopy.forEach((val) => {
        if (val.hasOwnProperty(`${voteLiar}`)) val[`${voteLiar}`]++;
      });
      SetVoteResult(voteResultCopy);
    });
  }, [liarVote]);

  return (
    <div className={display ? "panel" : "nondisplay"}>
      <div className="game-header">game panel</div>
      {
        {
          main: (
            <div>
              <div className="title">
                <p>?????? ???????????? ?????????????</p>
              </div>
              <div className="games">
                <button
                  className="title-btn"
                  onClick={() => {
                    if (!isHost) {
                      return;
                    } else {
                      selectCategory("liarGame");
                      props.setGameCategory("liarGame");
                    }
                  }}
                >
                  ????????? ??????
                </button>
                <button
                  className="title-btn"
                  onClick={() => {
                    if (!isHost) {
                      return;
                    } else {
                      selectCategory("upAndDown");
                      props.setGameCategory("upAndDown");
                    }
                  }}
                >
                  UP & DOWN
                </button>
                <button
                  className="title-btn"
                  onClick={() => {
                    if (!isHost) {
                      return;
                    } else {
                      selectCategory("baskinrobbins31");
                      props.setGameCategory("baskinrobbins31");
                    }
                  }}
                >
                  ????????? ????????? 31
                </button>
              </div>
            </div>
          ),
          countDown: (
            <div className="countDown">
              <p>????????? ????????? ??????!</p>
              <CountDown></CountDown>
            </div>
          ),
          liarGame: (
            <div>
              {
                {
                  main: (
                    <div>
                      <div>
                        <div className="back btn-font"
                          onClick={() => {
                            if (!isHost) {
                              resetIsVote();
                              return;
                            } else {
                              selectCategory("main");
                              props.setGameCategory("main");
                              signalSetLiarGameState("main");
                              resetIsVote();
                            }
                          }}
                        >
                          <IoReturnUpBack
                            size={24}
                          />
                          <p>?????? ??????</p>
                        </div>
                      </div>
                      <br></br>
                      <br></br>
                      <h4 className="liar-title">
                        ????????? ??????????????? ??????????????????!
                      </h4>
                      <Container className="liab-box">
                        <Row
                          className="liar-subject-box"
                          style={{ paddingTop: 10 }}
                        >
                          <Col
                            md={{ span: 4 }}
                            onClick={() => {
                              if (!isHost) {
                                return;
                              } else {
                                selectSubjectCategory("Animal");
                                signalSetLiarGameState("discussion");
                              }
                            }}
                          >
                            ??????
                          </Col>
                          <Col
                            md={{ span: 4 }}
                            className="box-blue"
                            onClick={() => {
                              if (!isHost) {
                                return;
                              } else {
                                selectSubjectCategory("Country");
                                signalSetLiarGameState("discussion");
                              }
                            }}
                          >
                            ??????
                          </Col>
                          <Col
                            md={{ span: 4 }}
                            onClick={() => {
                              if (!isHost) {
                                return;
                              } else {
                                selectSubjectCategory("Fruit");
                                signalSetLiarGameState("discussion");
                              }
                            }}
                          >
                            ??????
                          </Col>
                        </Row>
                        <Row className="liar-subject-box">
                          <Col
                            md={{ span: 4 }}
                            onClick={() => {
                              if (!isHost) {
                                return;
                              } else {
                                selectSubjectCategory("Sports");
                                signalSetLiarGameState("discussion");
                              }
                            }}
                          >
                            ?????????
                          </Col>
                          <Col
                            md={{ span: 4 }}
                            onClick={() => {
                              if (!isHost) {
                                return;
                              } else {
                                selectSubjectCategory("Job");
                                signalSetLiarGameState("discussion");
                              }
                            }}
                          >
                            ??????
                          </Col>
                          <Col
                            md={{ span: 4 }}
                            onClick={() => {
                              if (!isHost) {
                                return;
                              } else {
                                selectSubjectCategory("Idol");
                                signalSetLiarGameState("discussion");
                              }
                            }}
                          >
                            ?????????
                          </Col>
                        </Row>
                        <Row className="liar-subject-box">
                          <Col
                            md={{ span: 4 }}
                            onClick={() => {
                              if (!isHost) {
                                return;
                              } else {
                                selectSubjectCategory("Movie");
                                signalSetLiarGameState("discussion");
                              }
                            }}
                          >
                            ??????
                          </Col>
                          <Col
                            md={{ span: 4 }}
                            onClick={() => {
                              if (!isHost) {
                                return;
                              } else {
                                selectSubjectCategory("Actor");
                                signalSetLiarGameState("discussion");
                              }
                            }}
                          >
                            ????????????
                          </Col>
                          <Col
                            md={{ span: 4 }}
                            onClick={() => {
                              if (!isHost) {
                                return;
                              } else {
                                selectSubjectCategory("Place");
                                signalSetLiarGameState("discussion");
                              }
                            }}
                          >
                            ??????
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  ),
                  discussion: (
                    <div>
                      <br></br>
                      <p className="liar-or-not">{liarOrNot}</p>
                      <br></br>
                      <p className="liar-title">
                        ?????? ???????????? ???????????? ??????????????????
                      </p>
                      <div>
                        {userNames.map((item, index) => {
                          return (
                            <div key={index}>
                              <span className="liar-user">
                                {index + 1}. {item}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      {isHost ? (
                        <button  className="game-btn" onClick={() => {
                          if (!isHost) {
                            return;
                          }
                          signalSetLiarGameState("vote");
                        }}>?????? ?????? ??????</button>
                      ) : (
                        <div>
                          <span></span>
                        </div>
                      )}
                    </div>
                  ),
                  vote: (
                    <div>
                      <br></br>
                      <p className="liar-title">
                        ????????? ????????? ????????? ?????????????????? ?????? ?????? ?????? ?????????
                        ??????????????????!
                      </p>
                      {!isVote ? (
                        <div>
                          {userNames.map((item, index) => {
                            return (
                              <div>
                                <button
                                  className="game-btn"
                                  key={index}
                                  value={item}
                                  onClick={() => {
                                    liarVoteHandler(`${item}`);
                                    sendLiarVote(`${item}`);
                                    SetIsVote(true);
                                  }}
                                >
                                  {item}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div>
                          <br></br>
                          <br></br>
                          <br></br>
                          <p className="liar-title">?????? ???????????? ?????????</p>
                          <p className="liar-title">????????? ?????????!!</p>
                          <br></br>
                        </div>
                      )}
                      {isHost ? (
                        <button
                          className="game-btn"
                          onClick={() => {
                            signalSetLiarGameState("voteResultPage");
                            resetIsVote();
                            // sendSignalresetIsVote();
                            sendVoteResult();
                          }}
                        >
                          ?????? ?????? ??????
                        </button>
                      ) : (
                        <div>
                          <span></span>
                        </div>
                      )}
                    </div>
                  ),
                  voteResultPage: (
                    <div>
                      <br></br>
                      <p className="liar-title">?????? ??????!</p>
                      <div>
                        {voteResult.map((item, index) => {
                          return (
                            <div key={index}>
                              <span className="liar-user">
                                {Object.keys(item)} : {Object.values(item)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <button
                        className="game-btn"
                        onClick={() => {
                          if (!isHost) {
                            return;
                          }
                          signalSetLiarGameState("vote");
                          resetDiscussionOrder();
                        }}
                      >
                        ????????? ??????
                      </button>
                      <button
                        className="game-btn"
                        onClick={() => {
                          if (!isHost) {
                            return;
                          }
                          signalSetLiarGameState("whoLiar");
                        }}
                      >
                        ????????? ????????????
                      </button>
                    </div>
                  ),
                  whoLiar: (
                    <div>
                      <br></br>
                      <p className="liar-title">???????????? ?????? {liar} ?????????!</p>
                      <button
                        className="game-btn"
                        onClick={() => {
                          if (!isHost) {
                            return;
                          }
                          signalSetLiarGameState("whatSubject");
                        }}
                      >
                        ????????? ??????
                      </button>
                    </div>
                  ),
                  whatSubject: (
                    <div>
                      <br></br>
                      <p className="liar-title">
                        ???????????? {liarSubject}????????????!
                      </p>
                      <button
                        className="game-btn"
                        onClick={() => {
                          if (!isHost) {
                            return;
                          }
                          signalSetLiarGameState("main");
                        }}
                      >
                        ????????? ?????? ????????????
                      </button>
                    </div>
                  ),
                }[liarGameState]
              }
            </div>
          ),
          upAndDown: (
            <div>
              <div>
                <div className="back btn-font"
                  onClick={() => {
                    if (!isHost) {
                      resetIsVote();
                      return;
                    } else {
                      selectCategory("main");
                      props.setGameCategory("main");
                      signalSetLiarGameState("main");
                      resetIsVote();
                      SetGameState(false);
                      SetFromSignalUserName("");
                    }
                  }}
                >
                  <IoReturnUpBack
                    size={24}
                  />
                  <p>?????? ??????</p>
                </div>
              </div>
              <br></br>
              <br></br>
              <p className="liar-title">UP & DOWN ??????!</p>

              <div className="UpAndDown">
                {!gameState ? (
                  <div>
                    <div className="liar-title">????????? ??????????????????!</div>
                    <div className="liar-title">0?????? ????????? ???????????</div>
                    <div>
                      <input
                        className="UD-input"
                        type="number"
                        min="0"
                        max="100000"
                        onChange={onChangeRange}
                        value={range}
                      />
                    </div>
                    {isHost ? (
                      <div className="liar-title"
                      onClick={() => {
                        if (!isHost) {
                          return;
                        } else {
                          SetGameState(true);
                          sendRange();
                        }
                      }}
                    >
                      ?????? ?????????
                      </div>
                    ) : (
                      <div>
                        <span></span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="liar-title">?????? : 0 ~ {range}</div>
                    <div>
                      <input
                        className="UD-input"
                        type="number"
                        onChange={onChangeUpAndDownNum}
                        value={upAndDownNum}
                      />
                    </div>
                    <div className="UD">{matchingUpDown}</div>
                      <button className="game-btn" onClick={() => { sendUpAndDownNum();}}>
                      ?????? ????????????
                    </button>
                      {isHost ? (
                        <button className="game-btn"
                        onClick={() => {
                          if (!isHost) {
                            return;
                          } else {
                            SetGameState(false);
                            sendRestart();
                            SetFromSignalUserName("");
                          }
                        }}
                      >
                        ?????? ????????????!
                        </button>
                      ) : (
                        <div>
                          <span></span>
                        </div>
                      )}
                      {fromSignalUserName==="" ? (
                        <div>
                          <span></span>
                        </div>
                      ) : (
                        <div className="liar-title">{fromSignalUserName} : {upAndDownNum}</div>
                      )}
                  </div>
                )}
              </div>
            </div>
          ),
          baskinrobbins31: (
            <div>
              <div className="back btn-font"
                onClick={() => {
                  if (!isHost) {
                    resetIsVote();
                    return;
                  } else {
                    selectCategory("main");
                    props.setGameCategory("main");
                    signalSetLiarGameState("main");
                    resetIsVote();
                  }
                }}
              >
                <IoReturnUpBack
                  size={24}
                />
                <p>?????? ??????</p>
              </div>
              <br></br>
              <br></br>
              <p className="b31-title ">????????? ????????? ????????? ?????????</p>
              <p className="b31-title ">????????? 1~3?????? ?????? ?????? ??? ?????????</p>
              <p className="b31-title ">31??? ????????? ????????? ????????????!</p>
              <button
                className="b31-btn"
                onClick={() => {
                  if (!isHost) {
                    return;
                  }
                }}
              >
                ????????????
              </button>
              <div className="bigBox-31">
                <Container className="br31-number-box">
                  <div style={{ height: 5 }}></div>
                  <Row>
                    <Col id="1" md={{ span: 2 }} className="box-31">
                      1
                    </Col>
                    <Col id="2" md={{ span: 2 }} className="box-31">
                      2
                    </Col>
                    <Col id="3" md={{ span: 2 }} className="box-31">
                      3
                    </Col>
                    <Col id="4" md={{ span: 2 }} className="box-31">
                      4
                    </Col>
                    <Col id="5" md={{ span: 2 }} className="box-31">
                      5
                    </Col>
                    <Col id="6" md={{ span: 2 }} className="box-31">
                      6
                    </Col>
                  </Row>
                  <Row>
                    <Col id="7" md={{ span: 2 }} className="box-31">
                      7
                    </Col>
                    <Col id="8" md={{ span: 2 }} className="box-31">
                      8
                    </Col>
                    <Col id="9" md={{ span: 2 }} className="box-31">
                      9
                    </Col>
                    <Col id="10" md={{ span: 2 }} className="box-31">
                      10
                    </Col>
                    <Col id="11" md={{ span: 2 }} className="box-31">
                      11
                    </Col>
                    <Col id="12" md={{ span: 2 }} className="box-31">
                      12
                    </Col>
                  </Row>
                  <Row>
                    <Col id="13" md={{ span: 2 }} className="box-31">
                      13
                    </Col>
                    <Col id="14" md={{ span: 2 }} className="box-31">
                      14
                    </Col>
                    <Col id="15" md={{ span: 2 }} className="box-31">
                      15
                    </Col>
                    <Col id="16" md={{ span: 2 }} className="box-31">
                      16
                    </Col>
                    <Col id="17" md={{ span: 2 }} className="box-31">
                      17
                    </Col>
                    <Col id="18" md={{ span: 2 }} className="box-31">
                      18
                    </Col>
                  </Row>
                  <Row>
                    <Col id="19" md={{ span: 2 }} className="box-31">
                      19
                    </Col>
                    <Col id="20" md={{ span: 2 }} className="box-31">
                      20
                    </Col>
                    <Col id="21" md={{ span: 2 }} className="box-31">
                      21
                    </Col>
                    <Col id="22" md={{ span: 2 }} className="box-31">
                      22
                    </Col>
                    <Col id="23" md={{ span: 2 }} className="box-31">
                      23
                    </Col>
                    <Col id="24" md={{ span: 2 }} className="box-31">
                      24
                    </Col>
                  </Row>
                  <Row>
                    <Col id="25" md={{ span: 2 }} className="box-31">
                      25
                    </Col>
                    <Col id="26" md={{ span: 2 }} className="box-31">
                      26
                    </Col>
                    <Col id="27" md={{ span: 2 }} className="box-31">
                      27
                    </Col>
                    <Col id="28" md={{ span: 2 }} className="box-31">
                      28
                    </Col>
                    <Col id="29" md={{ span: 2 }} className="box-31">
                      29
                    </Col>
                    <Col id="30" md={{ span: 2 }} className="box-31">
                      30
                    </Col>
                  </Row>
                  <div className="box-31" id="31" md={{ span: 12 }}>
                    31
                  </div>
                </Container>
              </div>
            </div>
          ),
        }[gameCategory]
      }
    </div>
  );

  //=================================Send Signal Start===================================

  //LiarGame Signal Start
  function sendLiarOrNot(subject, urLiar) {
    if (!isHost) {
      return;
    }
    const mySession = session;
    let liarUser = connections.filter(
      (element) => element.connectionId === urLiar.userId
    );
    mySession.signal({
      data: `${subject}, ${"????????? ????????? ?????????"}`,
      to: liarUser,
      type: "pickLiar",
    });

    let notLiarUser = connections.filter(
      (element) => element.connectionId !== urLiar.userId
    );
    mySession.signal({
      data: `${subject}, ${urLiar.userName}`,
      to: notLiarUser,
      type: "liarSubject",
    });

    // setDiscussionOrder();
  }

  function signalSetLiarGameState(mode) {
    SetLiarGameState(mode);
    const mySession = session;
    mySession.signal({
      data: mode,
      to: [],
      type: "setLiarGameState",
    });
  }

  function sendDiscussionOrder(usersString) {
    const mySession = session;
    mySession.signal({
      data: usersString,
      to: [],
      type: "setDiscussionOrder",
    });
  }

  function sendLiarVote(liarVoteValue) {
    const mySession = session;
    mySession.signal({
      data: liarVoteValue,
      to: [],
      type: "settingVoteResult",
    });
  }

  function resetIsVote() {
    const mySession = session;
    mySession.signal({
      data: "resetIsVote",
      to: [],
      type: "resetIsVote",
    });
  }

  function resetLiarVote(usersString) {
    const mySession = session;
    mySession.signal({
      data: usersString,
      to: [],
      type: "resetVoteResult",
    });
  }

  // function sendSignalresetIsVote() {
  //   const mySession = session;
  //   mySession.signal({
  //     data: "pleasereset",
  //     to: [],
  //     type: "SignalresetIsVote",
  //   });
  // }

  function sendVoteResult() {
    let voteResultString = "";
    voteResult.forEach((val) => {
      voteResultString = voteResultString + `${Object.keys(val)}` + "," +  `${Object.values(val)}` + ","
    });
    let voteStringValue = voteResultString.slice(0, -1);
    const mySession = session;
    mySession.signal({
      data: voteStringValue,
      to: [],
      type: "voteStringValue",
    });
  }
  //LiarGame Signal End

  function sendRestart() {
    SetMatchingUpDown(" ");
    // createRandomNumber(range);
    const mySession = session;
    mySession.signal({
      data: `${gameState}`,
      to: [],
      type: "setRestart",
    });
  }

  function sendRange() {
    let randomNumValue = createRandomNumber(range);
    const mySession = session;
    setTimeout(() => {
      mySession.signal({
        data: `${gameState},${range},${randomNumValue}`,
        to: [],
        type: "setRange",
      });
    }, 300);
  }

  function sendUpAndDownNum() {
    let stringMatchValue = matchUpDown(parseInt(upAndDownNum));
    const mySession = session;
      mySession.signal({
        data: `${upAndDownNum},${stringMatchValue},${matchingUpDown}`,
        to: [],
        type: "setUpAndDownNum",
      });
  }
  //=================================Send Signal End==================================

  function receiveSignal() {
    const mySession = session;

    //LiarGame start
    mySession.on("signal:pickLiar", (event) => {
      setDiscussionOrder();
      let Data = event.data.split(",");
      SetLiarSubject(Data[0]);
      SetLiarOrNot(Data[1]);
      SetLiar(myUserName);
      MySwal.fire("????????? ????????? ?????????");
    });

    mySession.on("signal:liarSubject", (event) => {
      setDiscussionOrder();
      let Data = event.data.split(",");
      SetLiarOrNot(() => "???????????? " + Data[0] + " ?????????");
      SetLiar(Data[1]);
      SetLiarSubject(Data[0]);
      MySwal.fire(`???????????? ${Data[0]} ?????????`);
    });

    mySession.on("signal:setLiarGameState", (event) => {
      SetLiarGameState(event.data);
    });

    mySession.on("signal:setDiscussionOrder", (event) => {
      const names = event.data.split(",");
      SetUserNames(names);
      let voteList = [];
      for (let i = 0; i < names.length; i++) {
        let voteObj = {};
        voteObj[names[i]] = parseInt(0);
        voteList.push(voteObj);
      }
      // if (userNames === []) {
      //   setTimeout
      // }
      SetVoteResult(voteList);
      SetDefaultUserVote(voteList);
    });

    mySession.on("signal:resetIsVote", (event) => {
      SetIsVote(false);
      SetLiarVote(liarVote);
    });

    mySession.on("signal:resetVoteResult", (event) => {
      const names = event.data.split(",");
      SetUserNames(names);
      let voteList = [];
      for (let i = 0; i < names.length; i++) {
        let voteObj = {};
        voteObj[names[i]] = 0;
        voteList.push(voteObj);
      }
      SetVoteResult(voteList);
    });

    // mySession.on("signal:SignalresetIsVote", (event) => {
    //   resetIsVote();
    // });

    mySession.on("signal:voteStringValue", (event) => {
      const result = event.data.split(",");
      let resultList = [];
      for (let i = 0; i < result.length; i+=2) {
        let resultObj = {};
        resultObj[result[i]] = result[i+1];
        resultList.push(resultObj);
      }
      SetVoteResult(resultList);
    });

    mySession.on("signal:setRange", (event) => {
      event.preventDefault();
      let Data = event.data.split(",");
      SetGameState(true);
      SetRange(parseInt(Data[1]));
      SetRandomNum(parseInt(Data[2]));
    });

    mySession.on("signal:setUpAndDownNum", (event) => {
      event.preventDefault();
      let Data = event.data.split(",");
      SetUpAndDownNum(parseInt(Data[0]));
      SetMatchingUpDown(Data[1]);
      SetFromSignalUserName(JSON.parse(event.from.data).clientData);
    });

    mySession.on("signal:setRestart", (event) => {
      // var isFalseBoolean = (event.data === 'true');
      SetGameState(false);
      // SetGameState(isFalseBoolean);
      SetMatchingUpDown(" ");
    });
  }

  //LiarGame Start
  function startLiarGame(subjectCategory) {
    if (!isHost) {
      return;
    }
    let urLiar = shuffleArray(connectionUser)[0];

    let subject = shuffleArray(subjectCategory)[0];
    sendLiarOrNot(subject, urLiar);
  }

  function selectSubjectCategory(category) {
    let Animal = [
      "?????????",
      "?????????",
      "?????????",
      "??????",
      "??????",
      "???",
      "??????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "??????",
      "?????????",
      "??????",
      "??????",
      "??????",
      "???",
      "?????????",
      "???",
      "??????",
      "?????????",
      "??????",
      "?????????",
      "??????",
      "??????",
      "????????????",
      "??????",
      "??????",
      "??????",
      "???",
      "?????????",
      "???",
      "??????",
      "?????????",
      "???",
      "?????????",
      "???",
      "?????????",
      "??????",
    ];
    let Country = [
      "??????",
      "??????",
      "??????",
      "?????????",
      "??????",
      "?????????????????????",
      "?????????",
      "??????",
      "??????",
      "???????????????",
      "????????????",
      "?????????",
      "?????????",
      "????????????",
      "??????",
      "?????????",
      "??????",
      "?????????",
      "?????????",
      "?????????",
      "??????",
      "?????????",
      "??????",
      "?????????",
      "?????????",
      "?????????",
      "???????????????",
      "??????",
      "????????????",
      "??????",
      "????????????",
      "?????????",
      "??????",
      "?????????",
    ];
    let Fruit = [
      "??????",
      "??????",
      "?????????",
      "?????????",
      "??????",
      "??????",
      "??????",
      "???",
      "??????",
      "??????",
      "?????????",
      "??????",
      "??????",
      "????????????",
      "????????????",
      "??????",
      "??????",
      "????????????",
      "?????????",
      "?????????",
      "??????",
      "???",
      "??????",
      "??????",
      "???",
      "??????",
      "??????",
      "?????????",
      "??????",
      "??????",
      "???????????????",
      "?????????",
      "??????",
    ];
    let Sports = [
      "??????",
      "??????",
      "??????",
      "??????",
      "??????",
      "??????",
      "??????",
      "????????????",
      "??????",
      "?????????",
      "??????",
      "??????",
      "?????????",
      "??????",
      "??????",
      "??????",
      "??????",
      "??????",
      "????????????",
      "??????",
      "??????",
      "?????????",
      "????????????",
      "?????????",
      "??????",
      "?????????",
      "?????? ??????",
      "??????",
      "??????",
      "??????",
      "?????????",
      "????????????",
      "??????",
      "??????",
    ];
    let Job = [
      "??????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "????????????",
      "??????",
      "?????????",
      "????????????",
      "????????????",
      "??????",
      "??????",
      "??????",
      "?????????",
      "?????????",
      "?????????",
      "????????????",
      "?????????",
      "?????????",
      "?????????",
      "??????????????????",
      "??????",
      "?????????",
      "?????????",
      "??????",
      "??????",
      "??????",
      "????????????",
      "?????????",
    ];
    let Idol = [
      "????????????",
      "????????????",
      "(??????)?????????",
      "????????????",
      "??????",
      "??????????????????",
      "????????????",
      "?????????",
      "????????????",
      "????????????",
      "????????????",
      "????????????",
      "???????????????",
      "?????????",
      "??????",
      "?????????",
      "?????????",
      "?????????",
      "2PM",
      "??????",
      "????????????",
      "??????",
      "?????????",
      "????????????",
      "?????????",
      "??????",
      "?????????",
      "????????????",
    ];
    let Movie = [
      "????????????",
      "????????????",
      "????????????",
      "???????????????",
      "???????????????",
      "??????",
      "???????????????",
      "??????",
      "?????????",
      "????????? ??????",
      "????????????",
      "??????????????? ??????",
      "?????????",
      "?????????",
      "????????????",
      "????????????",
      "????????????",
      "??????",
      "?????????",
      "????????????",
      "????????? ??????",
      "?????? ??????",
      "?????????",
      "?????????",
      "?????????",
      "???????????????",
      "?????????",
      "????????????",
      "????????????",
    ];
    let Actor = [
      "?????????",
      "?????????",
      "?????????",
      "??????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "??????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
    ];
    let Place = [
      "??????",
      "????????????",
      "??????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "???????????????",
      "???",
      "??????",
      "??????",
      "?????????",
      "??????",
      "?????????",
      "?????????",
      "??????",
      "?????????",
      "?????????",
      "??????",
      "??????",
      "????????????",
      "?????????",
      "??????",
      "??????",
      "???",
      "??????",
    ];

    let subjectCategory = [];

    if (category === "Animal") {
      subjectCategory = [...Animal];
    } else if (category === "Country") {
      subjectCategory = [...Country];
    } else if (category === "Fruit") {
      subjectCategory = [...Fruit];
    } else if (category === "Sports") {
      subjectCategory = [...Sports];
    } else if (category === "Job") {
      subjectCategory = [...Job];
    } else if (category === "Idol") {
      subjectCategory = [...Idol];
    } else if (category === "Movie") {
      subjectCategory = [...Movie];
    } else if (category === "Actor") {
      subjectCategory = [...Actor];
    } else if (category === "Place") {
      subjectCategory = [...Place];
    }
    startLiarGame(subjectCategory);
  }

  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (parseInt(i) + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function setDiscussionOrder() {
    const DiscussionOrder = [...shuffleArray(connectionUser)].map(
      (el) => `${el.userName}`
    );
    const usersString = DiscussionOrder.join(",");
    sendDiscussionOrder(usersString);
  }

  function resetDiscussionOrder() {
    const DiscussionOrder = connectionUser.map((el) => `${el.userName}`);
    const usersString = DiscussionOrder.join(",");
    resetLiarVote(usersString);
    // SetVoteResult(defaultUserVote);
  }

  function setLiarVoteList(names) {
    let voteList = [];
    for (let i = 0; i < names.length; i++) {
      let voteObj = {};
      voteObj[names[i]] = 0;
      voteList.push(voteObj);
    }
    // if (userNames === []) {
    //   setTimeout
    // }
    SetVoteResult(voteList);
  }
  //LiarGame End

  //UpAndDown Start
  function createRandomNumber(num) {
    const randomNum = Math.floor(Math.random() * (parseInt(num) + 1));
    SetRandomNum(randomNum);
    return randomNum;
  }
  function matchUpDown(chooseNum) {
    if (parseInt(chooseNum) < parseInt(randomNum)) {
      SetMatchingUpDown("UP");
      return "UP";
    } else if (parseInt(chooseNum) > parseInt(randomNum)) {
      SetMatchingUpDown("DOWN");
      return "DOWN";
    } else {
      SetMatchingUpDown("???????????????!");
      return "???????????????!";
    }
  }
}

export default GamePanel;
