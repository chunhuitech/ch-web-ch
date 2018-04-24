<template>
	<div class="top-banner clearfix">
		<slide :banners="banners"></slide>
	</div>
</template>

<script>
import slide from './common/Slide.vue'
import img_firemail from '@/assets/portal_images/firemail.jpg'
import img_chedu from '@/assets/portal_images/chedu.jpg'
import img_fireshadow from '@/assets/portal_images/fireshadow.jpg'
import img_RaspberryPi from '@/assets/portal_images/RaspberryPi.jpg'
import img_website from '@/assets/portal_images/website.jpg'

export default {
	data () {
		return {
			banners: [
				{sourceUrl: 'http://www.firemail.wang:8088/forum.php?gid=1', imgUrl: img_firemail},
				{sourceUrl: 'http://www.firemail.wang:8088/doraemon/', imgUrl: img_chedu},
				{sourceUrl: 'http://www.firemail.wang:8088/forum.php?gid=194', imgUrl: img_fireshadow},
				{sourceUrl: '//www.firemail.wang:8088/forum.php?mod=forumdisplay&fid=340', imgUrl: img_RaspberryPi},
				{sourceUrl: 'http://www.firemail.wang:8088/forum.php?gid=105', imgUrl: img_website}
			]
		}
	},
	ready () {
	},
	computed: {
	},
	methods: {
	},
	components: {
		slide
	}
}
</script>

<style scoped>
.top-banner {
	position: relative;
	width: 1226px;
	height: auto;
	margin: 0 auto;
}
</style>
