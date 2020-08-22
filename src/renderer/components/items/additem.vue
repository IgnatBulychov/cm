<template>
<div>


</div>
</template>

<script>
    const remote = require('electron').remote;
    const application = remote.app;
    var Datastore = require('nedb')
    var db = new Datastore({ filename: `${application.getPath('userData')}/items.db`, autoload: true });

    export default {
    name: 'additem',
    
    data() {
      return {
        
      }
    },
    created() {
        
    },
    methods: {
       
    
    }
  }
</script>

<style>
  
</style>
