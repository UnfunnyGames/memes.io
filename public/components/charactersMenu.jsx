import React from "react";
import Character from "./character.jsx";

class CharactersMenu extends React.Component {
  state = {
    characters: [
      { name: "grim", url: "https://avatarfiles.alphacoders.com/120/120045.jpg" },
      { name: "carlos", url: "https://i.imgur.com/Iq0WeCd.png" },
      { name: "elf", url: "https://i.imgur.com/RIMs7Yu.png"},
      { name: "fedora", url: "https://i.imgur.com/mcRwDan.png"},
      { name: "roll safe", url:"https://i.imgur.com/EUGKFsO.png"}
    ]
  };

  render() {

    return (
      <React.Fragment>
        <div className="wrapper">
          <h1>Select your player:</h1>
        <div className="character_selection-container">
          {this.state.characters.map(char => (
            <Character className="avatar" key={char.id} character={char} />
          ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CharactersMenu;
