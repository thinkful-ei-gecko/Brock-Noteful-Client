import React, { Component } from  'react';
import PropTypes from 'prop-types';
import ApiContext from '../ApiContext';
import config from '../config';
import NotefulForm from '../NotefulForm/NotefulForm';

class AddFolder extends Component {

    handleSubmit = (note, callback) => {
        this.setState({error: null})
        fetch(config.API_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok)
            return res.json().then(error => Promise.reject(error))
            return res.json
        })
        .then(data => {
            callback(data)
            this.context.addNote(data)
            this.props.history.push('/')
        })
        .catch(error => {
            console.error(error)
            this.setState({ error })
        })
    }
    
    render() {
        return (
            <section className='AddFolder'>
                <h2>Add Folder</h2>
                <NotefulForm 
                onSubmit={this.handleSubmit}
                />
            </section>
        );
    }
}

export default AddFolder;