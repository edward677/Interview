<template>
  <div class="Optimization_warp">
    <ol style="text-align: left;">
      <li>
        <p>不用图片。很多时候会使用到很多修饰类图片，其实这类修饰图片完全可以用 CSS 去代替。</p>
      </li>
      <li>
        <p>对于移动端来说，屏幕宽度就那么点，完全没有必要去加载原图浪费带宽。一般图片都用 CDN 加载，可以计算出适配屏幕的宽度，然后去请求相应裁剪好的图片。</p>
      </li>
      <li>
        <p>小图使用 base64 格式</p>
      </li>
      <li>
        <p>将多个图标文件整合到一张图片中（雪碧图）</p>
      </li>
      <li>
        <p>选择正确的图片格式：</p>
        <ul>
          <li>
            <p>对于能够显示 WebP 格式的浏览器尽量使用 WebP 格式。因为 WebP 格式具有更好的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量，缺点就是兼容性并不好</p>
          </li>
          <li>
            <p>小图使用 PNG，其实对于大部分图标这类图片，完全可以使用 SVG 代替</p>
          </li>
          <li>
            <p>照片使用 JPEG</p>
          </li>
        </ul>
      </li>
    </ol>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
