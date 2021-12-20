<template>
  <table class="grid-table">
    <thead>
      <tr>
        <th>{{ 'Event Id' }}</th>
        <th>{{ 'Event Name' }}</th>
        <th>{{ 'Accepted Date Time' }}</th>
        <th>{{ 'Bonus' }}</th>
        <th>{{ 'Due Date Time' }}</th>
        <th>{{ 'Progress' }}</th>
        <th>{{ 'Detail' }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!userEvents.length">
        {{
          `You don't have any ${
            isCompletedEvents ? 'completed' : 'in-progress'
          } events`
        }}
      </tr>
      <tr
        v-for="{
          id,
          name,
          acceptedAt,
          bonus,
          dueDate,
          progress,
          isReceived,
          isExpired,
        } of userEvents"
        :key="id"
      >
        <td>{{ id }}</td>
        <td>{{ name }}</td>
        <td>{{ acceptedAt }}</td>
        <td>{{ bonus }}</td>
        <td>{{ dueDate }}</td>
        <td>{{ progress }}</td>
        <td>
          <template v-if="isCompletedEvents">
            <span v-if="isReceived" class="disabled-text">
              {{ 'Received' }}
            </span>
            <span v-else-if="isExpired" class="disabled-text">
              {{ 'Expired' }}
            </span>
            <span
              v-else
              class="clickable-text"
              @click="receiveUserEventBonus(id)"
            >
              {{ 'Receive' }}
            </span>
          </template>
          <span v-else class="clickable-text" @click="openEventDialog(id)">
            {{ 'view' }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, toRefs, defineEmits } from 'vue';
import { UserEvent } from '@/modules/userBonuses/domain/userEvent';
import viewEvent from '@/modules/userBonuses/application/viewEvent';
import receiveBonus from '@/modules/userBonuses/application/receiveBonuse';

const props = withDefaults(
  defineProps<{
    userEvents: UserEvent[];
    isCompletedEvents?: boolean;
  }>(),
  { userEvents: () => [], isCompletedEvents: false }
);

const emit = defineEmits<{
  (e: 'refresh'): void;
}>();

const { userEvents } = toRefs(props);

function openEventDialog(id: number) {
  viewEvent(id);
}

async function receiveUserEventBonus(id: number) {
  await receiveBonus(id);
  emit('refresh');
}
</script>

<style lang="scss" scoped>
.clickable-text {
  color: var(--sucess-color);
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
}

.disabled-text {
  color: #9e9e9e;
  font-size: 16px;
  line-height: 20px;
}
</style>
