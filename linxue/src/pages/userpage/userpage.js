import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image} from '@tarojs/components'
import './userpage.scss'
import login_bg from '../../asset/images/login_bg.gif'
import { AtButton} from 'taro-ui'


export default class Userpage extends Component {
  config = {
    navigationBarTitleText: '登录'
  }

  constructor(props){
    super(props)
    this.state = {
      bg_img : login_bg,
    }
  }

  handleEmailInput(email) {
    this.setState({email})
  }

  navigateTo(url) {
    Taro.navigateTo({
      url:url
    })
  }
  //  微信文档
  // getUserInfo(e) {    
  //   app.onLaunch()    
  //   app.globalData.userInfo = e.detail.userInfo    
  //   Taro.setStorage({      
  //     key: "loginInformation",      
  //     data: e.detail.userInfo    
  //   })      
  //   console.log("首页")    
  //   Taro.switchTab({      
  //     url: '../index/index',    })       
  // }

  render () {
    
    return (
      <View>
        {/* 背景图 */}
        <View className='bg'>
         <Image src={login_bg} className='login_bg'/>
        </View>

        {/* 登陆管理 */}
        <View className='login'>
          <View className='btn'>
            <AtButton formType='submit' type='primary' 
            onClick={this.navigateTo.bind(this,'/pages/login/login')}>登录/注册</AtButton>
          </View>
          <View className='btn'>
            <AtButton open-type="getUserInfo" formType='submit' type='secondary'>微信授权快速登录</AtButton>
          </View>


        </View>

      </View>
    )
  }
}
