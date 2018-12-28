<template>
  <div >
    <top-bar></top-bar>
    <top-header></top-header>
    <top-banner></top-banner>
    <top-sub></top-sub>
    <temp-footer></temp-footer>
  </div>
</template>

<script>
import TopBar from '@/components/portalLayout/TopBar'
import TopHeader from '@/components/portalLayout/TopHeader'
import TopBanner from '@/components/portalLayout/TopBanner'
import TopSub from '@/components/portalLayout/TopSub'
import TempFooter from '@/components/portalLayout/TempFooter'

export default {
  components: {
    'top-bar': TopBar,
    'top-header': TopHeader,
    // 'top-banner': TopBanner,
    // 'top-sub': TopSub,
    'temp-footer': TempFooter
  }
}
</script>

<style>
@import '../../styles/portalCss/base.css';

</style>