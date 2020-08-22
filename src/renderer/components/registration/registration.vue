<template>
    <v-card height="100%" width="100%">

      <v-card-title>      
        <v-btn @click="dialogAddFree = true" class="ma-2" tile outlined color="success">
          <v-icon left>mdi-plus</v-icon> Добавить
        </v-btn>
        <v-btn @click="dialogAddFromBase = true" class="ma-2" tile outlined color="success">
            <v-icon left>mdi-plus</v-icon> Добавить из базы
        </v-btn> 

          <v-text-field
           append-icon="mdi-map-marker-off"
            @click:append="addItem()"
            color="success"
            label="Штрих код"
             prepend-icon="mdi-barcode-scan"

            outlined
          ></v-text-field>

          <v-dialog
            v-model="dialogAddFree"
            max-width="80%"
          >
            <add-free></add-free>
          </v-dialog>

           <v-dialog
            v-model="dialogAddFromBase"
            max-width="80%"
          >
            <add-from-base></add-from-base>
          </v-dialog>



      </v-card-title>

      <v-card-text>
        <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Наименование</th>
                  <th class="text-left">Цена</th>
                  <th class="text-left">НДС</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="items">
                  <tr v-for="item in items" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td>{{ item.price }}</td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="3" class="text-center">Добавьте позиции в чек</td>
                    
                  </tr>
                </template>         
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
<v-card-actions>
  <v-icon>mdi-barcode-scan</v-icon>
<v-icon>mdi-qrcode-scan</v-icon>
<v-icon>mdi-credit-card-outline</v-icon>
<v-icon>mdi-tag-outline</v-icon>
<v-icon>mdi-storefront-outline</v-icon>

</v-card-actions>
   
  </v-card>

</template>

<script>
const remote = require('electron').remote;
  const application = remote.app;
 var Datastore = require('nedb')
  var db = new Datastore({ filename: `${application.getPath('userData')}/base.db`, autoload: true });
 import addFree from './addFree'
  import addFromBase from './addFromBase'
  export default {
    name: 'registration',
    components: {
      addFromBase, addFree
    },
    data() {
      return {
         items: 0,

         dialogAddFree: false,
         dialogAddFromBase: false
      }
    },
    methods: {
      addItem () {

      }
      
    
    }
  }
</script>

<style>
  
</style>



          