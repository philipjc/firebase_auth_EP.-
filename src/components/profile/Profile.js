import React from 'react';

class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.getPicture = this.getPicture.bind(this);
  }

  getPicture(e) {

    console.log(this.imginput.files);

    const file = this.imginput.files[0];

    this.props.uploadPicture(file);
  }

  render() {
    return (
      <div className="Profile">
        <div className="user">
          { this.props.user || 'No user logged in'}
        </div>
        <div className="upload">
          <input ref={(input) => { this.imginput = input; }} type="file" id="input" onChange={ this.getPicture } />
        </div>
        <div className="image">
          <img src="" alt=""/>
        </div>
      </div>
    );
  }

}

export default Profile;
