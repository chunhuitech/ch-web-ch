<template>
	<div class="top-banner clearfix">
		<slide :banners="banners"></slide>
	</div>
</template>

<script>
import slide from './common/Slide.vue'
export default {
	data () {
		return {
			banners: [
				{sourceUrl: '//item.mi.com/buyphone/mi5', imgUrl: 'http://i3.mifile.cn/a4/bc62a28f-de64-4eee-853b-36772a97f67e'},
				{sourceUrl: '//item.mi.com/buyphone/hongmi3s', imgUrl: 'http://i3.mifile.cn/a4/ba4939c9-fc0a-4916-bddc-726fa00f7e9b'},
				{sourceUrl: '//item.mi.com/buyphone/mimax', imgUrl: 'http://i3.mifile.cn/a4/9ced2c9e-f685-4918-9b2a-402af2d2039f'},
				{sourceUrl: '//item.mi.com/buyphone/note3', imgUrl: 'http://i3.mifile.cn/a4/f4bee59d-85a5-498f-ae57-a2cabe6aeb5b'},
				{sourceUrl: '//item.mi.com/buymitv/48', imgUrl: 'http://i3.mifile.cn/a4/98fc8a58-c35c-475e-89cb-b8fe1659817f'}
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
