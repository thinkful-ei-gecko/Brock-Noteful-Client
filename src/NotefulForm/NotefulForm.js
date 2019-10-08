import React, { Component } from 'react'
import './NotefulForm.css'

class NotefulForm extends Component {
  //const { className, ...otherProps } = props;

  state = {
    id: this.props.folder.id || undefined,
    name: this.props.folder.name || '',
  };

  render() {
  const { name } = this.state
    return (
      <form
        className='Noteful-form'
        action='#'
        onSubmit={this.handleSubmit}
      >
        <div>
          <label htmlFor='name'>
            Name
            {' '}
          </label>
          <input
            type='text'
            id='folder-name'
            placeholder='Folder Name Here!'
            required
            value={name}
            onChange={this.handleChangeTitle}
          />
        </div>
      </form>
    )
  }
}

export default NotefulForm;