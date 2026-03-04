<template>
  <div class="container">
    <h1>组件库测试</h1>

    <div class="button-row">
      <yo-button type="primary">Primary</yo-button>
      <yo-button type="success">Success</yo-button>
      <yo-button type="warning">Warning</yo-button>
      <yo-button type="danger">Danger</yo-button>
    </div>
    <hr>
    <div class="button-row">
      <yo-button type="primary" plain>Primary</yo-button>
      <yo-button type="success" plain>Success</yo-button>
      <yo-button type="warning" plain>Warning</yo-button>
      <yo-button type="danger" plain>Danger</yo-button>
    </div>

    <div class="button-row">
      <yo-button type="primary" disabled>Primary</yo-button>
      <yo-button type="success" disabled>Success</yo-button>
      <yo-button type="warning" disabled>Warning</yo-button>
      <yo-button type="danger" disabled>Danger</yo-button>
      <yo-button type="danger" :loading="true">Danger</yo-button>
      <yo-button type="primary" :loading="true">Primary</yo-button>
      <yo-button type="success" :loading="true">Success</yo-button> 
      <yo-button type="warning" :loading="true">Warning</yo-button>


      <yo-button type="primary" plain :loading="true">Primary</yo-button>
      <yo-button type="success" plain :loading="true">Success</yo-button>
      <yo-button type="warning" plain :loading="true">Warning</yo-button> 
      <yo-button type="danger" plain :loading="true">Danger</yo-button>
    </div>
    <div class="button-row">
      <yo-button type="primary" plain disabled>Primary</yo-button>
      <yo-button type="success" plain disabled>Success</yo-button>    
      <yo-button type="warning" plain disabled>Warning</yo-button>
      <yo-button type="danger" plain disabled>Danger</yo-button>
    </div>

    <yo-button :value="100" :isShowBadge="true" :max="99" :buttonType="'primary'"
      style="margin-right: 50px;">你好</yo-button>      
    <yo-button :value="100" :isShowBadge="true" :max="99" :buttonType="'text'" style="margin-right: 50px;">
      文本
    </yo-button>

    <yo-button :value="11" :isShowBadge="true" :max="99" :buttonType="'default'">朴素级别</yo-button>

  </div>
</template>

<script lang="ts" setup>
import { YoButton } from '../../../packages/src/components/button'
</script>
