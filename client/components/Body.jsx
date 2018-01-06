import React, { Component } from 'react';
import validUrl from 'valid-url';
import axios from 'axios';
import ReactModal from 'react-modal';
import CopyToClipboard from 'react-copy-to-clipboard';

ReactModal.setAppElement('#root');

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        borderColor           : 'grey',
    }
};

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validUrl:false,
            url:null,
            shortUrl: null,
            showModal: false,
            showToast: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.showToast = this.showToast.bind(this);
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
        document.getElementById('input_url').value = '';
        this.setState({
            validUrl:false,
            url:null,
            shortUrl: null,
            showModal: false,
            showToast: false,
        });
    };

    showToast() {
        this.setState({
            showToast: true,
        })
    }

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
                                   id="input_url"
                                   className="input-block" type="url"
                                   placeholder='Type your url here'
                                   />
                        </div>
                    </div>
                    <button className="btn-large" onClick={this.handleClick} disabled={!this.state.validUrl}>Shrink!</button>
                    <ReactModal
                        isOpen={this.state.showModal}
                        style={customStyles}
                        shouldCloseOnOverlayClick={true}
                        onRequestClose={this.handleCloseModal}
                    >
                        <div className='container'>
                            <h5 className="modal-subtitle">Your short URL</h5>
                            <div>
                                <p>{this.state.shortUrl}</p>
                            </div>
                            <CopyToClipboard text={this.state.shortUrl}>
                                <a className="modal-link" href="#" onClick={this.showToast}>Copy</a>
                            </CopyToClipboard>
                            <a className="modal-link" onClick={this.handleCloseModal} href="#">Close</a>
                            { this.state.showToast ? <div className="alert alert-success">Copied!</div> : null}
                        </div>
                    </ReactModal>
                </div>
            </div>
        )
    }
}

export default Body;