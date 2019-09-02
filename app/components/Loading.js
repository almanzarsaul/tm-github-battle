import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center'
  }
};

export default class Loading extends React.Component {
  state = {
    content: this.props.text
  };

  componentDidMount = () => {
    const { speed, text } = this.props;

    this.interval = window.setInterval(() => {
      this.state.content === text + '...' // if state.content = Loading...
        ? this.setState({ content: text }) // set state.content to Loading
        : this.setState(state => ({ content: state.content + '.' })); // else ONLY change state.content to increment by one
    }, speed);
  };

  componentWillUnmount = () => window.clearInterval(this.interval);

  render() {
    return <p style={styles.content}>{this.state.content}</p>;
  }
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
};
