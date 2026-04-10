import React, { Component } from 'react'
import logo from '../assets/images/test.png'
import {Home } from 'lucide-react';
import { Archive } from 'lucide-react';
import { NotebookText } from 'lucide-react';
import{BookOpenCheck } from 'lucide-react';
import { LogOut }   from 'lucide-react';

import './navbar.css'

export class Navbar extends Component {
  render() {
    return (
        <div className="dash vh-100">
        <div className='d-flex'><img src={logo} className="profile"/>
        <h6 className='mt-3'>TestFlow</h6></div>
        <ul className='sections'>
            <li className='list'> <Home className=' pe-2'/>Home </li>
             <li className='list'><Archive className=' pe-2'/>History</li>
             <li className='list'><NotebookText className=' pe-2'/>Courses</li>
             <li className='list'><BookOpenCheck className=' pe-2'/>Take Exams</li>
             <li className='list'><LogOut className=' pe-2'/>LogOut</li>
        </ul>
        </div> 
      
           
    )
  }
}

export default Navbar
