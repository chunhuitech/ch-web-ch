<template>
  <div >
    <top-bar></top-bar>
    <top-header></top-header>
    <top-banner></top-banner>
    <top-sub></top-sub>
  </div>
</template>

<script>
import TopBar from '@/components/portalLayout/TopBar'
import TopHeader from '@/components/portalLayout/TopHeader'
import TopBanner from '@/components/portalLayout/TopBanner'
import TopSub from '@/components/portalLayout/TopSub'

export default {
  components: {
    'top-bar': TopBar,
    'top-header': TopHeader,
    'top-banner': TopBanner,
    'top-sub': TopSub
  }
}
</script>

<style>
@import '../../styles/portalCss/base.css';

</style>