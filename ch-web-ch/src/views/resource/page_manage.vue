<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加分页</el-button>
      <div class="innerInput">
        图片基准宽度：<el-input v-model="baseData[0]" placeholder="图片基准宽度"></el-input>
        图片基准高度: <el-input v-model="baseData[1]" placeholder="图片基准高度"></el-input>
        图片页数: <el-input v-model="baseData[2]" placeholder="图片页数"></el-input>
      </div>
      
    </div>
    <div class="content">
      <el-row>
        <el-col :span="4">
          <div class="leftSliderTop">
            <el-upload
              class="upload-demo"
              action=""
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :file-list="fileList"
              :auto-upload="false"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
          <div class="leftSliderBom">
            <el-card class="box-card">
              <div v-for="o in leftBom" :key="o" class="text item">
                <span>{{o +':'+listObj[o]}}</span>
              </div>
            </el-card>
          </div>
         
        </el-col>
        <el-col class="center" :span="20">
          <img ref="img" class="bg_img" :hidden="!imgSrc" :src="imgSrc" />
          <canvas ref="canvas" class="canvas" :height="canvasH" :width="canvasW" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup">
          </canvas>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { fetchList, add, del, mod } from '@/api/sys/user_manage';
export default {
  name: 'page_manage',
  data() {
    return {
      baseData:[1080,810,2],
      fileList:[],
      imgSrc:'',
      canvasH:0,
      canvasW:0,
      input:'',
      leftBom:['left','right','top','width','height'],
      listObj:{
        'left':0,
        'right':0,
        'top':0,
        'width':0,
        'height':0
      },
      drawState:false,
      states: [
          { key: 0, display_name: '正常' },
          { key: 1, display_name: '已删除' }
      ]
    }
  },
  computed:{
    scaleH(){
      return this.canvasH ? this.baseData[1]/this.canvasH : 1
    },
    scaleW(){
      return this.canvasW ? (this.baseData[0]/this.baseData[2])/this.canvasW : 1
    }

  },
  mounted: function() {

  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      this.imgSrc=file.url;
      this.getImgInfo();
    },
    handleFilter() {
    },
    handleCreate() {
    },
    handleChange(file, fileList){
      if(!this.imgSrc){
        this.handlePreview(file)
      }
    },
    getImgInfo(){
      setTimeout(() => {
        this.canvasH=this.$refs.img.clientHeight;
        this.canvasW=this.$refs.img.clientWidth;
      }, 100);
    },
    mousedown(e){
      let canvas=this.$refs.canvas;
      let cxt=canvas.getContext('2d');
      
      this.listObj.left=e.offsetX*this.scaleW;
      this.listObj.top=e.offsetY*this.scaleH;
      cxt.clearRect(0,0,canvas.width,canvas.height);
      this.drawState=true;
    },
    mousemove(e){
      let canvas=this.$refs.canvas;
      let cxt=canvas.getContext('2d');
      let startX=this.listObj.left/this.scaleW;
      let startY=this.listObj.top/this.scaleH;
      if(this.drawState){
          var width=e.offsetX-startX;
          var height=e.offsetY-startY;
          cxt.clearRect(0,0,canvas.width,canvas.height);
          // cxt.beginPath(); 
          // cxt.strokeStyle="#F00";/*设置填充颜色*/ 
          // cxt.strokeRect(startX,startY,width,height);/*绘制一个矩形，前两个参数决定开始位置，后两个分别是矩形的宽和高*/ 
          // cxt.closePath();/*可选步骤，关闭绘制的路径*/ 
          // cxt.stroke(); 

          cxt.beginPath(); 
          cxt.strokeStyle="#F00";/*设置填充颜色*/ 
          cxt.strokeRect(startX,startY,width,height);/*绘制一个矩形，前两个参数决定开始位置，后两个分别是矩形的宽和高*/ 
          cxt.closePath();/*可选步骤，关闭绘制的路径*/ 
          cxt.stroke(); 
          // nowW=width;
          // nowH=height;
      }
    },
    mouseup(e){
      let canvas=this.$refs.canvas;
      let startX=this.listObj.left/this.scaleW;
      let startY=this.listObj.top/this.scaleH;
      this.listObj.right=(this.canvasW-e.offsetX)*this.scaleW;
      this.listObj.width=(e.offsetX-startX)*this.scaleW;
      this.listObj.height=(e.offsetY-startY)*this.scaleH;
      this.drawState=false;
    }
  }
}
</script>
<style scoped>
  .innerInput{
    display: inline-block;
    width: auto;
  }
  .innerInput .el-input{
    width: 100px;
  }
  .content{
    width: 100%;
    height:calc(100vh - 146px);
    position: relative;
  }
  .content .el-row,.content .el-col{
    height: 100%;
  }
  .center{
    text-align: center;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
  }
  .bg_img{
    width: auto;
    height: 100%;
  }
  .canvas{
    position: absolute;
    top:0;
    left: 50%;
    height: 100%;
    transform: translateX(-50%);
  }
  .leftSliderTop{
    height: 60%;
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
  }
  .leftSliderBom{
    height: 40%;
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
  }
  .text {
    font-size: 14px;
  }
  .item {
    line-height: 3;
  }
  .box-card {
    width: 100%;
  }
</style>
