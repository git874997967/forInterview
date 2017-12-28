import  React, {Component} from 'react'
import './header.css'
import logo from '../logo.svg'


class Header extends Component{
    render(){
        return (
            <div className="components-header row">
                <img src={logo} alt='logo' width='40' />
                <h2 className='caption'>
React Music Player
                </h2>
            </div>
        )
    }
}
export  default  Header;
