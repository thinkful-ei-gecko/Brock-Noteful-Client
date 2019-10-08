import React, { Component } from  'react';
import PropTypes from 'prop-types';
import ApiContext from '../ApiContext';
import config from '../config';

class AddNote extends Component {

    static propTypes = {
        history: PropTypes.shape({
          push: PropTypes.func,
        }).isRequired,
      };

    static contextType = ApiContext;

    state = {
        error: null,
    }

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
        const { error } = this.state
        return (
            <section className='AddNote'>
                <h2>Add Note</h2>
                <NoteForm 
                error={error}
                onSubmit={this.handleSubmit}

                />
            </section>
        );
    }
}

export default AddNote;