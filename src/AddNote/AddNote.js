import React, { Component } from  'react';
import ApiContext from '../ApiContext';
import config from '../config';

class AddNote extends Component {
    static contextType = ApiContext;

    state = {
        name: '',
        content: '',
        folderid: 1
    }

    handleChangeNoteName = (e) => {
        this.setState({ name: e.target.value});
    }

    handleChangeNoteContent = (e) => {
        this.setState({ content: e.target.value});
    }

    handleChangeNoteFolder = (e) => {
        this.setState({ folderid: Number(e.target.value)});
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const newNote = {
            name: this.state.name,
            content: this.state.content,
            folderid: this.state.folderid,
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
            console.error(error)
            this.setState({ error })
        })
    }

    render() {
        return (
            <section className='AddnoteForm'>
                <form 
                onSubmit={this.handleSubmit}
                >
                <h2>Add Note</h2>
                <label htmlFor="addnotename" className="add-note-label">Note Name</label>
                    <input type="text" id="addnotename" name="addnotename" 
                    onChange={this.handleChangeNoteName}
                    /><br/><br/>
                    <label htmlFor="folderid">Folder ID</label><br/>
                    <input name="folderid" id="folderid" onChange={this.handleChangeNoteFolder} /><br/><br/>

                    <label htmlFor="noteContent">Content</label><br/>
                    <textarea
                        name="noteContent"
                        id="noteContent"
                        onChange={this.handleChangeNoteContent}/><br/><br/>

                <button type="submit" className="button">Add note</button>
                </form>
            </section>

        );
    }
}

export default AddNote;