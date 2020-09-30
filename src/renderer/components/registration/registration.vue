<template>
  <div  color="grey lighten-2" class="registration-block">

  
    <div class="py-1 px-2 code-input" >
      <v-form @submit.prevent="addItem()">
        <v-text-field
        ref="barcodeInput"
        append-icon="mdi-barcode-scan"
        @click:append="addItem()"
        color="primary"
        label="Штрихкод"
        v-model="inputcode"
        outlined
      ></v-text-field>
      <v-btn class="d-none" type="submit">Submit</v-btn>
    </v-form>
      
    </div>


<div class="check-items"  height="80%">
  <v-card-text>
    <div class="container" v-if="items.length">
      <div v-for="item in items" :key="item._id" 
       v-bind:class="[activeItem == item._id ? 'primary--text' : '', 'row text-center']"
       
      >
        <div class="col-4 text-left">
            {{ item.title }}
              
        </div>
        <div class="col-2">
          {{ item.qantity }}
              
        </div>
        <div class="col-2">
         
              {{ item.price }}
        </div>
        <div class="col-2">
         
              {{ Number(item.quantity*item.price).toFixed(2) }}
        </div>
      </div>
    </div>

  
    <div v-else class="text-center">
       <v-icon>mdi-scaner</v-icon> Добавьте позиции в чек

       
    <div>
      <v-icon>data-matrix-scan</v-icon>
      <v-icon>mdi-barcode-scan</v-icon>
      <v-icon>mdi-qrcode-scan</v-icon>
     
      <v-icon>mdi-tag-outline</v-icon>
      <v-icon>mdi-storefront-outline</v-icon>
      
      <v-icon>mdi-data-matrix</v-icon>
    </div>



    </div>
  </v-card-text>
</div>

<div class="footer-bar" >
  <v-toolbar dark color="green lighten-5"
    >    
    <v-toolbar-items>
      
      <v-btn @click="dialogAddFree = true"  icon color="success">
        <v-icon>mdi-plus</v-icon> 
      </v-btn>

      <v-btn @click="dialogAddFromBase = true"  icon color="success">
          <v-icon>mdi-view-grid-plus</v-icon>
      </v-btn> 

      <v-btn @click="clearCheck()" icon color="error">
        <v-icon>mdi-sticker-remove-outline</v-icon>
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
 </v-toolbar-items>
      <v-spacer></v-spacer>
 <v-toolbar-items>
       <v-btn width="300px" @click="toPayment()"  color="green lighten-2">
        К оплате:  {{ summ }} ₽
      </v-btn>


 </v-toolbar-items>
   </v-toolbar>
  
</div>


 

<!-- payment card -->
   

    <v-dialog
      v-model="dialogPayment"
      max-width="500"
    >
      <v-card>
        <v-card-title>
            
            Выберите тип оплаты
          
            <v-spacer></v-spacer>


            <v-btn
              icon
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-card-title>
        <v-card-text>

        </v-card-text>

        <v-card-actions>
         

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
             <v-icon>mdi-credit-card-outline</v-icon> Банковская карта
          </v-btn>
 <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Наличные
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        inputcode: null,
         dialogAddFree: false,
         dialogAddFromBase: false,
         dialogPayment: false
      }
    },
    mounted () {
      this.$refs.barcodeInput.focus()
    let app = this
    window.addEventListener('keyup', function (event) {
      if (event.keyCode == 113) {
        app.toPayment()
      }
        app.keytap(event.keyCode)
      
    })
  },
    computed: {
      items() {        
        return this.$store.state.check.items
      },
      activeItem() {
        return this.$store.state.check.activeItem
      },
      summ() {
        let summ = 0;
        if (this.items.length) {
          console.log('22222')
          this.items.forEach(item => {
            summ = summ + (item.price * item.quantity)
          });
        }        
        return summ.toFixed(2)
      }
    },
    methods: {
      addItem () {
        this.$store.dispatch('check/getItem', this.inputcode)
      },
      clearCheck() {
        this.$store.commit('check/clearCheck')
      },
      changePosition (to) {
        this.$store.dispatch('check/changePosition', to)
      },
keytap (keycode) {
      console.log(keycode)
  },
  toPayment() {
    console.log('payment')
           this.dialogPayment = true
  }
      
    
    }
  }
</script>

<style scoped>

.registration-block {
  height: 100vh;
}
.code-input {
  height: 10%;
}
.check-items {
  height: 80%;
}
.footer-bar {
  height: 10%;
} 
</style>




          