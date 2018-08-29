/* This class is the default characters selection page.
 * It includes a title, a grid with all the playable characters
 * and an input to set player's username.
 */

import React from "react";
import Character from "./character.jsx";

class CharactersMenu extends React.Component {
  state = {
    characters: [//Name: unused at the moment, url: direct link to image, border: actual colour of the border of the div.
      { name: "grim", url: "https://avatarfiles.alphacoders.com/120/120045.jpg", border: "black"},
      { name: "carlos", url: "https://i.imgur.com/Iq0WeCd.png", border: "black"},
      { name: "elf", url: "https://i.imgur.com/RIMs7Yu.png", border: "black"},
      { name: "fedora", url: "https://i.imgur.com/mcRwDan.png", border: "black"},
      { name: "roll safe", url: "https://i.imgur.com/EUGKFsO.png", border: "black"}
    ]
  };

  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
          <h1>Select your player:</h1>
          <div className="character_selection-container">
            {this.state.characters.map(char => (
              <Character
                className="avatar"
                key={char.id}
                onClick={this.handleClick}
                character={char}
              />
            ))}
          </div>
          <span className="nicknameInput">Nickname: </span>
          <input type="text" className="nicknameInput" />
        </div>
      </React.Fragment>
    );
  }

  handleClick = char => {//When clicking on an avatar, turn all the borders black and then turn the clicked avatar's border white (to indicate it's selected).
    let chars = [...this.state.characters];
    let idx = chars.indexOf(char);
    chars.forEach((el) => {
      el.border = "black"
    })
    chars[idx].border = "white"
    this.setState({characters : chars})
  };
}

export default CharactersMenu;
