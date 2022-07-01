<template>
  <InputBox :type="isPasswordShown ? 'text' : 'password'">
    <template #icon>
      <div class="password-text-hidden-switcher" @click="togglePasswordShown">
        <IconBase
          :width="24"
          :height="24"
          viewBox="0 0 24 24"
          icon-color="black"
        >
          <IconShowInfo v-if="isPasswordShown" />
          <IconHideInfo v-else />
        </IconBase>
      </div>
    </template>
  </InputBox>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import InputBox from '@/components/InputBox.vue';
import IconHideInfo from './icons/IconHideInfo.vue';
import IconShowInfo from '@/components/icons/IconShowInfo.vue';
import IconBase from '@/components/icons/IconBase.vue';

const isPasswordShown = ref(false);

function togglePasswordShown() {
  isPasswordShown.value = !isPasswordShown.value;
}
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

.password-text-hidden-switcher {
  position: absolute;
  top: 15px;
  right: 14px;
}
</style>
