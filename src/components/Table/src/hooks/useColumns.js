import { ref, unref, computed, watch, toRaw, h } from 'vue';
import { isEqual, cloneDeep } from 'lodash-es';
import { isArray, isString, isBoolean, isFunction } from '@/utils/is';
import { usePermission } from '@/hooks/web/usePermission';
import { renderEditCell } from '../components/editable';
import { NTooltip, NIcon } from 'naive-ui';
import { FormOutlined } from '@vicons/antd';

export function useColumns(propsRef) {
  const columnsRef = ref(unref(propsRef).columns);
  let cacheColumns = unref(propsRef).columns;
  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef));
    handleActionColumn(propsRef, columns);
    if (!columns) return [];
    return columns;
  });
  const { hasPermission } = usePermission();

  function isIfShow(action) {
    const ifShow = action.ifShow;
    let isIfShow = true;
    if (isBoolean(ifShow)) {
      isIfShow = ifShow;
    }
    if (isFunction(ifShow)) {
      isIfShow = ifShow(action);
    }
    return isIfShow;
  }

  const renderTooltip = (trigger, content) => {
    return h(NTooltip, null, {
      trigger: () => trigger,
      default: () => content,
    });
  };
  const getPageColumns = computed(() => {
    const pageColumns = unref(getColumnsRef);
    const columns = cloneDeep(pageColumns);
    return columns
      .filter((column) => {
        return hasPermission(column.auth) && isIfShow(column);
      })
      .map((column) => {
        //默认 ellipsis 为true
        column.ellipsis = typeof column.ellipsis === 'undefined' ? { tooltip: true } : false;
        const { edit } = column;
        if (edit) {
          column.render = renderEditCell(column);
          if (edit) {
            const title = column.title;
            column.title = () => {
              return renderTooltip(
                h('span', {}, [
                  h('span', { style: { 'margin-right': '5px' } }, title),
                  h(
                    NIcon,
                    {
                      size: 14,
                    },
                    {
                      default: () => h(FormOutlined),
                    }
                  ),
                ]),
                '该列可编辑'
              );
            };
          }
        }
        return column;
      });
  });
  watch(
    () => unref(propsRef).columns,
    (columns) => {
      columnsRef.value = columns;
      cacheColumns = columns;
    }
  );

  function handleActionColumn(propsRef, columns) {
    const { actionColumn } = unref(propsRef);
    if (!actionColumn) return;
    !columns.find((col) => col.key === 'action') &&
      columns.push({
        ...actionColumn,
      });
  }

  //设置
  function setColumns(columnList) {
    const columns = cloneDeep(columnList);
    if (!isArray(columns)) return;
    if (!columns.length) {
      columnsRef.value = [];
      return;
    }
    const cacheKeys = cacheColumns.map((item) => item.key);
    //针对拖拽排序
    if (!isString(columns[0])) {
      columnsRef.value = columns;
    } else {
      const newColumns = [];
      cacheColumns.forEach((item) => {
        if (columnList.includes(item.key)) {
          newColumns.push({ ...item });
        }
      });
      if (!isEqual(cacheKeys, columns)) {
        newColumns.sort((prev, next) => {
          return cacheKeys.indexOf(prev.key) - cacheKeys.indexOf(next.key);
        });
      }
      columnsRef.value = newColumns;
    }
  }

  //获取
  function getColumns() {
    const columns = toRaw(unref(getColumnsRef));
    return columns.map((item) => {
      return {
        ...item,
        title: item.title,
        key: item.key,
        fixed: item.fixed || undefined,
      };
    });
  }

  //获取原始
  function getCacheColumns(isKey) {
    return isKey ? cacheColumns.map((item) => item.key) : cacheColumns;
  }

  //更新原始数据单个字段
  function setCacheColumnsField(key, value) {
    if (!key || !value) {
      return;
    }
    cacheColumns.forEach((item) => {
      if (item.key === key) {
        Object.assign(item, value);
        return;
      }
    });
  }

  return {
    getColumnsRef,
    getCacheColumns,
    setCacheColumnsField,
    setColumns,
    getColumns,
    getPageColumns,
  };
}
