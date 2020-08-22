<template>
    <div height="100%" width="100%" class="mx-2 my-2">
     
        <v-btn @click="openShift()" class="ma-2" tile color="success">
         <v-icon>mdi-printer-pos</v-icon> Открыть смену
        </v-btn>
        <br>
        <v-btn @click="reportX()" class="ma-2" tile color="success">
            <v-icon>mdi-printer-pos</v-icon> Промежуточный (X-отчет)
        </v-btn> 
        <br>
        <v-btn @click="reportZ()" class="ma-2" tile color="success">
            <v-icon>mdi-printer-pos</v-icon> Закрытие смены (Z-отчет)
        </v-btn>    
  </div>
</template>

<script>
  const remote = require('electron').remote;
  const application = remote.app;

  const mainAppPath = application.getAppPath().replace('\\app.asar', '') 

  const pythonPath = mainAppPath + '\\atol_python\\python\\python.exe'
  const pythonScriptPath = mainAppPath + '\\atol_python'

  let {PythonShell} = require('python-shell')

  export default {
    name: 'reports',
    
    data() {
      return {
        
      }
    },
    created() {
      this.$store.dispatch('main/setCurrentFRSettings')
    },
    computed: {
      settings() {
        return this.$store.state.main.currentFRSettings
      },
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
      reportX() {
        let app = this
        let task = '{"type":"reportX","operator":{"name":"Админ","vatin":"123654789507"}}'
        console.log(app.settings)
        app.makeJsonTask(task) 
      },
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
    }
  }
}
</script>

<style>
  
</style>



          