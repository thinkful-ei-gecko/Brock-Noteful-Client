import React, { Component } from  'react';
import ApiContext from '../ApiContext';
import config from '../config';

class AddNote extends Component {
    static contextType = ApiContext;

    state = {
        error: null,
        name: {
          value: '',
          touched: false,
        },
        content: {
          value: '',
          touched: false,
        },
        folderid: {
          value: null,
          touched: false,
        },
      };

    handleChangeNoteName = (e) => {
        this.setState({ name: { value: e.target.value, touched: true}});
    }

    handleChangeNoteContent = (e) => {
        this.setState({ content: { value: e.target.value, touched: true}});
    }

    handleChangeNoteFolder = (e) => {
        this.setState({ folderid: { value: Number(e.target.value), touched: true } });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const newNote = {
            name: this.state.name.value,
            content: this.state.content.value,
            folderid: this.state.folderid.value,
        };
        const params = {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {
                'content-type': 'application/json'
            }
        }
        fetch(`${config.API_ENDPOINT}/notes`, params)
        .then(res => {
            if (!res.ok)
            return res.json().then(error => Promise.reject(error))
            return;
        })
        .then(() => {
            this.context.AddNote(newNote)
            this.props.history.goBack();
        })
        .catch(error => {
            console.error({ error })
        })
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        }
      }
    
      validateContent() {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
          return 'Content is required';
        }
      }
    
      validateFolderId() {
        const folder = this.state.folderid.value;
        if (!folder) {
          return 'Must specify an existing folder';
        }
      }

    render() {
        const { error } = this.state;
        const { folders = [] } = this.context;
        return (
            <section className='AddnoteForm'>
                <form 
                onSubmit={this.handleSubmit}
                >
                <h2>Add Note</h2>
                <label htmlFor="addnotename" className="add-note-label">Note Name</label>
                    <input type="text" id="addnotename" name="addnotename" 
                    onChange={this.handleChangeNoteName}/>
                    {this.state.name.touched && (
                        <div className="error">{this.validateName()}</div>
                    )}<br/><br/>
                <label htmlFor="folderid">Folder ID</label><br/>
                    <select name="folderid" id="folderid" onChange={this.handleChangeNoteFolder}>
                        <option value={''}>Select Folder</option>
                        {folders.map((folder, index) => {
                        return (
                        <option value={folder.id} key={index}>
                            {folder.name}
                        </option>
                        );
                        })}
                    </select><br/><br/>
                    {this.state.folderid.touched && (
                        <div className="error">{this.validateFolderId()}</div>
                    )}
                <label htmlFor="noteContent">Content</label><br/>
                    <textarea
                        name="noteContent"
                        id="noteContent"
                        onChange={this.handleChangeNoteContent}/>
                    {this.state.content.touched && (
                        <div className="error">{this.validateContent()}</div>
                    )}<br/><br/>
                <button type="submit" disabled={ this.validateName() || this.validateFolderId() || this.validateContent()} className="button">Add note</button>
                </form>
            </section>

        );
    }
}

export default AddNote;