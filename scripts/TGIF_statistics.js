var app = new Vue({  
    el: '#app',  
    data: {    
        senators:[],
        estadisticas:{},
        data: {},
        url: ""
    },
    created(){/* llamo metodos para al cargar la página */
        console.log("entre en created()")
        this.selectURL();/* elijo la URL dependiendo si estoy en la página "Congress113-Senate" o "Congress113-House" */
        this.getData(this.url);/* cargo datos de la API con fetch e inicio el renderizado de la página */
        console.log("sali en created()")
    },
    methods: {
        selectURL() {/* selecciono URL dependiendo si abro la página "Congress113-Senate" o "Congress113-House" */
        console.log("entre en selectURL()")
            if (document.querySelector(".senate")) {
                //url='https://api.propublica.org/congress/v1/113/senate/members.json'; /*usar para datos de ProPublica*/
                this.url='http://localhost/json/pro-congress-113-senate.json';  /*usar para datos de localhost*/
            } else if (document.querySelector(".house")){
                //url='https://api.propublica.org/congress/v1/113/house/members.json'; /*usar para datos de ProPublica*/
                this.url='http://localhost/json/pro-congress-113-house.json';  /*usar para datos de localhost*/
            }
            console.log("sali en selectURL()")
        },
        getData(url) {/* uso fetch para traer datos de la API y asignar a propiedades dentro de Vue-data, llamo a eventos_init() */
            console.log("entre en getData()")
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
                    // console.log('la respuesta es =', response);
                    return response.json()
                  } else {
                    return Promise.reject('fetch promise rejected!')
                  }
            })
            .then(function(datos) {
                self.senators=datos.results[0].members;
                self.data=datos;
                // console.log('data = ', data);

                if (document.querySelector("#loyalty")) {
                    self.extract_senators(self.data, 0); /* mando "0" para que solo pase por el codigo least_loyal y most_loyal */
                    self.estadisticas=statistics;
                    // console.log("senadores: "+app.estadisticas);
                } else if (document.querySelector("#attendance")){
                    self.extract_senators(self.data,1);  /* mando "1" para que solo pase por el codigo least_engaged y most_engaged */
                    self.estadisticas=statistics;
                    // console.log("senadores: "+app.estadisticas);
                } 
            })
            .catch(function(err) {
                console.error("el error sucedido es: "+err);
            });
            console.log("sali en getData()")
        },
        seleccionar(opcion){
            console.log("entre en seleccionar()")
            var least_loyal=[];
            var most_loyal=[];
            var least_engaged=[];
            var most_engaged=[];
            var senatorsLength=this.senators.length;
            var pct_filter=0.10;

            switch (opcion) { /* 0: house n' senate loyalty  /   1:  house n' senate attendance */
                case 0:
                    /*ordeno de menor a mayor lista de senadores segun votos con su partido*/
                    this.senators.sort((a,b)=>(a.votes_with_party_pct>b.votes_with_party_pct)?1:-1);
                    // senator.forEach((senator)=>least_loyal.push(senator.votes_with_party_pct));

                    var lli=Math.round((senatorsLength*pct_filter));  /*lli: least loyal index*/
                    for (var i = 0; i < lli; i++) {
                        least_loyal.push(this.senators[i]);
                        if (i==lli-1) {
                            while (this.senators[i+1].votes_with_party_pct==this.senators[i].votes_with_party_pct){
                                least_loyal.push(this.senators[i+1]);
                                i++;
                            }
                        }
                    }

                    var mli=Math.floor(senatorsLength*(1-pct_filter))-1;  /*mli: most loyal index*/
                    for (var i = senatorsLength-1; i > mli; i--) {
                        most_loyal.push(this.senators[i]);
                        if (i==mli+1) {
                            while (this.senators[i-1].votes_with_party_pct==this.senators[i].votes_with_party_pct){
                                most_loyal.push(this.senators[i-1]);
                                i--;
                            }
                        }
                    }
                    statistics.least_loyal=[...least_loyal];
                    statistics.most_loyal=[...most_loyal];
                    break;
            
                case 1:
                    /*ordeno de menor a mayor lista de senadores segun asistencia a votaciones*/
                    this.senators.sort((a,b)=>(a.missed_votes_pct>b.missed_votes_pct)?1:-1);

                    var mei=Math.round((senatorsLength*pct_filter));  /*mei: most engaged index*/
                    for (var i = 0; i < mei; i++) {
                        most_engaged.push(this.senators[i]);
                        if (i==mei-1) {
                            while (this.senators[i+1].missed_votes_pct==this.senators[i].missed_votes_pct){
                                most_engaged.push(this.senators[i+1]);
                                i++;
                            }
                        }
                    }

                    var lei=Math.floor(senatorsLength*(1-pct_filter))-1;  /*lei: least engaged index*/
                    for (var i = senatorsLength-1; i > lei; i--) {
                        least_engaged.push(this.senators[i]);
                        if (i==lei+1) {
                            while (this.senators[i-1].missed_votes_pct==this.senators[i].missed_votes_pct){
                                least_engaged.push(this.senators[i-1]);
                                i--;
                            }
                        }
                    }

                    statistics.least_engaged=[...least_engaged];
                    statistics.most_engaged=[...most_engaged];
                    break;
            } /* fin switch caso loyal or engaged */
            console.log("sali en seleccionar()")
        },
        extract_senators(array, seleccion) {  /* array=data.json, seleccion=0 o 1 para pasar solo por una parte del codigo */
            console.log("entre en extract_senators()")
            var senators=array.results[0].members;
            var democrats=[];
            var republicans=[];
            var independents=[];
            var senatorParty="";
            var senatorVotesParty="";
            var democrats_total_vwp=0;
            var republicans_total_vwp=0;
            var independents_total_vwp=0;

            senators.forEach((element) => { /*filtro por partido y envio a array correspondiente*/
                senatorParty=element.party;
                senatorVotesParty=element.votes_with_party_pct
                // senatorState=element.state;
                switch (senatorParty) {
                    case "D":
                        democrats.push(element);
                        democrats_total_vwp+=senatorVotesParty;
                        break;

                    case "R":
                        republicans.push(element);
                        republicans_total_vwp+=senatorVotesParty;
                        break;

                    case "I":
                        independents.push(element);
                        independents_total_vwp+=senatorVotesParty;
                        break;
                    
                    default:
                        break;
                }
            });

            /*lleno objeto statistics con cantidad de democratas, republicanos e independientes*/
            statistics.number_of_senators[0]=democrats.length;
            statistics.number_of_senators[1]=republicans.length;
            statistics.number_of_senators[2]=independents.length;
            statistics.number_of_senators[3]=statistics.number_of_senators[0]+statistics.number_of_senators[1]+statistics.number_of_senators[2];
            

            /*lleno objeto statistics con porcentajes de votos con sus partidos*/
            statistics.vwp_pct[0]=democrats_total_vwp/democrats.length;
            statistics.vwp_pct[1]=republicans_total_vwp/republicans.length;
            statistics.vwp_pct[2]=independents_total_vwp/independents.length;
            var divisor=statistics.vwp_pct.length;
            for (let index = 0; index < statistics.vwp_pct.length; index++) {
                if (!isNaN(statistics.vwp_pct[index].toFixed(1))) {
                } else {
                    statistics.vwp_pct[index]=0;
                    divisor-=1;
                }
            }
            statistics.vwp_pct[3]=(statistics.vwp_pct[0]+statistics.vwp_pct[1]+statistics.vwp_pct[2])/divisor;
            this.seleccionar(seleccion)
            console.log("sali en extract_senators()")
        } /* fin funcion extract_senators */
    }
});








