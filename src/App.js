import React, { useState } from 'react';
import './App.css';

function App() {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber()); //게임에서 맞춰야 할 랜덤 숫자. generateRandomNumber() 함수를 사용하여 초기화
  const [userGuess, setUserGuess] = useState(''); //사용자가 입력한 추측 숫자
  const [message, setMessage] = useState(''); //게임에서 제공할 메시지 저장
  const [attempts, setAttempts] = useState(0);  //사용자가 시도한 횟수를 저장.
  const [userGuesses, setUserGuesses] = useState([]); // 사용자가 입력한 숫자를 저장
  const [gameOver, setGameOver] = useState(false); // 게임 종료 상태

  // 랜덤 숫자 생성 함수
  // 함수는 1부터 100까지의 랜덤 숫자를 생성하여 반환
  // Math.random()을 사용하여 랜덤 값을 얻고, Math.floor()로 소수점을 버리고 정수로 변환
  function generateRandomNumber() { 
    return Math.floor(Math.random() * 100) + 1; // 1~100까지 숫자
  }

  // 사용자의 입력을 처리하는 함수
  // 사용자가 입력한 값을 userGuess 상태에 저장하는 함수
  // e.target.value는 사용자가 입력한 숫자를 가져옴. 이를 userGuess 상태에 업데이트
  const handleInputChange = (e) => {
    setUserGuess(e.target.value);
  };

  // 게임 진행 함수
  // handleSubmit 함수는 사용자가 숫자를 제출했을 때 호출됨. 폼 제출 이벤트를 처리
  // e.preventDefault()로 페이지가 새로고침되는 것을 막고, userGuess 상태에 저장된 값을 parseInt로 정수로 변환
  const handleSubmit = (e) => {
    e.preventDefault();
    const guess = parseInt(userGuess);

    // 유효한 숫자인지 체크 (1~100까지의 숫자)
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setMessage('1에서 100 사이의 숫자를 입력해주세요.');
      return;
    }

    setAttempts(attempts + 1);

    // 사용자가 입력한 숫자를 저장
    // 사용자가 입력한 숫자에 대한 추측 결과를 계산. guess < randomNumber이면 "보다 높음", guess > randomNumber이면 "보다 낮음", 맞추면 "정답!"라는 결과 설정
    // guessInfo 객체는 사용자가 입력한 숫자와 그에 대한 결과를 포함. 이를 userGuesses 배열에 추가
    const guessInfo = {
      number: guess,
      result: guess < randomNumber ? '보다 높음' : guess > randomNumber ? '보다 낮음' : '정답!',
    };
    setUserGuesses([...userGuesses, guessInfo]);

    // 정답을 맞췄을 때 정답이 , 못맞췄을때 더 높은지 낮은지를 알려줌
    if (guess === randomNumber) {
      setMessage('정답!') 
      setGameOver(true); // 게임 종료
    } else if (guess < randomNumber) {
      setMessage(`${guess}보다 더 높아요!`);   //제가 넣은 코드
    } else if (guess > randomNumber) {
      setMessage(`${guess}보다 더 낮아요!`);   //제가 넣은 코드
    }

    // 10번 시도(attempts) 후 게임 종료
    if (attempts >= 9 && !gameOver) {
      setMessage(`게임 종료! 정답은 ${randomNumber}였습니다.`);
      setGameOver(true); // 게임 종료
    }

    setUserGuess('');
  };

  // 게임 리셋 함수 (다시하기 버튼)
  // handleRestart 함수는 "다시하기" 버튼이 클릭되었을 때 호출
  // 모든 상태를 초기화 하여 다시 게임르 새로 시작할수있게 만듬
  const handleRestart = () => {
    setRandomNumber(generateRandomNumber()); // 새로운 랜덤 숫자 생성
    setUserGuess('');
    setMessage('');
    setAttempts(0);
    setUserGuesses([]); // 이전 추측 기록을 초기화
    setGameOver(false); // 게임 종료 상태 초기화
  };

  return (
    <div className="App">
      <h1>숫자 맞추기</h1>
      <p>1~100 사이의 숫자를 맞춰보세요</p>

      {!gameOver && attempts < 10 && (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={userGuess}
            onChange={handleInputChange}
            min="1"
            max="100"
            placeholder="1~100 숫자 입력"     //입력창에 띄워놓음
          />
          <button type="submit">확인</button>
        </form>
      )}

      <p>{message}</p> 
      <p>남은 기회: {10 - attempts}</p>

      <div>
        <h1>당신의 추측</h1>
        <ul>
          {userGuesses.map((guessInfo, index) => (
            <li key={index}>
              <h3>추측 #{index + 1}: {guessInfo.number} ({guessInfo.result})</h3>
            </li> //사용자가 입력한 결과값을 message 상태에 따라 출력
            //남은 기회 = attempts 남은 기회 계산해서 표시
            //사용자가 추측한 숫자와 그 결과를 목록으로 보여줌 
          ))}
        </ul>
      </div>
      
      {gameOver || attempts === 10 ? (
        <button onClick={handleRestart}>다시하기</button> //게임이 끝나면 다시하기 버튼 생성
      ) : null}
    </div>
  );
}

export default App;
