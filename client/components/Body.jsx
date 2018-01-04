import React from 'react';


class Body extends React.Component {
    render() {
        return(
            <div className='container'>
                <div>
                     <h2 className='title'>Fujitora</h2>
                </div>
                <div className='row flex-center'>
                    <div className="col sm-12">
                        <div className="form-group">
                            <input className="input-block" type="text" id="paperInputs3" placeholder='Type your url here'/>
                        </div>
                    </div>
                    <button className="btn-large" disabled>Shrink!</button>
                </div>
            </div>
        )
    }
}

export default Body;