<template>
  <div class="  " color="grey lighten-2"  height="100vh">
 <div>        
      <v-btn @click="dialogAddFree = true" class="ma-2" tile outlined color="success">
        <v-icon left>mdi-plus</v-icon> Добавить
      </v-btn>

      <v-btn @click="dialogAddFromBase = true" class="ma-2" tile outlined color="success">
          <v-icon left>mdi-plus</v-icon> Добавить из базы
      </v-btn> 

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
    </div>
  
    <div>
      <v-text-field
        append-icon="mdi-barcode-scan"
        @click:append="addItem()"
        color="primary"
        label="Штрихкод"
        v-model="code"
        outlined
      ></v-text-field>
    </div>

    <div>
    </div>

    <v-simple-table v-if="checkItems.length">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Наименование</th>
            <th class="text-left">Цена</th>
            <th class="text-left">НДС</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="item in checkItems" :key="item._id">
              <td>{{ item.title }}</td>
              <td>{{ item.price }}</td>
            </tr>
                    
        </tbody>
      </template>
    </v-simple-table> 
    <div v-else class="text-center">
      Добавьте позиции в чек
    </div>

    <div>
      <v-icon>data-matrix-scan</v-icon>
      <v-icon>mdi-barcode-scan</v-icon>
      <v-icon>mdi-qrcode-scan</v-icon>
      <v-icon>mdi-credit-card-outline</v-icon>
      <v-icon>mdi-tag-outline</v-icon>
      <v-icon>mdi-storefront-outline</v-icon>
      
      <v-icon>mdi-data-matrix</v-icon>
    </div>

   
  </div>
</template>

<script>
import addFree from './addFree'
  import addFromBase from './addFromBase'
  export default {
    name: 'registration',
    components: {
      addFromBase, addFree
    },
    data() {
      return {
        code: '',
         dialogAddFree: false,
         dialogAddFromBase: false
      }
    },
    computed: {
      checkItems() {
        return this.$store.state.fiscalCheck.checkItems
      }
    },
    methods: {
      addItem () {
         this.$store.dispatch('fiscalCheck/addItemToCheck', this.code)
      }
      
    
    }
  }
</script>

<style scoped>
.height-100 {
  height: 100vh;
  width: 100%;
}
</style>




          