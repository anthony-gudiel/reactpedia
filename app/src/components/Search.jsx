import React from "react";

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
                        <label><h1>Search</h1></label>
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
                </form>
            </div>
            
        )
    }
}

export default Search;