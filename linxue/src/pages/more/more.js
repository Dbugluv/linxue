import Taro, { Component, getApp } from '@tarojs/taro'
import { View, Text,Image} from '@tarojs/components'
import './more.scss'
import Articlelist from '../../components/articlelist/articlelist'

import loginfalse from '../../asset/images/loginfalse.png'
import img5 from '../../asset/images/icon8.jpg'

import { AtButton, AtTabs, AtTabsPane ,AtForm, AtInput } from 'taro-ui'
import { set as setGlobalData, get as getGlobalData } from '../../global_data'


export default class More extends Component {
  config = {
    navigationBarTitleText: '我的'
  }
  constructor(){
    super()
    
    this.state = {
      img:loginfalse,
      login_state:'false',
      login_tip: '登录 / 注册',
      currentNavtab: 0,
      categoryList: ['我的收藏', '最近浏览', '中国知网'],
      article:[],
      zhiwang:[],
    }
  }

  componentWillMount() {

  } 

  componentDidShow () {
    if(getGlobalData("userinfo")!==undefined){
      console.log('userinfo:'+getGlobalData("userinfo"));
      this.setState({
        login_state:'true',
        login_tip: getGlobalData("userinfo"),
      },()=>{
        console.log('login_state:'+this.state.login_state);
        console.log('login_tip:'+this.state.login_tip);
      })
      
      if(this.state.login_tip!='登录 / 注册'&&this.state.login_state=='true'){
        console.log('login_state:'+this.state.login_state);
        Taro.request({
          url: `https://easy-mock.com/mock/5d35c4805456a226d2d3bd87/exam/login`
        }).then(res => {
          
          if(res.data.success) {
            res.data.user.star.map((item,index)=>{
              this.state.article.push(item);
            })
            res.data.user.zhiwang.map((item,index)=>{
              this.state.zhiwang.push(item);
            })           
          }
        })
      }
    }    
  }

  switchTab(index,e) {
    this.setState({
      currentNavtab: index
    })
  }
  navigateTo(url) {
    Taro.navigateTo({
      url:url
    })
  }

  render () {
    return (
      <View className='more'>
        <View className='user'>
          <View className='user_img'>
            <Image className='userinfo-avatar' src={loginfalse} backgroundSize='cover'></Image>
          </View>
          <View className='username'>
            <Text className='user_tips'
              onClick={this.navigateTo.bind(this,'/pages/userpage/userpage')}
            >{login_tip}</Text>
          </View>
        </View>

        <View className='my'>
          <View className='top-tab flex-wrp flex-tab ' >
          {/* 状态栏 */}
          {
            this.state.categoryList.map((item,index) => {
              return (<View className={this.state.currentNavtab === index ? 'top-tab flex-item active' : 'top-tab flex-item' } 
              key={index} onClick={this.switchTab.bind(this,index)}>
                {item}
              </View>)
            })
          }
          </View>
          {/* 文章栏 */}
        <View className='article'>
          <ScrollView scroll-y className='article_list'>
            <View className='ctnt0' hidden={this.state.currentNavtab == 0 ? false : true}>
            { this.state.article.map((item,index)=>{
                return (
                  <View>
                  <Articlelist
                    title={item.title}
                    summary={item.summary}
                  />
                  </View>
                )
              })
            }          
            </View>
            <View className='ctnt0' hidden={this.state.currentNavtab == 1 ? false : true}>
            { this.state.zhiwang.map((item,index)=>{
                return (
                  <View>
                  <Articlelist
                    title={item.title}
                    summary={item.summary}
                  />
                  </View>
                )
              })
            }          
            </View>
          </ScrollView>

        </View>   

        
        </View> 
      </View>
    )
  }
}

