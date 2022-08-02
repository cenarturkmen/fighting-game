import React, { useState, useEffect } from "react";

import { Character } from "./Character/Character";
import { Boss } from "./Boss/Boss";

import "./Field.scss";

interface FieldProps {}

export const Field: React.FC<FieldProps> = () => {
  const [characterNames, setCharacterNames] = useState([""]);
  const [damagedFlag1, setDamagedFlag1] = useState(false);
  const [damagedFlag2, setDamagedFlag2] = useState(false);
  const [damagedFlag3, setDamagedFlag3] = useState(false);
  const [recievedDamage, setRecievedDamage] = useState(0); //goes to character
  const [bossTurn, setBossTurn] = useState(false);

  const getCharacterName = (charactername: string): void => {
    characterNames.push(charactername);
  };

  const getDamageInfo = (skilldamage: number, targetname: string): void => {
    setRecievedDamage(skilldamage);
    checkDamagedCharacter(targetname, characterNames);
  };

  function checkDamagedCharacter(
    targetname: string,
    characternames: Array<string>
  ) {
    if (characternames[1] === targetname) {
      setDamagedFlag1(true);
    } else if (characternames[2] === targetname) {
      setDamagedFlag2(true);
    } else if (characternames[3] === targetname) {
      setDamagedFlag3(true);
    } else {
      setDamagedFlag1(false);
      setDamagedFlag2(false);
      setDamagedFlag3(false);
    }
  }

  useEffect(() => {
    //setdamagedflags back to false
    if (damagedFlag1 || damagedFlag2) {
      setDamagedFlag1(false);
      setDamagedFlag2(false);
      setBossTurn(false);
    }
    if (damagedFlag3) {
      setDamagedFlag3(false);
      setBossTurn(true);
    }
  }, [damagedFlag1, damagedFlag2, damagedFlag3]);

  return (
    <>
      <div className="allies">
        <div className="character1">
          <Character
            characterName={"character1"}
            getDamageInfo={getDamageInfo}
            getCharacterName={getCharacterName}
            damagedFlag={damagedFlag1}
            recievedDamage={recievedDamage}
          />
        </div>
        <div className="character2">
          <Character
            characterName={"character2"}
            getDamageInfo={getDamageInfo}
            getCharacterName={getCharacterName}
            damagedFlag={damagedFlag2}
            recievedDamage={recievedDamage}
          />
        </div>
      </div>
      <div className="enemies">
        <div className="boss">
          <Boss
            characterName={"boss1"}
            getDamageInfo={getDamageInfo}
            getCharacterName={getCharacterName}
            damagedFlag={damagedFlag3}
            recievedDamage={recievedDamage}
            bossTurn={bossTurn}
          />
        </div>
      </div>
    </>
  );
};
