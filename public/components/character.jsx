/* Each instance of this class is a character's avatar
 *
 */

import React from "react";

class Character extends React.Component {
  render() {
    return (
      <div
        className="avatar"
        onClick={() => this.props.onClick(this.props.character)}
        style={this.setAvatar()}
      />
    );
  }

  setAvatar() {//Dynamically set characters' avatars and style properties.
    let url = this.props.character.url;
    let border = this.props.character.border;
    return {
      background: `url(${url})`,
      backgroundSize: "cover",
      backgroundColor: "#B11312",
      border: `3px solid ${border}`
    };
  }
}

export default Character;
