<template>
    <v-snackbar
          v-model="alert.show"
          top color="success" 
        >
          {{ alert.text }}
            <v-btn
              dark text
              @click="alert.show = false"
            >
            <v-icon>mdi-close</v-icon> 
            
            </v-btn>
        </v-snackbar>
</template>

<script>
export default {
    name: 'alert',
    props: ['alert']
}
</script>