import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TagsInput extends Component {
  constructor() {
    super();
    this.textInput = React.createRef();
    this.tagWrapper = React.createRef();
    this.state = {
      input: '',
    };
  }
  inputChange = e => {
    this.setState({
      input: this.textInput.current.value,
    });
  };
  keyPressed = e => {
    if (e.key === 'Enter') {
      this.tagWrapper.current.prepend(
        this.createNewTag(this.textInput.current.value)
      );
      this.textInput.current.value = '';
    } else {
      this.inputChange();
    }
  };
  createNewTag = value => {
    const div = document.createElement('div');
    div.setAttribute('class', 'tag');
    let newTag = `
      <span>${value}</span>
      <i class="close material-icons">close</i>
    `;
    div.innerHTML = newTag;
    return div;
  };
  elementClick = e => {
    if (e.target.classList.contains('close')) {
      e.target.parentElement.remove();
    }
  };
  render() {
    return (
      <div
        className="tag-wrapper input-wrapper"
        ref={this.tagWrapper}
        onClick={this.elementClick}
      >
        <div className="tag">
          <span>Filter here</span>
          <i className="close material-icons">close</i>
        </div>
        <input
          ref={this.textInput}
          form="fakeForm"
          type="text"
          onKeyUp={this.keyPressed}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

TagsInput.propTypes = {
  placeholder: PropTypes.string,
};
