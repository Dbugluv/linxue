import Taro, { Component, getApp } from '@tarojs/taro'
import { View, Text,Image} from '@tarojs/components'
import './login.scss'
import login_bg from '../../asset/images/login_bg.gif'
import { AtButton, AtTabs, AtTabsPane ,AtForm, AtInput } from 'taro-ui'
import { set as setGlobalData, get as getGlobalData } from '../../global_data'

export default class Login extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  constructor(props){
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      currentTab: 0,
    }
  }
 

  switchTab(index){
    this.setState({      
      currentTab:index
    })
    this.onReset()
  }

  onReset() {
    this.setState({
      username: '',
      email: '',
      password: '',
    })
  }

  handleUserNameInput(name) {
    this.setState({
      name
    })
  }

  handlePasswordInput(password) {
    this.setState({password:password})
  }

  handleEmailInput(email) {
    this.setState({email})
  }

  switchTab(url) {
    Taro.switchTab({
      url:url
    })
  }
  onSubmit() {
    const pw = this.state.password;
    if(this.state.password !=='' && this.state.password){
    // && this.state.username && this.state.username !== '') {
      
      Taro.request({
        url: `https://easy-mock.com/mock/5d35c4805456a226d2d3bd87/exam/login`
      }).then(res => {
        Taro.hideLoading()
        if(res.data.success) {
          console.log('successdata')
        }else{
          console.log('datafail')
        }
        if( this.state.password == res.data.user.password){
          setGlobalData('userinfo', res.data.user.password);
          this.switchTab('../more/more');
          console.log('密码正确');
        }else{
          console.log(res.data.user.password);
          console.log('密码错误')
        }
      })
      
    }
  
  }

  render () {
    const tabList = [{ title: '登录' }, { title: '注册' }]
    
    return (
      <View>
        {/* 背景图 */}
        <View className='bg'>
         <Image src={login_bg} className='login_bg'/>
        </View>

        {/* 登陆管理 */}
        <View className='login'>
          <AtTabs current={this.state.currentTab} tabList={tabList} onClick={this.switchTab.bind(this)}>
            <AtTabsPane current={this.state.currentTab} index={0} >
              <AtForm onSubmit={this.onSubmit.bind(this)}
                onReset={this.onReset.bind(this)}
              >
                <AtInput name='value' title='用户名' type='text'
                  placeholder='请输入用户名' value={this.state.name}
                  onChange={this.handleUserNameInput.bind(this)}
                />

                <AtInput name='value' title='密码' type='text'
                  placeholder='请输入密码' value={this.state.password}
                  onChange={this.handlePasswordInput.bind(this)}
                />

              <View className='button'>
                <View className='button_submit'>
                  <AtButton formType='submit' type='primary' >提交</AtButton>
                </View>
                <View className='button_submit'>
                  <AtButton formType='reset' type='secondary'>重置</AtButton>
                </View>
              </View>
                  
              </AtForm>
            </AtTabsPane>
            {/* 注册 */}
            <AtTabsPane current={this.state.currentTab} index={1}>
              <View className='login_content' >
              <AtForm onSubmit={this.onSubmit.bind(this)}
                onReset={this.onReset.bind(this)}
              >
                <AtInput name='value' title='用户名' type='text'
                  placeholder='请输入用户名' value={this.state.name}
                  onChange={this.handleUserNameInput.bind(this)}
                />
                <AtInput name='value' title='电子邮箱' type='text'
                  placeholder='请输入电子邮箱' value={this.state.email}
                  onChange={this.handleEmailInput.bind(this)}
                />
                <AtInput name='value' title='密码' type='text'
                  placeholder='请输入密码' value={this.state.password}
                  onChange={this.handlePasswordInput.bind(this)}
                />
                <View className='button'>
                  <View className='button_submit'>
                    <AtButton formType='submit' type='primary' >提交</AtButton>
                  </View>
                  <View className='button_submit'>
                    <AtButton formType='reset' type='secondary'>重置</AtButton>
                  </View>
                </View>

              </AtForm>
              </View> 
            </AtTabsPane>
        </AtTabs>
        </View>

      </View>
    )
  }
}

