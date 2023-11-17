import React from "react";
import './Search.css';

class Search extends React.Component{
    state={title:""}
    onSearchChanged = event => {
        const _title = event.target.value
        this.setState({title:_title, loading: false})
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        try {
          await this.props.onSearch(this.state.title);
        }
        finally {
          this.setState({ loading: false });
        }
      };

    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className='form-control'>
                        <div className="search-title">
                            <label><h1>Explore and Learn with Video Tutorials!</h1></label>   
                        </div>
                     
                     <div className="search-bar">
                        <input 
                            value={this.state.title}
                            onChange={this.onSearchChanged} 
                            id="keyword" 
                            type="text" 
                            placeholder="Search"
                        />
                        <button type="submit" disabled={this.state.loading}>
                            {this.state.loading ? "Searching..." : "Search"}
                        </button>
                    </div>
                    </div>
                </form>
            </div>
            
        )
    }
}

export default Search;