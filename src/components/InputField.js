import React from "react";

export default class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  updateInputField(e) {
    this.setState({value: e.nativeEvent.target.value});
  }

  render() {
    return (
        <input type="text" onBlur={() => this.props.callBack()} value={this.state.value} onChange={(e) => this.updateInputField(e)}/>
    );
  }
}
