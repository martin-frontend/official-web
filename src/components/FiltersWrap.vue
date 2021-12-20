<template>
  <div class="filters-wrap">
    <div v-show="isShow" class="filters-wrap-group">
      <slot />
    </div>
    <div v-show="isDateShown" class="filters-wrap-group date-group">
      <FiltersWrapItem>
        <div class="p-input-filled">
          <div class="p-float-label p-input-icon-left">
            <Calendar
              :model-value="startTime"
              :min-date="dateLimits && dateLimits.minDate"
              :max-date="dateLimits && dateLimits.maxDate"
              date-format="yy-mm-dd"
              @date-select="updateStartTime"
            />
            <label>{{ t('common.start_date') }}</label>
            <IconBase>
              <IconCalendar />
            </IconBase>
          </div>
        </div>
      </FiltersWrapItem>
      <FiltersWrapItem>
        <div class="p-input-filled">
          <div class="p-float-label p-input-icon-left">
            <Calendar
              :model-value="endTime"
              :min-date="dateLimits && dateLimits.minDate"
              :max-date="dateLimits && dateLimits.maxDate"
              date-format="yy-mm-dd"
              @date-select="updateEndTime"
            />
            <label>{{ t('common.end_date') }}</label>
            <IconBase
              :width="18"
              :height="18"
              viewBox="0 0 18 18"
              icon-color="var(--primary-color)"
            >
              <IconCalendar />
            </IconBase>
          </div>
        </div>
      </FiltersWrapItem>
    </div>

    <div class="line" />

    <div class="filters-wrap-group">
      <FiltersWrapItem>
        <Button
          component="button"
          color="primary"
          size="large"
          class="search-button"
          @click="clikcSearch"
        >
          {{ t('common.search') }}
        </Button>
      </FiltersWrapItem>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Calendar from 'primevue/calendar';
import {
  withDefaults,
  defineProps,
  defineEmits,
  toRefs,
  computed,
  useSlots,
} from 'vue';
import { useI18n } from 'vue-i18n';
import Button from '@/components/Button.vue';
import FiltersWrapItem from './FiltersWrapItem.vue';
import IconBase from './icons/IconBase.vue';
import IconCalendar from './icons/IconCalendar.vue';

interface DateLimits {
  minDate: Date;
  maxDate: Date;
}

interface FilterWrapProps {
  dateLimits?: DateLimits | undefined;
  endTime: Date;
  startTime: Date;
  isDateShown?: boolean;
}

// use i18n
const { t } = useI18n();

const slots = useSlots();

const props = withDefaults(defineProps<FilterWrapProps>(), {
  dateLimits: undefined,
  isDateShown: true,
});

const isShow = computed(() => {
  return slots.default;
});

const emit = defineEmits<{
  (e: 'update:endTime', value: Date): void;
  (e: 'update:startTime', value: Date): void;
  (e: 'handleSearch'): void;
}>();

const clikcSearch = () => {
  emit('handleSearch');
};

const updateStartTime = (value: Date) => {
  emit('update:startTime', value);
};

const updateEndTime = (value: Date) => {
  emit('update:endTime', value);
};

const { dateLimits, endTime, startTime } = toRefs(props);
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.filters-wrap {
  display: flex;
  margin-bottom: 24px;
  flex-direction: column;

  @include tablet-h {
    flex-direction: row;
  }

  @include desktop {
    flex-direction: row;
  }

  .filters-wrap-group {
    display: flex;
    flex-direction: column;
    flex: 1;
    &.date-group {
      flex-direction: row;
    }

    @include tablet-h {
      flex-direction: row;
      flex: none;
    }

    @include desktop {
      flex-direction: row;
      flex: none;
    }

    &:last-child {
      flex: none;
    }
  }
}

.line {
  margin: 5px;
  border: none;
  height: 1px;
  background: var(--primary-color);
}

.search-button {
  width: 100%;
  margin-left: 0;

  @include tablet-h {
    width: 100px;
  }

  @include desktop {
    width: 100px;
  }
}
</style>
