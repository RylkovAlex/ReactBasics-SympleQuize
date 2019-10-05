import React, {Component} from 'react';
import classes from './Layout.module.css';
import MenuToggle from '../../components/Navigations/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigations/Drawer/Drawer'

class Layout extends Component {
  state = {
    menu: false
  }
  toggleMenuHandler = () => {
    this.setState ({
      menu: !this.state.menu
    })
  }

  render() {
    return (
    <div className = {classes.Layout}>
      <Drawer
        isOpen = {this.state.menu}
      />

      <MenuToggle
        onToggle = {this.toggleMenuHandler}
        isOpen = {this.state.menu}
      >
      </MenuToggle>
      <main>
        {this.props.children}
      </main>
    </div>
    )
  }
}

export default Layout;
