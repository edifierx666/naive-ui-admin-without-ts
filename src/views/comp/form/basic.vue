<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="基础表单"> 基础表单，用于向用户收集表单信息</n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <div class="BasicForm">
        <BasicForm
          submitButtonText="提交预约"
          layout="horizontal"
          :gridProps="{ cols: 1 }"
          :schemas="schemas"
          @submit="handleSubmit"
          @reset="handleReset"
        >
          <template #statusSlot="{ model, field }">
            <n-input v-model:value="model[field]" />
          </template>
        </BasicForm>
      </div>
    </n-card>
  </div>
</template>
<script setup="true">
import { BasicForm } from '@/components/Form/index';
import { useMessage } from 'naive-ui';

const schemas = [
  {
    field: 'name',
    component: 'NInput',
    label: '姓名',
    labelMessage: '这是一个提示',
    componentProps: {
      placeholder: '请输入姓名',
      onInput: (e) => {
        console.log(e);
      },
    },
    rules: [
      {
        required: true,
        message: '请输入姓名',
        trigger: ['blur'],
      }],
  },
  {
    field: 'mobile',
    component: 'NInputNumber',
    label: '手机',
    componentProps: {
      placeholder: '请输入手机号码',
      showButton: false,
      onInput: (e) => {
        console.log(e);
      },
    },
  },
  {
    field: 'type',
    component: 'NSelect',
    label: '类型',
    componentProps: {
      placeholder: '请选择类型',
      options: [
        {
          label: '舒适性',
          value: 1,
        },
        {
          label: '经济性',
          value: 2,
        },
      ],
      onUpdateValue: (e) => {
        console.log(e);
      },
    },
  },
  {
    field: 'makeDate',
    component: 'NDatePicker',
    label: '预约时间',
    defaultValue: 1183135260000,
    componentProps: {
      type: 'date',
      clearable: true,
      onUpdateValue: (e) => {
        console.log(e);
      },
    },
  },
  {
    field: 'makeTime',
    component: 'NTimePicker',
    label: '停留时间',
    componentProps: {
      clearable: true,
      onUpdateValue: (e) => {
        console.log(e);
      },
    },
  },
  {
    field: 'makeProject',
    component: 'NCheckbox',
    label: '预约项目',
    componentProps: {
      placeholder: '请选择预约项目',
      options: [
        {
          label: '种牙',
          value: 1,
        },
        {
          label: '补牙',
          value: 2,
        },
        {
          label: '根管',
          value: 3,
        },
      ],
      onUpdateChecked: (e) => {
        console.log(e);
      },
    },
  },
  {
    field: 'makeSource',
    component: 'NRadioGroup',
    label: '来源',
    componentProps: {
      options: [
        {
          label: '网上',
          value: 1,
        },
        {
          label: '门店',
          value: 2,
        },
      ],
      onUpdateChecked: (e) => {
        console.log(e);
      },
    },
  },
  {
    field: 'status',
    label: '状态',
    //插槽
    slot: 'statusSlot',
  },
];
const message = useMessage();

function handleSubmit(values) {
  if (!values) {
    return message.error('请填写完整信息');
  }
  console.log(values);
  message.success(JSON.stringify(values));
}

function handleReset(values) {
  console.log(values);
}
</script>
<style lang="less" scoped="true">
.BasicForm {
  width: 550px;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 20px;
}
</style>
