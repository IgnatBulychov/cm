<template>

<div class="mx-auto  px-2 py-2" >
          <v-btn
            color="primary"
            dark
            @click.stop="dialog = true"
             tile outlined 
          >
            <v-icon left>mdi-plus</v-icon> Добавить товар
          </v-btn>

           <v-btn
            color="error"
            @click.stop="removeItems()"
             tile outlined 
          >
             Удалить выделенные товары
          </v-btn>

          <v-dialog v-model="dialog" min-width="80%" >
              <v-card>
      <v-card-text>
        <v-container>
            <v-row>
                <v-col
                    cols="12"
                >
                    <v-text-field
                        v-model="item.title"
                        label="Наименование"
                    ></v-text-field>
                     <v-text-field
                        v-model="item.price"
                        label="Цена"
                    ></v-text-field>
                    <v-text-field
                        v-model="item.code"
                        label="Штрихкод"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-container>
        <v-btn class="success" @click="createItem()">Добавить</v-btn>
      </v-card-text>
</v-card>

          </v-dialog>


<v-card>
    <v-card-title>
      Товары и услуги
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search-mdi"
        label="Поиск"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
    v-model="selectedItems"
      :headers="headers"
      :single-select="false"
      show-select
       item-key="_id"
      :items="items"
      :search="search"
    >
    </v-data-table>
  </v-card>



        </div>  


</template>

<script>

    export default {
    name: 'items',
  
    data() {
      return {
        dialog: false,
        selectedItems: [],
        search: '',
        headers: [
          {
            text: 'Наименование',
            align: 'left',
            value: 'title',
          },
          { 
            text: 'Цена', 
            value: 'price' 
          },
          { 
            text: 'Штрихкод', 
            value: 'code' 
          }
        ],
        item:{
            title: '',
            price: null,
            code: null
        }

      }
    },
    mounted() {
      this.$store.dispatch('items/getItems')
    },
    computed: {
      items() {
        return this.$store.state.items.items;
      }
    },
    methods: {
        
         createItem() {
           this.$store.dispatch('items/createItem', this.item)
         
           this.dialog = false
           this.item = {
               title: '',
               price: null,
               code: null
           }
        },
        removeItems() {
           
           this.$store.dispatch('items/removeItems', this.selectedItems)
          
        }
    
    }
  }
</script>

<style>
  
</style>
