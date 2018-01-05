import React, { Component } from 'react';
import validUrl from 'valid-url';
import axios from 'axios';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');


class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validUrl:false,
            url:null,
            shortUrl: null,
            showModal: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleChange(event){
        if (validUrl.isUri(event.target.value)){
            this.setState({
                url: event.target.value,
                validUrl: true,
            });
        }
    };

    handleClick() {
        axios.post('/api/v1/shorten', {
            url: this.state.url
        }).then((response) => {
            this.setState({
                shortUrl:response.data.short,
                showModal: true,
            });
        }).catch((error) => {
            console.log(error)
        });
        this.setState({
            validUrl: false,
        });
    };

    handleCloseModal() {
        this.setState({
            validUrl:false,
            url:null,
            shortUrl: null,
            showModal: false
        });
    };

    render() {
        return(
        <div className='container'>
                <div>
                     <h2 className='title'>Fujitora</h2>
                </div>
                <div className='row flex-center'>
                    <div className="col sm-12">
                        <div className="form-group">
                            <input onChange={this.handleChange}
                                   className="input-block" type="url"
                                   placeholder='Type your url here'
                                   />
                        </div>
                    </div>
                    <button className="btn-large" onClick={this.handleClick} disabled={!this.state.validUrl}>Shrink!</button>
                    <ReactModal
                        isOpen={this.state.showModal}
                    >
                        <p>{this.state.shortUrl}</p>
                        <button onClick={this.handleCloseModal}>Close Modal</button>
                    </ReactModal>
                </div>
            </div>
        )
    }
}

export default Body;