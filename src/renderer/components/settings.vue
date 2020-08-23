<template>
  <div>
    <v-tabs
      v-model="tab"
    >
      <v-tab>
        Общие
      </v-tab>
      
      <v-tab>
        Кассы
      </v-tab>
     
    </v-tabs>

    <v-tabs-items v-model="tab">

      <v-tab-item>
        раздел в разработке           
      </v-tab-item>


       <v-tab-item>
        <div class="mx-auto  px-2 py-2" >
          <v-btn
            color="primary"
            dark
            @click.stop="dialogSelectModel = true"
             tile outlined 
          >
            <v-icon left>mdi-plus</v-icon> Добавить кассу
          </v-btn>

          <v-btn
            color="primary"
            dark
            @click.stop="save()"
             tile outlined 
          >
            <v-icon left>mdi-save</v-icon> Сохранить
          </v-btn>

          <v-dialog
            v-model="dialogSelectModel"
            max-width="50%"
          >
            <v-card>
              <v-card-title class="headline">Выберите модель кассы</v-card-title>
              <v-card-actions>
              
                <v-btn
                  color="primary"
                   tile outlined 
                  text
                  @click="dialogSelectModel = false; dialogSettings = true"
                >
                  Атол
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogSettings" max-width="80%" >
            <atol-settings
              v-on:selected="dialogSettings = false"
            ></atol-settings>
          </v-dialog>
        </div>  

<v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Текущая касса</th>
                  <th class="text-left">Касса</th>
                  <th class="text-left">Номер</th>
                   <th class="text-left">Действия</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="fiscalRegisters.length">


     
                  <tr v-for="fiscalRegister in fiscalRegisters" :key="fiscalRegister.id">
                      <td> 
                        <v-radio-group v-model="selectedFR">
                          <v-radio :value="fiscalRegister._id"></v-radio> 
                        </v-radio-group>
                      </td>
                      <td>{{ fiscalRegister.model }}</td>
                      <td>{{ fiscalRegister.serial }}</td>
                      <td> <v-btn @click="deleteFiscalRegister(fiscalRegister._id)">Удалить</v-btn></td>
                     
                  </tr>
                 
                </template>
                <template v-else>
                  <tr>
                    <td colspan="4" class="text-center">Нет подключенных касс</td>
                    
                  </tr>
                </template>         
              </tbody>
            </template>
          </v-simple-table>

      </v-tab-item>
    
    </v-tabs-items>

     <alert :alert="alert" />
  </div>
</template>

<script>
  import AtolSettings from './kkt-settings/atolsettings'
 import Alert from './alerts/alert.vue'


  export default {
    name: 'settings',
    components: {
      AtolSettings, Alert
    },
    data() {
      return {
        tab: null,
        dialogSelectModel: false,
        dialogSettings: false,
        selectedFR: null,
        alert: {
          show: false,
          text: ''
        }
      }
    },
    computed: {
      fiscalRegisters() {
        return this.$store.state.fiscalRegisters.fiscalRegisters
      }
    },
  
    created() {
      this.$store.dispatch('fiscalRegisters/getFiscalRegisters')
      this.selectedFR = this.$store.state.fiscalRegisters.currentFR
    },
    methods: {
      deleteFiscalRegister(id) {
        this.$store.dispatch('fiscalRegisters/deleteFiscalRegister', id)
      },
      save() {
        let app = this
        this.$store.dispatch('fiscalRegisters/saveCurrentFR', app.selectedFR)
        this.alert = {
          show: true,
          text: 'Настройки сохранены'
        }
      }
    }
  }
</script>

<style>
  
</style>



