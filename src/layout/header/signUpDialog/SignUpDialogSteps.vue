<template>
  <div class="steps-wrapper">
    <hr class="completed-steps" :style="{ flexGrow: completedRate }" />
    <hr :style="{ flexGrow: uncompletedRate }" />
    <template v-for="index of totalSteps" :key="index">
      <span
        v-if="currentStep > index"
        class="step-node"
        :style="{ left: `${getLeftRate(index)}%` }"
      >
        <IconBase
          :width="15"
          :height="15"
          viewBox="0 0 15 15"
          icon-color="#ffd335"
        >
          <IconCircle />
        </IconBase>
      </span>
      <span
        v-if="currentStep === index"
        class="step-node"
        :style="{ left: `${getLeftRate(index)}%` }"
      >
        <IconBase
          :width="15"
          :height="15"
          viewBox="0 0 15 15"
          icon-color="#ffd335"
        >
          <IconCircle />
        </IconBase>
        <IconBase
          :width="9"
          :height="9"
          viewBox="0 0 15 15"
          icon-color="#323232"
        >
          <IconCircle />
        </IconBase>
      </span>
      <span
        v-if="currentStep < index"
        class="step-node"
        :style="{ left: `${getLeftRate(index)}%` }"
      >
        <IconBase
          :width="15"
          :height="15"
          viewBox="0 0 15 15"
          icon-color="#9e9e9e"
        >
          <IconCircle />
        </IconBase>
        <IconBase
          :width="9"
          :height="9"
          viewBox="0 0 15 15"
          icon-color="#323232"
        >
          <IconCircle />
        </IconBase>
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, computed, toRefs } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconCircle from '@/components/icons/IconCircle.vue';

const props = withDefaults(
  defineProps<{
    totalSteps: number;
    currentStep: number;
  }>(),
  {
    totalSteps: 3,
    currentStep: 1,
  }
);

const { totalSteps, currentStep } = toRefs(props);

const totalRate = computed(() => totalSteps.value * 2);
const completedRate = computed(() => (currentStep.value - 1) * 2 + 1);
const uncompletedRate = computed(() => totalRate.value - completedRate.value);

function getLeftRate(index: number) {
  return ((1 + (index - 1) * 2) / totalRate.value) * 100;
}
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

.steps-wrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 35px;
  padding: 0;
  hr {
    margin: 0;
    border: 2px solid #9e9e9e;
    border-radius: 2px;

    &.completed-steps {
      border-color: #ffd335;
    }
  }
  .step-node {
    position: absolute;
    transform: translateX(-50%);

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  @include mobile {
    height: 12px;
  }
}
</style>
