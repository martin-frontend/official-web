<!-- 這裡目前是一個 checkbox + 一個 label 的組合，之後要拆得更細小，
     單獨 checkbox 為一個元件，單獨 label 為一個元件，再用某種選擇器去關聯它們
     參考：https://mui.com/components/checkboxes/ -->

<template>
  <div class="checkbox">
    <input
      :id="props.id"
      type="checkbox"
      :checked="props.modelValue"
      class="checkbox-input"
      @change="checked($event)"
    />
    <label class="checkbox-label" :for="props.id">{{ props.label }}</label>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, defineEmits } from 'vue';

export interface InputProps {
  id?: string;
  label?: string;
  modelValue?: boolean;
}
const props = withDefaults(defineProps<InputProps>(), {
  id: '',
  label: '',
  modelValue: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

function checked(event: Event) {
  emit('update:modelValue', event.target?.checked);
}
</script>

<style lang="scss" scoped>
.checkbox {
  position: relative;
  display: flex;

  .checkbox-label {
    font-size: 14px;
    line-height: 22px;
    color: var(--text-secondary);
  }

  .checkbox-input {
    box-sizing: border-box;
    display: block;
    min-width: 20px;
    min-height: 20px;
    border-radius: 2px;
    overflow: hidden;

    &::after {
      content: none;
      width: 20px;
      height: 20px;
      display: block;
      background: url(../../reference/icons/IconChecked.svg) no-repeat center
        center;
      background-size: cover;
    }

    &:checked {
      &::after {
        content: '';
      }
    }
  }
}

.checkbox-input + .checkbox-label {
  margin-left: 16px;
}
</style>
