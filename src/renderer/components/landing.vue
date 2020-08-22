<template>
<div>
 Версия ПО: {{version}} 
<v-btn @click="cert()">fgfgg</v-btn>
</div>
</template>

<script>
 import CryptoPro from 'crypto-pro';
 
/**
 * @async
 * @function doCertsList
 * @description формирует массив сертификатов с оригинальными значениями
 */

  export default {
    name: 'landing',
    
    data() {
      return {
        version: require('vue/package.json').version
      }
    },
    methods: {
      cert() {
      CryptoPro.call('getCertsList').then(function (certList) {
    console.log(certList);
});
      }
    
    }
  }
</script>

<style>
  
</style>
