import React, {useState} from 'react';
import personSvg from './img/person.svg'
import {css} from '@emotion/css'
import {BoardType, ItemType} from "./board.type";

function App() {
    let phrases = [
        {
            id: 0,
            completed: false,
            russian: 'Купить хлеб ',
            english: 'Buy bread'
        },
        {
            id: 1,
            completed: false,
            russian: 'Вечером Джон будет смотреть кино ',
            english: 'John will watch a movie tonight'
        },
        {
            id: 2,
            completed: false,
            russian: 'Джейсон любит кататься на мотоцикле ',
            english: 'Jason loves to ride a motorcycle'
        },
    ];
    let [boards, setBoards] = useState([
        {
            id: 0, items: []
        },
        {
            id: 1, items: []
        },
        {
            id: 2, items: [
                {
                    id: 0,
                    order: 0,
                    text: "Купить",
                    enabled: true
                }
            ]
        }
    ])
    let [answersList, setAnswersList] = useState([
        {
            id: 0,
            order: 0,
            text: "Купить",
            enabled: true
        },
        {
            id: 1,
            order: 1,
            text: "хлеб",
            enabled: true
        },
        {
            id: 2,
            order: 2,
            text: "Джон",
            enabled: true
        },
        {
            id: 3,
            order: 3,
            text: "будет",
            enabled: true
        },
        {
            id: 4,
            order: 4,
            text: "смотреть",
            enabled: true
        },
        {
            id: 5,
            order: 5,
            text: "не",
            enabled: true
        },
        {
            id: 6,
            order: 6,
            text: "Вечером",
            enabled: true
        },
        {
            id: 7,
            order: 7,
            text: "кино",
            enabled: true
        },
        {
            id: 8,
            order: 8,
            text: "Джейсон",
            enabled: true
        },
        {
            id: 9,
            order: 9,
            text: "любит",
            enabled: true
        },
        {
            id: 10,
            order: 10,
            text: "на",
            enabled: true
        },
        {
            id: 11,
            order: 11,
            text: "кататься",
            enabled: true
        },
        {
            id: 12,
            order: 12,
            text: "мотоцикле",
            enabled: true
        },
        {
            id: 13,
            order: 13,
            text: "мотоцикле",
            enabled: false
        },
        {
            id: 14,
            order: 14,
            text: "мотоцикле",
            enabled: false
        },
        {
            id: 15,
            order: 15,
            text: "мотоцикле",
            enabled: false
        }
    ])

    let [currentBoard, setCurrentBoard] = useState<any | null>(null);
    let [currentAnswer, setCurrentAnswer] = useState<any | null>(null);
    let [answerIsError, setAnswerIsError] = useState(false)

    let [activePhrase, setActivePhrase] = useState(0)

    const loadPhrase = () => {
        setActivePhrase(Math.floor(Math.random() * phrases.length))
    };


    function dragStartHandler(e: React.DragEvent<HTMLSpanElement>,
                              board: BoardType,
                              ans: ItemType) {
        setCurrentBoard(board)
        setCurrentAnswer(ans)
    }

    function dragEndHandler(e: React.DragEvent<HTMLSpanElement>) {
    }

    function dragOverHandler(e: React.DragEvent<HTMLSpanElement>) {
        e.preventDefault()
    }

    function dropHandler(e: React.DragEvent<HTMLSpanElement>,
                         board: BoardType,
                         ans: ItemType) {
        e.preventDefault()
        let answer = board.items

        answer = answer.map(item => {
            if (item.id === ans.id) {
                return {...item, order: currentAnswer.order}
            }
            if (item.id === currentAnswer.id) {
                return {...item, order: ans.order}
            }
            return item
        })

        setBoards(boards.map(boardItem => {
            if (boardItem.id === board.id) {
                boardItem.items = answer
                return boardItem
            }
            if (boardItem.id === currentBoard.id) {
                return currentBoard
            }
            return boardItem
        }))
    }

    function dropBoardHandler(e: React.DragEvent<HTMLDivElement>, board: BoardType) {
        board.items.push(currentAnswer)
        let dropIndex = currentBoard.items.indexOf(currentAnswer)
        currentBoard.items.splice(dropIndex, 1)


        setAnswersList(answersList.map(answer => {
            if (answer.id === currentAnswer.id && board.id === boards[boards.length-1].id) {
                return {...answer, enabled: true}
            }

            if (answer.id === currentAnswer.id) {
                return {...answer, enabled: false}
            }

            return answer
        }))

        setBoards(boards.map(boardItem => {
                if (boardItem.id === board.id) {
                    return boardItem
                }
                if (boardItem.id === currentBoard.id) {
                    return currentBoard
                }
                return boardItem
            }
        ))
    }

    const sortAnswers = (a: any, b: any) => {
        if (a.order > b.order)
            return 1
        else
            return -1
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLSpanElement>) {
    }

    function translateCheck() {
        let sentence: string = ''

        boards.map(line => {
            line.items.map(word =>{
                sentence += word.text + ' '
            })
            return line
        })

        return sentence === phrases[activePhrase].russian ?
            (loadPhrase(), setAnswerIsError(false)) :
            setAnswerIsError(true)
    }

    return (
        <div className={appStyle} onLoad={loadPhrase}>
            <div className={formStyle}>
                <h1 className={headerStyle}>Translate this sentence</h1>
                <div className={personStyle}>
                    <div className={personObj}>
                        <img src={personSvg} alt="person"/>
                    </div>
                    <div className={messageCloud}>
                        <p>{phrases[activePhrase].english}</p>
                    </div>
                </div>

                {boards.map(board =>
                    <div onDragOver={(e) => dragOverHandler(e)}
                         onDrop={(e) => dropBoardHandler(e, board)} key={board.id}>
                        <div className={answerArea}>
                            <hr/>
                        </div>
                        <div className={answers}>
                            {boards[boards.length - 1].id !== board.id &&
                                board.items.sort(sortAnswers).map(ans =>
                                    <span draggable={true}
                                          key={ans.id}
                                          onDragStart={(e) => dragStartHandler(e, board, ans)}
                                          onDragEnd={(e) => dragEndHandler(e)}
                                          onDragLeave={(e) => dragLeaveHandler(e)}
                                          onDragOver={(e) => dragOverHandler(e)}
                                          onDrop={(e) => dropHandler(e, board, ans)}
                                          className={answer}>{ans.text}
                                    </span>
                                )
                            }
                            {boards[boards.length - 1].id === board.id &&
                                answersList.sort(sortAnswers).map((ans: ItemType) => ans.enabled &&
                                    <span draggable={true}
                                          key={ans.id}
                                          onDragStart={(e) => dragStartHandler(e, board, ans)}
                                          onDragEnd={(e) => dragEndHandler(e)}
                                          onDragLeave={(e) => dragLeaveHandler(e)}
                                          onDrop={(e) => dropHandler(e, board, ans)}
                                          className={answer}>{ans.text}</span> || !ans.enabled &&
                                    <span key={ans.id} className={emptyAnswer}></span>
                                )
                            }
                        </div>
                    </div>
                )}
            </div>

            {answerIsError &&
                <p className={errorAnswer}> Something wrong!</p>
            }
            <button onClick={event => {
                translateCheck()
            }}>check
            </button>
        </div>
    );
}


const appStyle = css`
  display: flex;
  height: 80vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const formStyle = css`
  width: 50em;
`

const headerStyle = css`
  font-size: 36px;
  font-weight: 400;
  line-height: 42px;
  color: #252525;
  text-shadow: -2px -4px 3px #FFFFFF, 2px 4px 3px rgba(0, 0, 0, 0.25);
`

const personStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 172.5px;
  margin-bottom: 49.5px;
`

const personObj = css`
  width: 10em;
`

const messageCloud = css`
  text-decoration: underline;
  word-spacing: 10px;
  text-align: start;
  border: 2px solid #252525;
  border-radius: 20px;
  position: relative;
  padding: 17px 24px 21px 43px;
  width: 40%;
  height: 60px;

  &:before {
    position: absolute;
    content: "";
    right: 100%;
    top: 60px;
    border-top: 25px solid transparent;
    border-right: 28px solid #252525;
  }

  &:after {
    position: absolute;
    content: "";
    right: 98.6%;
    top: 58px;
    border-top: 25px solid transparent;
    border-right: 28px solid #ffffff;
  }`

const answerArea = css`
  height: 25px;
`

const answers = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
`
const answer = css`
  box-sizing: border-box;
  text-align: center;
  background: #FFFFFF;
  border: 1px solid #C9C9C9;
  box-shadow: 0px 8px 4px -6px rgba(0, 0, 0, 0.25);
  border-radius: 13px;
  padding: 5px 16px 5px 16px;
  cursor: pointer;`

const emptyAnswer = css`
  background: #E6E6E6;
  box-shadow: inset 0px 8px 4px -6px rgba(0, 0, 0, 0.25);
  border-radius: 13px;
`

const errorAnswer = css`
  color: #FF0000;
`
export default App;