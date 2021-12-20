<template>
  <table class="data-table">
    <thead>
      <tr>
        <!-- 渲染所有header -->
        <th v-for="{ header, key } of columns" :key="key">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <!-- 渲染n個tr -->
      <tr
        v-for="(record, rowIndex) of data"
        :key="
          typeof rowKey === 'function'
            ? rowKey(record, rowIndex)
            : record[rowKey!]
        "
      >
        <!-- 渲染每個tr裡的資料 -->
        <td
          v-for="({ data: columnData, key }, columnIndex) of columns"
          :key="key"
        >
          <slot
            v-if="$slots[key]"
            :name="key"
            :rowIndex="rowIndex"
            :columnIndex="columnIndex"
            :record="record"
            :text="getData(record, { rowIndex, columnIndex }, columnData)"
          />
          <template v-else>
            {{ getData(record, { rowIndex, columnIndex }, columnData) }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue';

export interface DataTableColumnDataOptions {
  rowIndex: number;
  columnIndex: number;
}

export type DataTableColumnData<T> =
  | keyof T
  | ((record: T, options: DataTableColumnDataOptions) => string | number);

export interface DataTableColumn<T> {
  key: string;
  header?: string;
  data?: DataTableColumnData<T>;
}

export type DataTableRowdKey<T> =
  | keyof T
  | ((record: T, rowIndex: number) => string | number);

export interface DataTableProps<T> {
  columns?: ReadonlyArray<DataTableColumn<T>>;
  data?: ReadonlyArray<T>;
  rowKey?: DataTableRowdKey<T>;
}

//  eslint-disable-next-line @typescript-eslint/no-explicit-any
withDefaults(defineProps<DataTableProps<any>>(), {
  columns: () => [],
  data: () => [],
  rowKey: (_, rowIndex) => rowIndex,
});

function getData<T>(
  record: T,
  options: DataTableColumnDataOptions,
  data?: DataTableColumnData<T>
) {
  if (data == null) {
    return null;
  }

  if (typeof data === 'function') {
    return data(record, options);
  }

  return record[data];
}
</script>

<style lang="scss" scoped>
.data-table {
  width: 100%;
  font-size: 16px;
  text-align: center;

  thead {
    th {
      box-sizing: border-box;
      padding: 16px 0;
      color: var(--primary-color);
      font-weight: 400;
      line-height: 20px;
    }
  }

  thead,
  tbody {
    tr {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
      align-items: center;
    }
  }

  tbody {
    display: block;
    overflow: hidden;
    width: 100%;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

    tr {
      background-color: var(--secondary-variants-color);

      &:nth-child(even) {
        background-color: var(--secondary-color);
      }

      td {
        box-sizing: border-box;
        padding: 24px 8px;
        line-height: 20px;
        word-break: break-all;
      }
    }
  }
}
</style>
