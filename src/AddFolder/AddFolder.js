import React, { Component } from  'react';
import config from '../config';
import ApiContext from '../ApiContext';

class AddFolder extends Component {
    static contextType = ApiContext;

    state = {
        name: '',
    }

    handleChangeFolderName = (e) => {
        this.setState({ name: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const newFolder = {
            name: this.state.name
        }
        const url = `${config.API_ENDPOINT}/folders`;
        const params = {
            method: 'POST',
            body: JSON.stringify(newFolder),
            headers: {
                'content-type': 'application/json'
            }
        }
        console.log(url, params);
        fetch(url, params)
        .then(res => {
            if (!res.ok)
            return res.json().then(error => Promise.reject(error))
            return;
        })
        .then(() => {
            this.context.addFolder(newFolder)
            this.props.history.goBack();
        })
        .catch(error => {
            console.error(error)
            this.setState({ error })
        })
    }

    render() {
        return (
            <section className='AddFolderForm'>
                <form 
                onSubmit={this.handleSubmit}
                >
                <label htmlFor="addfoldername" className="add-folder-label"> Add Folder</label>
                    <input 
                    type="text" 
                    id="addfoldername" 
                    name="addfoldername" 
                    onChange={this.handleChangeFolderName}
                    >
                    </input>
                <button type="submit" className="button">Add Folder</button>
                </form>
            </section>

        );
    }
}

export default AddFolder;