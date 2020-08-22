<template>
  <v-card>
    <v-card-title> Настройки </v-card-title>
    <v-card-text>
      <v-container>
      <v-row>
        <v-col
          cols="6"
        >
          <v-select
            :items="models"
            v-model="settings.model"
            label="Модель ККТ"
          ></v-select>
        </v-col>
        <v-col
          cols="6"
        >
          <v-select
            :items="connections"
            v-model="settings.connection"
            label="Тип соеединения"
          ></v-select>
        </v-col>
        <v-col
          cols="6"
        >
          <v-select
            :items="comPorts"
            v-model="settings.comFile"
            label="COM-порт"
          ></v-select>
        </v-col>
        <v-col
          cols="6"
        >
          <v-select
            :items="baudrates"
            v-model="settings.baudRate"
            label="Скорость"
          ></v-select>
        </v-col>
        <v-col
          cols="6"
        >
          <v-text-field
              v-model="settings.IPAddress"
              label="IP адрес"
          ></v-text-field>
        </v-col>
        <v-col
          cols="6"
        >
          <v-text-field
              v-model="settings.IPPort"
              label="Порт"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    
    <v-card-actions>
      <v-btn color="blue lighten-1" text @click="connectionTest">Проверить связь</v-btn>        
      <v-spacer></v-spacer>     
      <v-btn color="green darken-5" class="text-center" text @click="storeSettings">Добавить кассу</v-btn>
    </v-card-actions>

    <v-alert 
      v-if="error"
      type="error"
      dense
      text
    > {{ error }}       
    </v-alert>

    <v-alert 
      v-if="success"
      type="success" 
      dense
      text
    > {{ success }}  
    </v-alert>

    </v-card-text>
  </v-card>
</template>

<script>
  import models from './resources-atol/models.js'
  import connections from './resources-atol/connections.js'
  import baudrates from './resources-atol/baudrates.js'
  import comPorts from './resources-atol/comPorts.js'

  const remote = require('electron').remote;
  const application = remote.app;

  const mainAppPath = application.getAppPath().replace('\\app.asar', '') 

  const pythonPath = mainAppPath + '\\atol_python\\python\\python.exe'
  const pythonScriptPath = mainAppPath + '\\atol_python'

  let {PythonShell} = require('python-shell')

  export default {
    name: 'atolsettings',
    data() {
      return {
        models: models,
        connections: connections,
        baudrates: baudrates,
        comPorts: comPorts,

        settings:  {
            model: 'LIBFPTR_MODEL_ATOL_AUTO',  
            connection: 'LIBFPTR_PORT_COM',
            comFile: "COM1",
            baudRate: 'LIBFPTR_PORT_BR_115200', 
            IPAddress: "192.168.0.15", 
            IPPort: 5555,            
        },

        error: '',
        success: ''
      }
    },
    created() {
    },
    computed: {
      pythonShellOptionsDEV() {
        let app = this
        return {
          mode: 'text',
          pythonPath: 'atol_python/python/python.exe',
          pythonOptions: ['-u'],
          scriptPath: 'atol_python',
          args: [app.settings.model, app.settings.connection, app.settings.comFile, 
          app.settings.baudRate, app.settings.IPAddress, app.settings.IPPort,
          ] 
        }
      },
      pythonShellOptionsPRO() {
        let app = this
        return {
            mode: 'text',
            pythonPath: pythonPath,
            pythonOptions: ['-u'],
            scriptPath: pythonScriptPath,
            args: [app.settings.model, app.settings.connection, app.settings.comFile, 
            app.settings.baudRate, app.settings.IPAddress, app.settings.IPPort,
            ] 
        }
      }
    },
    methods: {
      makeJsonTask(task) {
        let app = this
        app.success = ''
        app.error = ''
        let options = {
          mode: 'text',
          pythonPath: 'atol_python/python/python.exe',
          pythonOptions: ['-u'],
          scriptPath: 'atol_python',
          args: [app.settings.model, app.settings.connection, app.settings.comFile, 
          app.settings.baudRate, app.settings.IPAddress, app.settings.IPPort,
          task] 
        }

        /* PRODUCTION
         let options = {
          mode: 'text',
          pythonPath: pythonPath,
          pythonOptions: ['-u'],
          scriptPath: pythonScriptPath,
          args: [app.settings.model, app.settings.connection, app.settings.comFile, 
          app.settings.baudRate, app.settings.IPAddress, app.settings.IPPort,
          task] 
        }
        */

        PythonShell.run('json_task.py', options, function (err, results) {
          if (err) throw err;
          if (results[0] == 'connectionFailed') {
            app.error = 'Ошибка обмена'
          } else if (results[0] == 'error') {
            app.error = 'Запрос не может быть выполнен'
          } else if (results[0] == '""') {
            app.error = "Метод ничего не возвращает...скорее всего всё в порядке..."
          } else {
            app.log = JSON.parse(JSON.parse(results[0]))
          }
        });
           
      },
      connectionTest () {  
        let app = this
        app.success = ''
        app.error = ''
        PythonShell.run('connection_test.py', app.pythonShellOptionsDEV, function (err, results) {
          if (err) throw err;
          console.log(results[0]);
          app.log = results[0]
          if (results[0] == 1) {
            app.success = 'Связь установлена'
            app.storeSettings()
            app.connectionSuccess()
          } else {
            app.error = 'Нет связи'
          }
        });

      },
      storeSettings() {
        let app = this
        this.$store.dispatch('main/addFiscalRegister', app.settings)
        this.$emit('selected')   
      },
      getDeviceInfo() {
        let app = this
        let task = '{"type":"getDeviceInfo"}'
        app.makeJsonTask(task) 
      },
      connectionSuccess() {
        app.success = ''
        app.error = ''
        let app = this
        let task = `{
          "type": "nonFiscal",
          "items": [
                      {
                          "type": "text",
                          "text": " ",
                          "alignment": "center"
                      },
                      {
                          "type": "text",
                          "text": "Получилось!!! (*_*)",
                          "alignment": "center"
                      },
                      {
                          "type": "text",
                          "text": "(установить связь)",
                          "alignment": "center"
                      },
                      {
                          "type": "text",
                          "text": " ",
                          "alignment": "center"
                      },
                      {
                          "type": "text",
                          "text": " ",
                          "alignment": "center"
                      },
                      {
                          "type": "text",
                          "text": " ",
                          "alignment": "center"
                      },
                      {
                          "type": "text",
                          "text": " ",
                          "alignment": "center"
                      }
                    ]
                  }`
        app.makeJsonTask(task) 
      }
      
  }
 }


  /*
  Работает
      getSettings () {  
        let app = this
        PythonShell.run('get_settings.py', app.pythonShellOptionsDEV, function (err, results) {
          if (err) throw err;
          console.log(JSON.parse(results[0]));
          app.log1 = JSON.parse(results[0])
        });
      },
      setSettings () {  
        let app = this
        PythonShell.run('set_settings.py', app.pythonShellOptionsDEV, function (err, results) {
          if (err) throw err;
          console.log(results[0]);
          app.log1 = results[0]
        });
      },
  getDeviceInfo() {
        let app = this
        let task = '{"type":"getDeviceInfo"}'
        app.makeJsonTask(task) 
      },
      reportX() {
        let app = this
        let task = '{"type":"reportX","operator":{"name":"Админ","vatin":"123654789507"}}'
        app.makeJsonTask(task) 
      },
      about() {
        let app = this
        let task = `{
            "type": "getShiftStatus"
           }`
        app.makeJsonTask(task) 
      },
          {"type":"getDeviceParameters","keys": [273, 274, 9999, 49, 50]}
          {"type": "getDeviceStatus"}
          `{
            "type": "getShiftStatus"
           }`
           */
</script>



<style>
  
</style>
