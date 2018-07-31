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
            message: null,
            helpMessage:false,
            hits: 0,
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
        axios.post(`${process.env.API_URL}/api/v1/shorten`, {
            url: this.state.url
        }).then((response) => {
            this.setState({
                shortUrl:response.data.short,
                showModal: true,
                message:response.data.message,
                hits: response.data.hits,
            });
        }).catch((error) => {
            // error handling
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
            <h2>Fujitora</h2>
            <p>URL Shortener</p>
            <div className='row flex-center'>
                    <div className="col sm-10">
                        <div className="form-group">
                            <div className="collapsible">
                                <input id="collapsible1" type="checkbox" name="collapsible" />
                                    <label htmlFor="collapsible1"><i className='fa fa-question-circle'/></label>
                                    <div className="collapsible-body">
                                        <span>A valid url is in the form `http://foo.com`</span>
                                    </div>
                            </div>
                            <input onChange={this.handleChange}
                                   id="input_url"
                                   className="input-block" type="url"
                                   placeholder='Type your url here'
                                   />
                        </div>
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
                    <h5 className="modal-subtitle">{this.state.message}</h5>
                    <h6> Hits: {this.state.hits}</h6>
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
        )
    }
}

export default Body;
