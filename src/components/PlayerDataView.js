import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

function PlayerDataView() {
  const [players, setPlayers] = useState([]);
  const [playerData, setPlayerData] = useState([]);
  const url = "https://api.npoint.io/20c1afef1661881ddc9c";
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        const response = res.data.playerList;
        const list = response.map((data, i) => {
          return {
            ...data,
            formattedDate: `${
              data.UpComingMatchesList[0].MDate !== ""
                ? moment(data.UpComingMatchesList[0].MDate).format(
                    "DD-MM-YYYY h:mm:ss a"
                  )
                : "-"
            }`,
            nextMatch: `${
              data?.UpComingMatchesList[0]?.CCode !== ""
                ? data?.UpComingMatchesList[0]?.CCode
                : "-"
            } vs. ${
              data?.UpComingMatchesList[0]?.VsCCode !== ""
                ? data?.UpComingMatchesList[0]?.VsCCode
                : "-"
            } `,
            profile: `assets/${data.Id}.jpg`,
          };
        });
        list.sort((a, b) => a.Value - b.Value);
        setPlayers(list);
        setPlayerData(list);
      })
      .catch((e) => console.log(e));
  }, []);

  function getInput(e) {
    const value = e.target.value.toLowerCase();
    if (value) {
      setPlayers(
        playerData.filter((item) => item.PFName.toLowerCase().includes(value))
      );
    } else {
      setPlayers(playerData);
    }
  }
  return (
    <div className="main-container">
      <h3 className="heading">Player Details</h3>
      <div className="input-container">
        <input
          type="text"
          className="input-box"
          onChange={getInput}
          placeholder="Enter player name"
        />
      </div>
      <div className="main-content">
        {players.map((player) => (
          <div className="box" key={player.Id}>
            {player.profile !== "" && (
              <img
                className="player-img"
                src={player.profile}
                alt={player.PFName}
              />
            )}
            <div className="content">
              <p className="title">
                Name:{player.PFName}
                {player.Id}
              </p>
              <p className="skill">Skill:{player.SkillDesc}</p>
              <p className="player-value">Value:${player.Value}Million</p>
              <p className="match">Next Match:{player?.nextMatch}</p>
              <p className="match">Next Match Time:{player.formattedDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayerDataView;
