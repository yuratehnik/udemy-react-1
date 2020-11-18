import React, {Component} from 'react';
import './search-panel.scss';

export default class SearchPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ""
        }
    }

    onUpdateSearch = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onUpdateSearch(term);
    }

    render() {
        return (
            <div className="search-panel d-flex flex-grow-1" >
                <input className="form-control search-input flex-grow-1"
                    placeholder="Поиск по записям"
                    type="text" 
                    onChange={this.onUpdateSearch}/>
            </div>
        )
    }
}