<template>
  <div class="top-sub">
	  <!-- http://fontawesome.dashgame.com/ 查图标 -->
	<!--	<div class="sub-1">
			<ul class="channels">
				<li class="channel">
          <a href="http://www.firemail.wang:8088/face/" target="_blank">
  					<i class="fa fa-envelope-o fa-fw sub-icon"></i>
            <p class="channel-txt">
  					      firemail
            </p>
          </a>
				</li>
				<div class="line-vertical">
				</div>
				<li class="channel">
          <a href="http://www.firemail.wang:8088/forum.php?gid=68" target="_blank">
  					<i class="fa fa-university fa-fw sub-icon"></i>
            <p class="channel-txt">
  					       春晖学府
            </p>
          </a>
				</li>
				<div class="line-vertical">
				</div>
				<li class="channel">
          <a href="http://www.firemail.wang:8088/forum.php?mod=forumdisplay&fid=340" target="_blank">
  					<i class="fa fa-television fa-fw sub-icon"></i>
            <p class="channel-txt">
  					       树莓派
            </p>
          </a>
				</li>
				<div class="line-horizontal">
				</div>
				<div class="line-horizontal">
				</div>
				<div class="line-horizontal">
				</div>
				<li class="channel">
          <a href="http://www.firemail.wang:8088/forum.php?gid=74" target="_blank">
  					<i class="fa fa-weixin fa-fw sub-icon"></i>
            <p class="channel-txt">微信服务</p>
          </a>
				</li>
				<div class="line-vertical">
				</div>
				<li class="channel">
          <a href="http://www.firemail.wang:8088/forum.php?gid=291" target="_blank">
  					<i class="fa fa-male fa-fw sub-icon"></i>
  					<p class="channel-txt">
  					  人工智能
  					</p>
          </a>
				</li>
				<div class="line-vertical">
				</div>
				<li class="channel">
          <a href="http://www.firemail.wang:8088/forum.php?gid=98" target="_blank">
  					<i class="fa fa-sitemap fa-fw sub-icon"></i>
            <p class="channel-txt">
    					网站建设
            </p>
          </a>
				</li>
			</ul>
		</div> -->
		<ul class="subs">
			<li>
				<a href="http://www.firemail.wang:8088/face/" class="sub-item sub-2" target="_blank">
					<img :src="imageUrlFiremailSmall" alt="" />
				</a>
			</li>
			<li>
				<a href="http://firemail.wang/single_wyyt.html" class="sub-item sub-3" target="_blank">
					<img :src="imageUrlCheduSmall" alt="" />
				</a>
			</li>
			<li>
				<a href="http://firemail.wang/single_doraemon.html" class="sub-item sub-4" target="_blank">
					<img :src="imageUrlRaspberryPiSmall" alt="" />
				</a>
			</li>
			<li>
				<a href="http://firemail.wang/single_chxf.html" class="sub-item sub-2" target="_blank">
					<img :src="imageUrlDianduSmall" alt="" />
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
import img_firemail_small from '@/assets/portal_images/firemail_small.jpg'
import img_chedu_small from '@/assets/portal_images/chedu_small.jpg'
import img_RaspberryPi_small from '@/assets/portal_images/RaspberryPi_small.jpg'
import img_diandu_small from '@/assets/portal_images/diandu_small.jpg'
//  
export default {
	data () {
		return {
			 imageUrlFiremailSmall: img_firemail_small,
			 imageUrlCheduSmall: img_chedu_small,
			 imageUrlRaspberryPiSmall: img_RaspberryPi_small,
			 imageUrlDianduSmall: img_diandu_small
		}
	},
	methods: {
		evtSubEnter (selector) {
		}
	}
}
</script>

<style scoped>
.top-sub {
	position: relative;
	width: 1226px;
	height: auto;
	margin: 14px auto 26px;
}
.sub-1 {
	float: left;
	width: 234px;
	height: 170px;
	background: #5f5750;
}
.channels {
	display: flex;
	flex-flow: row wrap;
	justify-content: flex-start;
	align-items: flex-start;
	list-style: none;
	margin: 0;
	padding: 3px;
}

.channels .channel {
    width: 75px;
    height: 82px;
    cursor: pointer;
}

.channels .channel :hover .channel-txt{
    color: #fff;
}

.channels .channel :hover .sub-icon{
    color: #fff;
}

.channels .channel .channel-txt {
    display: block;
    margin: 0;
    width: 75px;
    font-size: 12px;
    text-align: center;
    text-decoration: none;
    color: rgba(255,255,255,0.7);
}

.channels .sub-icon {
    width: 75px;
    height: 24px;
    margin-top: 18px;
    margin-bottom: 5px;
    font-size: 20px;
    color: rgba(255,255,255,0.7);
}

.subs {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	margin: 0;
	padding: 0;
	list-style: none;
}

.subs li {
    width: 316px;
    height: 170px;
    margin-left: 15px;
}

.subs .sub-item {
    display: block;
    transition: all 0.3s;
}

.subs .sub-item  :hover {
    box-shadow: 0 5px 30px #ccc;
}

.subs .sub-item img {
    display: block;
    width: 316px;
    height: 170px;
}

.line-vertical {
	width: 1px;
	height: 60px;
	margin-top: 10px;
	background: rgba(255,255,255,0.1);
}

.line-horizontal {
	width: 60px;
	height: 1px;
	margin: 0 8px;
	background: rgba(255,255,255,0.1);
}
</style>
