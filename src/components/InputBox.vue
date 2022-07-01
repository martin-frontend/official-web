<template>
  <div class="p-input-filled">
    <div class="input-container p-float-label">
      <slot name="icon" />
      <input
        :value="modelValue"
        :type="type"
        class="inputBox p-component"
        :class="{
          'error-input': isError,
          'p-inputtext': label,
          'p-filled': modelValue,
        }"
        :placeholder="placeholder"
        :maxLength="maxLength"
        @input="input($event)"
      />
      <label :class="{ 'error-label': isError }">{{ label }}</label>
    </div>
    <p v-show="isError" class="error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, defineEmits, toRefs } from 'vue';

export interface InputProps {
  placeholder?: string;
  modelValue?: string;
  errorMessage?: string;
  isError?: boolean;
  type?: string;
  label?: string;
  maxLength?: number;
}

const props = withDefaults(defineProps<InputProps>(), {
  placeholder: '',
  modelValue: '',
  errorMessage: 'Error message',
  isError: false,
  type: 'text',
  label: '',
  maxLength: 100,
});

const { placeholder, modelValue, errorMessage, type, label, maxLength } =
  toRefs(props);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const input = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.input-container {
  position: relative;
}

.inputBox {
  // min-width: 248px;
  width: 100%;
  box-sizing: border-box;
  height: 56px;
  padding: 8px 16px;
  color: #424242;
  border-radius: 5px;
  border: 1px solid var(--text-primary);
  background-color: var(--text-primary);

  &:focus {
    background-color: #f5f5f5;
    border-color: var(--primary-color);
  }
  &:hover {
    background-color: #f5f5f5;
  }

  @include tablet-h {
    width: 100%;
  }

  @include tablet-v {
    width: 100%;
  }

  @include mobile {
    width: 100%;
  }

  &.error-input {
    border: 1px solid var(--error-color) !important;
  }
}

.error-message {
  padding-left: 10px;
  padding-top: 4px;
  font-size: 12px;
  line-height: 16px;
  color: var(--error-color);
}
.error-label {
  color: var(--error-color) !important;
}
</style>
