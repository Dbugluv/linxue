import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import 'taro-ui/dist/style/index.scss'

import './app.scss'

class App extends Component {

  config = {
    pages: [
      'pages/more/more',
      'pages/discovery/discovery',
      'pages/userpage/userpage',
      'pages/login/login',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'taro知乎',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh:true
    },
    tabBar:{
      color:'#626567',
      selectedColor:'#2A8CE5',
      backgroundColor:'#FBFBFB',
      borderStyle:'white',
      list:[
        {
          pagePath:"pages/discovery/discovery",
          text:"发现",
          iconPath:"./asset/images/discovery.png",
          selectedIconPath:"./asset/images/discovery_focus.png"
        },
        {
          pagePath:"pages/more/more",
          text:"我的",
          iconPath:"./asset/images/burger.png",
          selectedIconPath:"./asset/images/burger_focus.png"
        },
      ]
    }
    
  }

  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
