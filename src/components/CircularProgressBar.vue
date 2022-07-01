<template>
  <div class="circle-process">
    <div class="wrapper right">
      <div class="circle rightcircle" :style="rightCircleDeg" />
    </div>

    <div class="wrapper left">
      <div id="leftcircle" class="circle leftcircle" :style="leftCircleDeg" />
    </div>

    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';

const props = defineProps<{ levelRage: number }>();

const initialDeg = -135; // 初始角度為-135度

const rightCircleDeg = computed(() => {
  const ratio = 180 / 50; // 1% 轉動3.6度

  const deg = props.levelRage >= 50 ? 45 : initialDeg + ratio * props.levelRage;

  return `transform: rotate(${deg}deg)`;
});

const leftCircleDeg = computed(() => {
  const ratio = 180 / 50; // 1% 轉動3.6度

  const deg =
    props.levelRage > 50
      ? initialDeg + ratio * (props.levelRage - 50)
      : initialDeg;

  return `transform: rotate(${deg}deg)`;
});
</script>

<style lang="scss" scoped>
.circle-process {
  position: relative;
  width: 49px;
  height: 50px;
}
.circle-process .wrapper {
  width: 25px;
  height: 50px;
  position: absolute;
  top: 0;
  overflow: hidden;
}
.circle-process .right {
  right: 0;
}
.circle-process .left {
  left: 0;
}
.circle-process .circle {
  width: 50px;
  height: 50px;
  border: 2px solid #323232;
  border-radius: 50%;
  position: absolute;
  top: 0;
  //   transform: rotate(-135deg);
}
.circle-process .rightcircle {
  border-top: 2px solid #99c2ec;
  border-right: 2px solid #99c2ec;
  right: 0;
  //   transform: rotate(45deg);
}
.circle-process .leftcircle {
  border-bottom: 2px solid #99c2ec;
  border-left: 2px solid #99c2ec;
  left: 0;
  //   transform: rotate(45deg);
}
</style>
