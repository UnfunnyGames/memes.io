import React from "react";

class Character extends React.Component {

  render() {
    return (
          <div className='avatar' style={this.setAvatar(this.props.character.id)} ></div>
    );
  }

  setAvatar(i) {
     let url = this.props.character.url
     return ({
       background: `url(${url})`,
       backgroundSize: "cover",
       backgroundColor: "#B11312"
     });
   };

}

export default Character;
