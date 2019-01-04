Vue.filter('time', function(value) {

    let minutes = parseInt(Math.floor((value) / 60));
    let seconds = parseInt((value - ((minutes * 60))) % 60);


    let dMins = (minutes > 9 ? minutes : '0' + minutes);
    let dSecs = (seconds > 9 ? seconds : '0' + seconds);

    return dMins + ":" + dSecs;
});

Vue.component('mimodal', {
    data: function () {
  return {
    mitexto: "namesesion"
  }
},
  props: ['msj'],
    template: '<div class="modal"> <main> <h2>{{msj}}</h2><input v-model="mitexto" type="text" ref="title">  <div class="botonera"> <div><button @click="close()">Confirmar</button> </div></div></main></div>',
     methods: {
    close: function () {
        this.$emit('recibido',this.mitexto)
      this.$parent.closemodal();
    }
  }
})


var vm = new Vue({
    el: '#app',
    data: {
        a: {
            misdata:"",
            backup: "",
            act_time: 240,
            act_rounds: 4,
            act_desc: 60,
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
            running_text: ["none", "box", "rest", "pause"],
            act_theme: 1,
            sesiontitle: "",
            sesionName: "Nombre sesion",
            txtmodal: "jkl",
            rounds: 0,
            segundos: 60,
            minutos: 2,
            running: 0,
            sts_panel: 0,
            status: "main",
            fontSize: 5,
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
        }
    },
computed: {
  activa: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
},
    created() {
        console.log(this.a.running)
     /*   window.addEventListener('beforeunload', autosave());
        if (localStorage.backup) {
            console.log("cargoa");
            this.a = JSON.parse(localStorage.backup);
           // this.a.sesiontitle= "";
        }
        var my = this
        function autosave() {
            console.log("mevoy");
            // my.saveall()
        }*/
    },
    methods: {
        saveall: function() {
            this.a.backup = JSON.stringify(this.a);
            console.log(this.a.backup);
            console.log("guarddo");
            localStorage.backup = this.a.backup;
        },
        pause: function() {
            this.a.running = 3;
            clearInterval(this.a.crono);

        },
        resume: function(){

             const myself = this.a;
                 function asalto() {
     myself.crono = setInterval(
                    function() {
                                  myself.running = 1;
                        myself.minutos--;
                        if (myself.minutos == 0) {
                            clearInterval(myself.crono);
                            if (myself.rounds > 1) {
                                myself.rounds--;
                                myself.minutos = myself.act_desc;
                                descanso();
                            } else {
                                myself.running = 3;
                            }
                        }

                        function descanso() {
                            myself.running = 2;
                            myself.descrono = setInterval(
                                function() {
                                    myself.minutos--;
                                    if (myself.minutos < 0) {
                                        clearInterval(myself.descrono);

                                        if (myself.rounds > 0) {
                                            myself.minutos = myself.act_time;
                                            asalto();
                                        } else {
                                            console.log("finito");
                                          //      myself.running = 0;
                                        }
                                    }

                                }, 50);
                        }
                    }, 50);
 }
        },
        kill: function() {
            this.a.running = 0;
            clearInterval(this.a.crono);

        },
        go: function() {
            const myself = this.a;
            this.a.rounds = this.a.act_rounds;
            this.a.minutos = this.a.act_time;
            asalto();
            this.a.saveall;
            function asalto() {
                myself.crono = setInterval(
                    function() {
                                  myself.running = 1;
                        myself.minutos--;
                        if (myself.minutos == 0) {
                            clearInterval(myself.crono);
                            if (myself.rounds > 1) {
                                myself.rounds--;
                                myself.minutos = myself.act_desc;
                                descanso();
                            } else {
                                myself.running = 3;
                            }
                        }

                        function descanso() {
                            myself.running = 2;
                            myself.descrono = setInterval(
                                function() {
                                    myself.minutos--;
                                    if (myself.minutos < 0) {
                                        clearInterval(myself.descrono);

                                        if (myself.rounds > 0) {
                                            myself.minutos = myself.act_time;
                                            asalto();
                                        } else {
                                            console.log("finito");
                                          //      myself.running = 0;
                                        }
                                    }

                                }, 50);
                        }
                    }, 50);
            }


        },
        closemodal: function(){
             console.log("cierro");
        },
        add: function(variable, valor) {
      
            if (valor == undefined) valor = 1;
            if (this.a[variable + "_text"]) {
                if (this.a[variable] > this.a[variable + "_text"].length) {
                    this.a[variable] = 0;
                    return
                }
            }
                    console.log( this.a[variable]);
            this.a[variable] += valor * 1;
        },
        sub: function(variable, valor) {
              console.log("cierro");
            if (valor == undefined) valor = 1;
            if (this.a[variable + "_text"]) {
                if (this.a[variable] == 0) {
                    this.a[variable] = this.a[variable + "_text"].length - 1;
                    return
                }
            }
            this.a[variable] -= (1 * valor) * (this.a[variable] > 0);
        },
        setPanel(sesion) {},

        setSesion(sesion) {
            this.a.act_rounds = sesion.rounds;
            this.a.act_time = sesion.time;
            this.a.act_desc = sesion.desc;
            this.a.act_preaviso = sesion.preaviso;

        },
        deleteSesion(event, item) {
    //this.a.sesiontitle="dsff";
            console.log(console.log(event.target.parentElement));
            event.target.parentElement.className += " delete";
            const todoIndex = this.a.sesiones.indexOf(item);
            var missesiones = this.a.sesiones;
            setTimeout(function() {
                missesiones.splice(todoIndex, 1);
            }, 800);
        },
        close(datos) {
            console.log("llego" +datos);
                                  var newitem = {
                nombre: datos,
                rounds: this.a.act_rounds,
                time: this.a.act_time,
                desc: this.a.act_desc,
                preaviso: this.a.act_preaviso
            }
            this.a.sesiones.push(newitem);
                        this.a.sesiontitle="";
        },
        addSesion() {
console.log("pinffn");
            this.a.sesiontitle="Nombre de la sesion?";

        }
    }
})