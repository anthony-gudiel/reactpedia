import React from "react";

class Search extends React.Component{
    state={title:""}
    onSearchChanged = event => {
        const _title = event.target.value
        console.log(_title)
        this.setState({title:_title})
    }

    onSubmit = event =>{
        event.preventDefault()
        console.log(this.state.title)
        this.props.onSearch(this.state.title)
    }
    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className='form-control'>
                        <label><h1>Search</h1></label>
                        <input value={this.state.title}
                        onChange={this.onSearchChanged} id="keyword" type="text" placeholder="Search"/>
                    </div>
                </form>
            </div>
            
        )
    }
}

export default Search;