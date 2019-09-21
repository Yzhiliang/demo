<template>
  <div id="container-Home">
    <el-container style="height:100%;">
        <!-- 左边布局容器 -->
      <el-aside class="Home-left" :width=wid>
          <div class="left-top">
            <div class="left-ico"></div>
            <div class="left-text" v-show="bool">智学无忧教育</div>
          </div>
          <!-- 收缩导航栏 -->
            <el-menu :default-active="ind" router class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-submenu index="1" >
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>在线测试</span>
                    </template>
                      <el-menu-item-group v-for="(con,index) in test" :key="index">
                        <el-menu-item :index='con.route' @click="addTab(con,index)" >{{con.name}}</el-menu-item>
                        <!-- <i class="el-icon-menu"></i> -->
                      </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>基础数据</span>
                    </template>
                    <el-menu-item-group v-for="(con,i) in basis" :key="i">
                        <el-menu-item :index='con.route' @click="addTab(con)">{{con.name}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
          
      </el-aside>
      <!-- 右边布局容器 -->
      <el-container>
      <!-- 右边顶部 -->
        <el-header>
          <div class="header-content">
            <!-- 点击收缩左边导航栏 -->
              <div @click="LeftShrink()" class="el-icon-caret-left"></div>
              <!-- 右边头部导航条 -->
              <div class="header-top">
                  <el-tabs  type="card" v-model="editableTabsValue" closable @tab-remove="removeTab" @tab-click='tab(editableTabsValue)'>
                    <el-tab-pane v-for="(item) in editableTabs" :key="item.name" :label="item.title" :name="item.name" >
                    </el-tab-pane>
                  </el-tabs>
              </div>
              <!-- 退出登录 -->
              <div class="aside-right">
                <i class="el-icon-s-custom"></i>
                <span class="quit">退出</span>
                <div class="block"><el-avatar :size="40" :src="circleUrl"></el-avatar></div>
              </div>
          </div>
          
        </el-header>
        <!-- 右边底部 -->
        <el-main>
            <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
     data() {
      return {
        isCollapse: false, //左边导航栏的收缩
        bool:true,  //左边头部文字的隐藏和显示
        wid:'',     //左边导航栏菜单的width,赋值为空，具有自适应
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",   //右边标题个人头像图片(灰色的)
        editableTabsValue: 'Home', //路由
        tabIndex: 1,  //
        sum:[],     //用一个空数组接收name
        ind:'',     //下标
        //左边导航栏，在线测试
         test:[
            {name:"老师出卷",route:'TestSetter',id:0},
            {name:'试卷管理',route:'TestPaperManage',id:1},
            {name:'安排测试',route:'MakeTestPaper',id:2},
            {name:'批阅试卷',route:'ViewTestPaper',id:3},
            {name:'测试成绩',route:'TestResult',id:4}  
          ],
          //左边导航栏，基础数据
          basis:[
            {name:'班级管理',route:'ClassManage',id:0},
            {name:'学生管理',route:'StudentManage',id:1},
            {name:'老师管理',route:'TeacherManage',id:2},
            {name:'修改密码',route:'ModifyPassword',id:3}
          ],
        //
        editableTabs: [
            {
              title:"首页",
              name:'Home'
            }
        ]
        
      };
    },
    methods: {
      // tabs切换
      tab(index){
        this.ind=index
        this.$router.push("/"+index)
      },

      // 左边导航栏收缩
      LeftShrink(){
        this.isCollapse=!this.isCollapse
        if(this.isCollapse){
          this.bool=false
        }else{
          this.bool=true
        }
      },
      // 左边导航栏的点击事件
       addTab(targetName,index) {
        //  console.log(document.getElementById('ico'+index+''))
         this.editableTabsValue=targetName.route
        // 判断点击过的名称是否重复
         for(var i=0;i<this.sum.length;i++){
           if(this.sum[i]==targetName.name){
              return
           }
         }
         this.sum.push(targetName.name)

        this.editableTabs.push({
          title: targetName.name,
          name:targetName.route
        });
      },
      // tabs头部导航栏关闭事件
       removeTab(targetName) {
        let tabs = this.editableTabs;
        // console.log(targetName)//关闭的下标
        // console.log(tabs) //关闭时返回数组
        let activeName = this.editableTabsValue
        // console.log(activeName) //返回数组长度
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
                this.$router.push(nextTab.name);
                this.ind=nextTab.name
                // console.log(tabs)
                // this.editableTabs.splice(index,1)
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    }
};
</script>

<style scoped>
/* 最大父框架 */
#container-Home{
    height:100%;
}
/* 左边收缩导航栏 */
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.el-menu{border: 0px;}

/* 左边导航栏字体颜色 */
.el-icon-menu{
  color: white;
}
/* 左边导航栏 */
.el-aside{height: 100%;}
.el-header{
  padding: 0px;
  position: relative;
}
.el-main{
  padding: 0px;
  height: 90.8%;
}
.el-menu-vertical-demo{
  height: 91%;
}
/* 左边导航栏头部 */
.left-top{
  height: 9%;
  background-color: #FFEB3A;
  overflow: hidden;
  position: relative;
}
/* 左边头像图标 */
.left-ico{
  box-shadow: 0px 0px 10px 2px green;
  border-radius: 50%;
  background: url('../assets/favicons .jpg') 0px 2px no-repeat;
  background-size: 100%;
  height: 37px;
  width: 37px;
  margin-left: 10px;
  margin-top: 10px;
  display: inline-block;
  vertical-align: middle;
}
/* 左边头部的文字 */
.left-text{
  color: #27A27C;
  font-size: 18px;
  font-weight: bold;
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
}
/*布局容器的父框架 */
.el-container{
    height: 100%;
}

/* 左边图标田字 */
.el-submenu__title *{
  vertical-align: top;
}

.el-icon-menu{
  margin-bottom: 2px;
}

/* 右边顶部框架 */
.el-header{
    border-bottom: 1px solid #ccc;
}
.header-middle{
  display: flex;
}
.el-icon-caret-left{
  color: white;
  background-color: #008181;
  width: 30px;
  font-size: 30px;
  padding-top: 15px;
  vertical-align: middle;
}
.header-content{
  height: 100%;
  display: flex;
}
/deep/ .aside-right{
  width: 120px;
  vertical-align: middle;
  margin-top: 10px;
  margin-left: 10px;
}
.block{
  display: inline-block;
}
.quit{vertical-align: top;display: inline-block;margin-top: 12px;color: #666;font-size: 15px;margin-left: 6px;margin-right: 15px;}
.el-icon-s-custom{vertical-align: top;margin-top: 14px;font-size: 17px;color: #666;}
/* 右边顶部 */
.header-top{
  flex: 1;
  overflow: hidden;
  margin-top: 19px;
  margin-left: 15px;
}
/deep/ .el-tabs--card>.el-tabs__header{
  border: 0px;
}
</style>
