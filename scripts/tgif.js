var app = new Vue({  
    el: '#app',  
    data: {    
        senators:[],
        data: {},
        url: "",
        checkboxes: [],
        selectedItems:{filtro_partido: [], filtro_estado: "" },
        estados: {}
    },
    created(){/* llamo metodos para al cargar la página */
        this.selectURL();/* elijo la URL dependiendo si estoy en la página "Congress113-Senate" o "Congress113-House" */
        this.getData(this.url);/* cargo datos de la API con fetch e inicio el renderizado de la página */
    },
    methods: {
        /* **************************************************************** */
        /* Metodo para recorrer .json y extraer datos de cámara del senado */
        /* **************************************************************** */
        comparador(party,state) { /* metodo conectado a v-show para filtrar rows de tabla a mostrar */
            if ((this.selectedItems.filtro_partido.indexOf(party)>=0)&&(this.estados[state]==this.selectedItems.filtro_estado||this.selectedItems.filtro_estado=="ALL")) {/* dejo pasar si senatorParty y senatorState estan en array_f o si ALL esta seleccionado */
                return true
            }else{
                return false
            }
        },
        eventos_init() {/* lleno tabla por primera vez */
            this.selectedItems.filtro_partido=["R","D","I"]; /* solo al inicio: selecciono todos los partidos*/
            this.selectedItems.filtro_estado="ALL"; /* solo al inicio: selecciono todos los estados */
        },
        selectURL() {/* selecciono URL dependiendo si abro la página "Congress113-Senate" o "Congress113-House" */
            if (document.querySelector(".senate")) {
                // url='https://api.propublica.org/congress/v1/113/senate/members.json'; /*usar para datos de ProPublica*/
                this.url='http://localhost/json/pro-congress-113-senate.json';  /*usar para datos de localhost*/
            } else if (document.querySelector(".house")){
                // url='https://api.propublica.org/congress/v1/113/senate/members.json'; /*usar para datos de ProPublica*/
                this.url='http://localhost/json/pro-congress-113-house.json';  /*usar para datos de localhost*/
            }
        },
        getData(url) {/* uso fetch para traer datos de la API y asignar a propiedades dentro de Vue-data, llamo a eventos_init() */
            var self=this;
            fetch(url, {
                method: 'GET',
                mode: 'cors',
                // credentials: "include",
                headers: {
                    'X-API-Key': 'nDbzBDQINGPrCQwxGtyvjmWcPs7FUiwC5FkmKE6b'
                    // 'Content-Type': 'application/json'
                }
            })
            .then(function(response) {
                if (response.ok) {
                    return response.json()
                  } else {
                    return Promise.reject('fetch promise rejected!')
                  }
            })
            .then(function(datos) {
                self.senators=datos.results[0].members;
                self.data=datos; /* asigno datos a "data" para que v-for llene tabla en combinación con v-show */
                self.estados=states;  /* asigno datos a "estados" para que v-for llene desplegable para filtro por estados */
                self.eventos_init();  /*inicio de tabla*/
            })
            .catch(function(err) {
                console.error("el error sucedido es: "+err);
            });
        }
    }
});


 




