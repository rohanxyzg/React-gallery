import React, {Component} from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import SearchForm from './SearchForm'
class Nav extends Component{
    handleRoute = text=>{
        this.props.history.push(`/search/${text}`);
    }
    render(){
        return(
            <div>
                <nav className="main-nav">
                    <SearchForm onSubmit={this.handleRoute}/>
                    <ul>
                        <li><NavLink to={"/bottles"}>Bottles</NavLink></li>
                        <li><NavLink to={"/phones"}>Phones</NavLink></li>
                        <li><NavLink to={"/cats"}>Cats</NavLink></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default withRouter(Nav);