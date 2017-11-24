<template>
	<footer class="footer-wrap">
		<div class="footer">
			<div class="site-info">
				<div class="footer-explan clearfix">
					<!-- <img class="logo-img" :src="imageUrlCh" alt="" /> -->
					<div class="explan-content">
						<ul class="links clearfix">
							<li class="link-item"><a href="http://www.google.cn/">Google</a></li>
                            <li class="link-item"><a href="https://www.baidu.com/" target="_blank">百度</a></li>
							<li class="link-item"><a href="https://github.com/" target="_blank">GitHub</a></li>
							<li class="link-item"><a href="https://developer.mozilla.org/" target="_blank">MDN</a></li>
							<li class="link-item"><a href="https://cloud.tencent.com/" target="_blank">腾讯云</a></li>
							<li class="link-item"><a href="https://www.aliyun.com/" target="_blank">阿里云</a></li>
                            <li class="link-item"><a href="https://cloud.baidu.com/" target="_blank">百度云</a></li>
							<li class="link-item"><a href="http://www.ksyun.com/" target="_blank">金山云</a></li>							
							<!--<li class="link-item"><a href="http://xiaomi.tmall.com/" target="_blank">小米天猫店</a></li>
							<li class="link-item"><a href="http://shop115048570.taobao.com" target="_blank">小米淘宝直营店</a></li>
							<li class="link-item"><a href="http://union.mi.com/" target="_blank">小米网盟</a></li> -->
							<!-- <li class="link-item"><a href="javascript:void(0)">Select Region</a></li> -->
						</ul>
						<p class="explan-txt">
							©<a href="//www.chunhuitech.cn">chunhuitech.cn</a> 粤ICP备15085507号-1 <br/>
                            <!-- http://www.miitbeian.gov.cn/publish/query/indexFirst.action -->
							 Copyright © 2016 - 2017 chunhuitech. All Rights Reserved
						</p>
					</div>
					<!-- <img class="logo-explan logo-explan-first" src="http://privacy-policy.truste.com/privacy-seal/seal?rid=4fc28a8c-6822-4980-9c4b-9fdc69b94eb8" alt="" />
					<img class="logo-explan" src="http://s01.mifile.cn/i/v-logo-2.png" alt="" />
					<img class="logo-explan" src="http://s01.mifile.cn/i/v-logo-1.png" alt="" />
					<img class="logo-explan" src="http://s01.mifile.cn/i/v-logo-3.png" alt="" /> -->
				</div>
				<p class="footer-desc">
					梦想还是要有的，万一实现了呢
				</p>
			</div>
		</div>
	</footer>
</template>

<script>
import img_ch from '@/assets/portal_images/icon-ch.png'

export default {
	data () {
		return {
            imageUrlCh: img_ch
		}
	}
}
</script>

<style>
.footer {
	width: 1226px;
	height: auto;
	margin: 0 auto;
	padding-bottom: 20px;
}


.footer-explan .logo-img{
    float: left;
    width: 57px;
    height: 57px;
}

.footer-explan .explan-content {
    float: left;
    padding-left: 10px;
}

.footer-explan .explan-content .links .link-item {
    float: left;
    padding: 0 5px;
    font-size: 12px;
    color: #757575;
    border-right: 1px solid #757575;
}

.footer-explan .explan-content .links .link-item :nth-last-child(1) {
    border-right: 0;
}

.footer-explan .explan-txt {
    margin: 10px 0 0 5px;
    line-height: 18px;
    font-size: 12px;
    color: #b0b0b0;
}

.footer-explan .explan-txt a {
    text-decoration: none;
    color: #b0b0b0;
}

.footer-explan .explan-txt a :hover {
    color: #ff6700;
}

.footer-explan .logo-explan {
    width: 85px;
    height: 28px;
}
.footer-explan .logo-explan .logo-explan-first {
    margin-left: 50px;
}

.site-info {
	padding: 30px 0;
}

.site-info .footer-desc {
    text-align: left;
    /* text-indent: -9999em; */
    overflow: hidden;
    color: #b0b0b0;
    width: 267px;
    height: 19px;
    margin: 30px auto 0;
    /* background: url('http://s01.mifile.cn/i/slogan2016.png') center center no-repeat; */
}
</style>
