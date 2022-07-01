<template>
  <component
    :is="component"
    class="button"
    :class="[
      color,
      disabled ? 'disabled' : '',
      size,
      variant,
      actived ? 'actived' : '',
    ]"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue';

export type ButtonColor = 'primary' | 'success' | 'disabled';
export type ButtonSize =
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'huge'
  | 'spare'
  | 'my-rewards'
  | 'transfer';

export type ButtonVariant =
  | ' '
  | 'outlined'
  | 'rounded-outlined'
  | 'darken-outlined'
  | 'rounded'
  | 'block'
  | 'darken-rounded';
export type ButtonComponent = 'button' | 'label' | 'a';

export interface ButtonProps {
  color?: ButtonColor;
  component?: ButtonComponent;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  actived?: boolean;
}

withDefaults(defineProps<ButtonProps>(), {
  color: 'primary',
  component: 'button',
  disabled: false,
  fullWidth: false,
  size: 'medium',
  variant: ' ',
  actived: false,
});
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints';

.button {
  box-sizing: border-box;
  border-radius: 5px;
  color: var(--text-primary);
  font-weight: var(--text-bold);
  text-align: center;
  white-space: nowrap;

  // color
  &.primary {
    border: 1px solid var(--primary-color);
    background: linear-gradient(180deg, #f0c879 0%, #a8772b 100%);

    &:hover {
      border: 1px solid #edcc5a;
      background: #edcc5a;
    }

    &:active {
      border: 1px solid #9c7c45;
      background: #9c7c45;
    }
  }

  &.disabled {
    border: 1px solid #9e9e9e;
    background: #9e9e9e;
    color: #e0e0e0;
    pointer-events: none;
  }

  &.success {
    border: 1px solid var(--success-color);
    background: var(--success-color);

    &:hover:enabled,
    &:active:enabled {
      border: 1px solid var(--success-color);
      background: var(--success-color);
    }
  }

  // size
  &.tiny {
    height: 40px;
    padding: 8px 16px;
    font-size: 14px;
    line-height: 18px;
  }

  &.small {
    min-height: 40px;
    padding: 10px 16px;
    font-size: 14px;
    line-height: 18px;

    @include mobile {
      min-width: 80px;
      padding: 8px 16px;
      min-height: 32px;
      font-size: 12px;
      line-height: 16px;
    }
  }

  &.medium {
    min-width: 100px;
    padding: 16px 0;
    font-size: 16px;
    line-height: 20px;

    @include mobile {
      min-width: 80px;
      padding: 11px 0;
      min-height: 32px;
      font-size: 14px;
      line-height: 16px;
    }
  }

  &.large {
    min-width: 100px;
    height: 56px;
    font-size: 16px;
    line-height: 20px;
  }

  &.huge {
    height: 56px;
    padding: 16px 56px;
    font-size: 22px;
    line-height: 24px;
  }

  &.spare {
    min-width: 110px;
    height: 40px;
    padding: 12px;
    font-size: 14px;
    line-height: 16px;
  }

  &.my-rewards {
    width: 100px;
    height: 40px;
    font-size: 16px;
    line-height: 20px;
    @include mobile {
      width: 60px;
      height: 30px;
      font-size: 12px;
      padding: 0;
    }
  }

  &.transfer {
    padding: 12px 16px;
    font-size: 14px;
    min-width: 130px;
    height: 40px;

    @include mobile {
      display: flex;
      justify-content: center;
    }
  }

  //variant
  &.outlined {
    border: 1px solid var(--primary-color);
    background: transparent;
    color: var(--primary-color);

    &:hover:enabled,
    &:active:enabled {
      border: 1px solid var(--primary-color);
      background: transparent;
    }
  }

  &.darken-outlined {
    border: 1px solid var(--primary-color);
    background: var(--secondary-color);
    color: var(--primary-color);

    &:hover:enabled,
    &:active:enabled {
      border: 1px solid var(--primary-color);
      background: var(--secondary-color);
    }
  }
  &.rounded-outlined {
    border: 1px solid var(--primary-color);
    background: transparent;
    color: var(--primary-color);
    border-radius: 100px;

    &:hover:enabled,
    &:active:enabled {
      border: 1px solid var(--primary-color);
      background: transparent;
    }
  }
  &.rounded {
    width: 100%;
    border-radius: 100px;
  }

  &.darken-rounded {
    border: 1px solid var(--primary-color);
    background: var(--secondary-color);
    color: var(--primary-color);
    border-radius: 100px;

    &:hover:enabled,
    &:active:enabled,
    &.actived {
      background: linear-gradient(180deg, #f0c879 0%, #a8772b 100%);
      color: var(--text-primary);
    }
  }

  &.block {
    width: 100%;
  }

  @include mobile {
    &.huge {
      height: 46px;
      padding: 12px 56px;
      font-size: 18px;
      line-height: 20px;
    }

    &.large {
      width: 100%;
      height: 40px;
      padding: 10px;
    }

    &.spare {
      min-width: 84px;
      height: 26px;
      padding: 6px 16px;
      font-size: 10px;
      line-height: 12px;
    }
  }
}
</style>
