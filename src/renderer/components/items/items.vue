<template>
  <div class="mx-auto  px-2 py-2" >
    <v-btn
      color="primary"
      dark
      @click.stop="dialogCreateItem = true"
      tile outlined 
    >
      <v-icon left>mdi-plus</v-icon> Добавить товар
    </v-btn>

     <v-btn
      color="primary"
      dark
      @click.stop="dialogCreateFolder = true"
      tile outlined 
    >
      <v-icon left>mdi-plus</v-icon> Добавить каталог
    </v-btn>

    <v-btn
      color="error"
      @click.stop="remove()"
      tile outlined 
    >
      Удалить выделенные товары
    </v-btn>

    <v-dialog v-model="dialogCreateItem" min-width="80%" >
      <v-card>
        <v-card-text>
          <v-container>
              <v-row>
                <v-col cols="12">
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
          <v-btn class="success" @click="createItem()">Создать товар</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogCreateFolder" min-width="80%" >
      <v-card>
        <v-card-text>
          <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                      v-model="folder.title"
                      label="Наименование"
                  ></v-text-field>
                  <v-select
                    :items="foldersWithNull"
                    label="Родительская папка"
                    item-text="title"
                    item-value="_id"
                    v-model="folder.parent"
                  ></v-select>
                  <v-select
                    :items="taxSystems"
                    label="СНО товаров или услуг каталога"
                    v-model="folder.SNO"
                  ></v-select>
                </v-col>
              </v-row>
          </v-container>
          <v-btn class="success" @click="createFolder()">Создать каталог</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

<!-- Список товаров и каталогов -->
<v-card>

  <v-container>
    <v-row v-for="folder in folders" :key="folder._id">
      <v-col cols="1">
        <v-checkbox hide-details class="shrink mx-0 my-0"  v-model="selectedFolders" :value="folder._id"></v-checkbox>
      </v-col>
      <v-col cols="1">
         <v-icon>mdi-folder-open-outline</v-icon> 
        </v-col>
      <v-col cols="5">
        {{folder.title}}
        
      </v-col>
    </v-row>

    <v-row v-for="item in items" :key="item._id">
      <v-col cols="1">
        <v-checkbox hide-details class="shrink mx-0 my-0" v-model="selectedItems" :value="item._id"></v-checkbox>
      </v-col>
       <v-col cols="1">
<v-icon>mdi-package-variant-closed</v-icon> 
          </v-col>
      <v-col cols="5">
        {{item.title}}


       </v-col>
    </v-row>
  </v-container>



  <!-- старый варинат
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
     -->

  </v-card>



        </div>  


</template>

<script>

    export default {
    name: 'items',
  
    data() {
      return {
        dialogCreateItem: false,
        dialogCreateFolder: false,
        selectedItems: [],
        selectedFolders: [],
       item:{
            title: '',
            price: null,
            code: null,
            parent: null
        },
        folder:{
            title: '',
            parent: '',
            taxSystem: null
        },
        taxSystems: [
          {
            text: 'УСН Доходы',
            value: 'USN_DOHOD'
          },
          {
            text: 'УСН Доходы-расходы',
            value: 'USN_DOHOD-RASHOD'
          }
        ]

      }
    },
    mounted() {
      this.$store.dispatch('items/getItems')
      //берем из URL ID родительского каталога
      this.$store.dispatch('items/getFolders', this.$route.query.folder == undefined ? "root" : this.$route.query.folder)
    },
    computed: {
      /*
      осавил для примере геттера
      foldersAndItems() {
        return this.$store.getters['items/getFoldersAndItems']
      },
      */
      folders() {
        return this.$store.state.items.folders
      },
      items() {
        return this.$store.state.items.items
      },
      foldersWithNull() {
        // добавляем в массив каталогов корневой каталог
        let folders = [
          {
            _id: "root", 
            title: 'Корневой каталог'
          }
        ];
        let app = this
        folders.concat(app.$store.state.items.folders)
        return folders
      }
    },
    methods: {
        
         createItem() {
           this.$store.dispatch('items/createItem', this.item)
         
           this.dialogCreateItem = false
           this.item = {
               title: '',
               price: null,
               code: null
           }
        },
        remove() {
          
           this.$store.dispatch('items/removeItems', this.selectedItems)
           this.$store.dispatch('items/removeFolders', this.selectedFolders)
          
        },

        
         createFolder() {
           this.$store.dispatch('items/createFolder', this.folder)
         
           this.dialogCreateFolder = false
           this.folder = {
               title: ''
           }
        }
    
    }
  }
</script>

<style>
  
</style>
