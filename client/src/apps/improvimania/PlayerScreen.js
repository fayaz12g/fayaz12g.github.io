import React, { useState } from 'react';
import finishTheme from '../../sound/improvimania/finish.m4a';
import AudioPlayer from '../AudioPlayer';

const PlayerScreen = ({
  isEndGame,
  joinedSession,
  sessionId,
  setSessionId,
  playerName,
  setPlayerName,
  joinSession,
  gameStarted,
  players,
  playerRole,
  isEndScene,
  currentLine,
  isSpeaker,
  nextLine,
  guessAdlibber,
  sessionList,
  leaderboard,
  kicked,
  titleTheme,
  BackgroundMusic,
  speakingTheme,
  guessingTheme,
  sentGuess,
}) => {

  return (
    <div>
      {!isEndGame ? (
        <div>
          {!gameStarted ? (
          <div>
            <div className="App">
            <h3>Welcome, {playerName}</h3>
            <h2>Joined Session: {sessionId}</h2>
            <h4>Players:</h4>
            <ul>
              {players.map((player, index) => (
                <li key={index}>{player.name}</li>
              ))}
            </ul>
            <p>
              {players.length === 4
                ? "Waiting for host to start the game..."
                : "Waiting for 4 players..."}
            </p>
          </div>
          </div>
        ) : (
          <div>
           
            {playerRole && playerRole.startsWith('Speaker 1') && (
              <>
               <div className="App">
                <h3>Your Role: Adlibber</h3>
                {isEndScene ? (
                  <div>Try to blend in, make it look like you're picking someone!</div>
                ) : (
                  <>
                    <div>
                      <b>{currentLine?.text}</b>
                    </div>
                    {currentLine?.isAdlib && (
                      <p className="smalltext">(It's your line!)</p>
                    )}
                    {isSpeaker && <button onClick={nextLine}>Next</button>}
                  </>
                  
                )}
                </div>
              </>
            )}
           
            {playerRole &&
              (playerRole.startsWith('Speaker 2') ||
                playerRole.startsWith('Speaker 3')) && (
                <>
                  <div className="App">
                  <h3>Your Role: Speaker</h3>
                  {isEndScene ? (
                    <div>END SCENE</div>
                  ) : (
                    <>
                    {isSpeaker && (
                      <div>
                        Read your line: 
                      </div>
                      )}
                      <div>
                      <b>{currentLine?.text}</b>
                      </div>
                      {/* {isSpeaker && (
                        <p className="smalltext">(Read your line!)</p>
                      )} */}
                      {isSpeaker && <button onClick={nextLine}>Next</button>}
                    </>
                  )}
                  </div>
                </>
              )}
            {playerRole === 'Guesser' &&
              (isEndScene ? (
                <div>
                    <div className="App">
                    <h3>Guess the Adlibber!</h3>
                    {!sentGuess && <p>Choose the person you think was making up their lines:</p>}
                    {sentGuess && <p>Your guess was sent.</p>}
                    {!sentGuess && 
                    players.map((player, index) => (
                        player.name !== playerName && (
                          <button
                                key={index}
                                onClick={() => guessAdlibber(player.name)}
                            >
                                {player.name}
                            </button>
                        )
                    ))}
                </div>
                </div>
              ) : (
                <div>
                   <div className="App">
                  <h3>Your Role: Guesser</h3>
                  <p>Listen carefully and try to guess the adlibber!</p>
                  <b>{currentLine?.text}</b>
                </div>
                </div>
              ))}
          </div>
        )}
      </div>
    ) : (
      <div>
        <div className="App">
        <AudioPlayer audioSrc={finishTheme}/>
        <h3>Game Results</h3>
        <ul>
          {Object.entries(leaderboard).map(([name, score]) => (
            <li key={name}>
              {name}: {score}
            </li>
          ))}
        </ul>
      </div>
      </div>
    )}
  </div>
);

}
export default PlayerScreen;
