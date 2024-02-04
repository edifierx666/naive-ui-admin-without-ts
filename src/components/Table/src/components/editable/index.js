import { h } from 'vue';
import EditableCell from './EditableCell.vue';

export function renderEditCell(column) {
  return (record, index) => {
    const _key = column.key;
    const value = record[_key];
    record.onEdit = async (edit, submit = false) => {
      if (!submit) {
        record.editable = edit;
      }
      if (!edit && submit) {
        const res = await record.onSubmitEdit?.();
        if (res) {
          record.editable = false;
          return true;
        }
        return false;
      }
      // cancel
      if (!edit && !submit) {
        record.onCancelEdit?.();
      }
      return true;
    };
    return h(EditableCell, {
      value,
      record,
      column,
      index,
    });
  };
}
