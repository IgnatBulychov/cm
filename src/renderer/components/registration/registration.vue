<template>
  <div class="  " color="grey lighten-2"  height="100vh">
 <div>        
      <v-btn @click="dialogAddFree = true" class="ma-2" tile outlined color="success">
        <v-icon left>mdi-plus</v-icon> Добавить
      </v-btn>

      <v-btn @click="dialogAddFromBase = true" class="ma-2" tile outlined color="success">
          <v-icon left>mdi-plus</v-icon> Добавить из базы
      </v-btn> 

      <v-btn @click="clearCheck()" class="ma-2" tile outlined color="success">
        <v-icon left>mdi-plus</v-icon> Очистить
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

<v-card>
  <v-card-text>
    <div class="container" v-if="items.length">
      <div v-for="item in items" :key="item._id" 
       v-bind:class="[activeItem == item._id ? 'green lighten-4' : '', 'row text-center']"
        @click="changePosition(item)" 
      >
        <div class="col-4">
            {{ item.title }}
              
        </div>
        <div class="col-2">
          {{ item.qantity }}
              
        </div>
        <div class="col-2">
         
              {{ item.price }}
        </div>
        <div class="col-2">
         
              {{ item.qantity*item.price }}
        </div>
      </div>
    </div>

  
    <div v-else class="text-center">
      Добавьте позиции в чек
    </div>
    </v-card-text>
</v-card>

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
        code: null,
         dialogAddFree: false,
         dialogAddFromBase: false
      }
    },
    computed: {
      items() {
        return this.$store.state.check.items
      },
      activeItem() {
        return this.$store.state.check.activeItem
      }
    },
    methods: {
      addItem () {
        this.$store.dispatch('check/getItem', this.code)
      },
      clearCheck() {
        this.$store.commit('check/clearCheck')
      },
      changePosition (to) {
        this.$store.dispatch('check/changePosition', to)
      },

      
    
    }
  }
</script>

<style scoped>
.height-100 {
  height: 100vh;
  width: 100%;
}
</style>




          