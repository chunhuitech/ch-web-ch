<template>
  <header class="top-container">
		<div class="top-bar clearfix">
            <div class="topbar-nav">
				<ul class="nav-wrap">
					<li v-for="item in navs" class="nav clearfix">
                        <template>
                        <a :href="item.sourceUrl" class="nav-name" target="_blank">{{item.name}}</a>
                        </template>
						<span class="nav-separate" v-show="false">|</span>
					</li>
				</ul>
			</div>
			<div class="topbar-info">                
                <!-- <a href="https://open.weixin.qq.com/">
                     <img style="position: relative;top:8px;" :src="imgUrl_WeiXin" alt="weixin">
                 </a>
                <span class="nav-separate" >|</span>
                <a href="https://open.weixin.qq.com/">
                     <img style="position: relative;top:4px;" :src="imgUrl_QQ" alt="qq">
                 </a>
                <span class="nav-separate" >|</span>
				<a href="http://order.mi.com/site/login?redirectUrl=http://www.mi.com/index.html">登陆</a>
				<span class="nav-separate" >|</span>
				<a href="https://account.xiaomi.com/pass/register">注册</a> -->
                <span class="nav-separate" >欢迎光临！</span>
			</div>

		</div>
  </header>
</template>

<script>
import img_qq from '@/assets/portal_images/Connect_logo_qq.png'
import img_weixin from '@/assets/portal_images/QQ-weixin.png'

export default {
    data () {
        return {
            imgUrl_QQ: img_qq,
            imgUrl_WeiXin: img_weixin,
            navs: [
				{name: '论坛', sourceUrl: 'http://www.firemail.wang/forum.php'}
			]
        }
    },
  ready () {
  },
    components: {
    }
}
</script>

<style scoped>

.top-container {
	width: 100%;
	height: 40px;
	background: #333;
}
.top-bar {
	position: relative;
	width: 1226px;
	margin: 0 auto;
	font-size: 12px;
    z-index: 11;
}

.topbar-nav {
	float: left;
	display: inline-block;
	height: 40px;
	line-height: 40px;
	overflow: hidden;
}


.nav-wrap {
	display: inline-block;
	margin: 0;
	padding: 0;
	list-style: none;
}


.nav-wrap .nav {
	display: inline-block;
    text-decoration: none;
    height: 40px;
    line-height: 40px;
    padding-left: 5px;
}

.nav-wrap .nav :hover {
			color: #fff;
}

.nav-wrap .nav .nav-name {
    display: inline-block;
    font-size: 12px;
    color: #b0b0b0;
    text-decoration: none;
}

.nav-wrap .nav .nav-separate {
    display: inline-block;
    color: #b0b0b0;
    margin-left: 5px;
}

.nav-separate {
    display: inline-block;
    color: #b0b0b0;
    margin-left: 5px;
    margin-right: 5px;
}

.topbar-info {
	position: absolute;
	top: 0;
	right: 140px;
	height: 40px;
	line-height: 40px;
}

.topbar-info a {
    color:#b0b0b0;
    text-decoration:none;
}

.topbar-info a:hover {
       color: #fff;
    }

.topbar-info span {
    color: #b0b0b0;
}

</style>
