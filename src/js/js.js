var vm = new Vue({
    el: '#app',
    data: {
        act_time: 4,
        act_rounds: 4,
        act_desc: 1,
        act_preaviso: 1,
        act_preaviso_text: ["asalto", "descanso", "asalto y descanso", "nada"],
        act_idioma_text: ["Español", "Catalan", "ingles"],
        act_sonidos_text: ["sirena", "campana", "dong", "buzzer", "slap", "timbre"],
        sonido_asaltos: 1,
        sonido_descanso: 0,
        sonido_preaviso: 2,
        sonido_fin: 3,
        act_idioma: 0,
        act_theme_text: ["black", "color", "white"],
        act_theme: 1,
        sesionName: "nombre",
        rounds: 0,
        segundos: 60,
        minutos: 2,
        running: false,
        sts_panel: 0,
        status: "round",
        fontSize:5,
        sesiones: [{
                nombre: "combate",
                rounds: 1,
                time: 3,
                desc: 60,
                preaviso: 0
            },
            {
                nombre: "calentamiento",
                rounds: 2,
                time: 2,
                desc: 60,
                preaviso: 0
            },
            {
                nombre: "entrenamiento",
                rounds: 3,
                time: 1,
                desc: 60,
                preaviso: 0
            }
        ],
    },
    computed: {
  classObject: function () {
    return 
      "transform9"
    
  }
},
    methods: {
        pause: function() {
            this.running = false;
            clearInterval(this.crono);
            this.segundos = 60;
        },
        go: function() {
            const myself = this;
            this.running = true;
            this.minutos = this.act_time-1;
            this.rounds = this.act_rounds;
            asalto();
            function asalto(){
                this.minutos = this.act_time;
            myself.crono = setInterval(
                function() {
                    myself.segundos--;
                    if (myself.segundos == 0) {
                      myself.segundos = 60;
                       myself.minutos--;
                        console.log(myself.minutos);
                        if (myself.minutos < 0) {
                            clearInterval(myself.crono);

                                  if (myself.rounds>1){
                                   myself.rounds--;
                                  myself.minutos =1;
                            descanso();
} else {
   myself.status = "fin";
}



                        }
                    }

                    function descanso() {
                  
                             

                        myself.status = "descanso";
                        myself.descrono = setInterval(
                            function() {
                                myself.segundos--;
                                if (myself.segundos < 0) {
                                    clearInterval(myself.descrono);
                                  
                                    if (myself.rounds > 0) {
                                        myself.status = "round";
                                        myself.minutos= myself.act_time-1;
                                      myself.segundos = 60;
                                        asalto();
                                    } else {
                                       console.log("finito");
                                    }
                                         
                                }

                            }, 50);
                    }
                },50);

}


        },
        add: function(variable) {
            if (this[variable + "_text"]) {
                if (this[variable] > this[variable + "_text"].length) {
                    this[variable] = 0;
                    return
                }
            }
            this[variable]++;
        },
        sub: function(variable) {
            if (this[variable + "_text"]) {
                if (this[variable] == 0) {
                    this[variable] = this[variable + "_text"].length - 1;
                    return
                }
            }
            this[variable] -= 1 * (this[variable] > 0);
        },
        setPanel(sesion) {


        },

        setSesion(sesion) {
            this.act_rounds = sesion.rounds;
            this.act_time = sesion.time;
            this.act_desc = sesion.desc;
            this.act_preaviso = sesion.preaviso;

        },
        deleteSesion(sesion) {
            const todoIndex = this.sesiones.indexOf(sesion);
            this.sesiones.splice(todoIndex, 1);
        },
        addSesion() {
            var newitem = {
                nombre: this.sesionName,
                rounds: this.act_rounds,
                time: this.act_time,
                desc: this.act_desc,
                preaviso: this.act_preaviso
            }
            this.sesiones.push(newitem);
            console.log(this.sesiones);
        }
    }
})