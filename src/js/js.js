
Vue.filter('time', function (value) {
    let minutes = parseInt(Math.floor((value) / 60));
    let seconds = parseInt((value - ((minutes * 60))) % 60);
    let dMins = minutes;
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
            this.$emit('recibido', this.mitexto)
            this.$parent.closemodal();

        }
    }
})

var vm = new Vue({
    el: '#app',
    data: {
        sts_reset: 0,
        second: 0,
        digits: 0,
        a: {
            misdata: "",
            backup: "",
            stop_timer:0,
            act_time: 240,
            act_rounds: 4,
            act_desc: 60,
            act_preaviso: 1,
            act_preaviso_text: ["asalto", "descanso", "asalto y descanso", "nada"],
            act_idioma_text: ["Español", "Catalan", "ingles"],
            panel_text: ["", "Opciones", "Sonidos", "Sesiones", "Trainer", "Combate"],
            act_sonidos_text: ["sirena", "campana", "dong", "buzzer", "slap", "timbre"],
            sonido_asaltos: 1,
            sonido_descanso: 0,
            sonido_preaviso: 2,
            sonido_fin: 3,
            click: "mp3/click.mp3",
            fail: "mp3/fail.mp3",
            act_idioma: 0,
            act_theme_text: ["black", "color", "white"],
            running_text: ["", "READY", "BOX", "REST", "PAUSE", "FIN"],
            sonidos_mp3: ["mp3/sirena.mp3", "mp3/campana.mp3", "mp3/dong.mp3", "mp3/buzzer.mp3", "mp3/slap.mp3", "mp3/timbre.mp3"],
            act_theme: 1,
            sesiontitle: "",
            sesionName: "Nombre sesion",
            rounds: 0,
            minutos: 2,
            running: 0,
            sts_panel: 0,

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
                    time: 180,
                    desc: 60,
                    preaviso: 0
                },
                {
                    nombre: "entrenamiento",
                    rounds: 3,
                    time: 180,
                    desc: 60,
                    preaviso: 0
                }
            ],
        }
    },
    computed: {
        activa: function () {
            return ""
        }
    },
    created: function () {
        var myself = this;
        window.addEventListener('beforeunload', function (event) {
            myself.saveall();
            console.log("guardado");
        }, false);
        if (localStorage.backup) {
            console.log("cargo");
            this.a = JSON.parse(localStorage.backup);
            // this.a.sesiontitle= "";
        }

    },
    /*created() {
        console.log(this.a.running)
     /*   window.addEventListener('beforeunload', autosave());

        if (localStorage.backup) {
            this.a = JSON.parse(localStorage.backup);
        }
    },

    methods: {

        saveall: function () {

            this.a.backup = JSON.stringify(this.a);
            localStorage.backup = this.a.backup;
        },
        pause: function () {
            if (this.a.running == 3) {
                this.go();
            } else {
                this.a.running = 3;
                clearInterval(this.a.crono);
            }


                myself.crono = setInterval(
                    function() {
                        myself.digits--;
                        if ((myself.digits <= 0) || (myself.a.stop_timer==1)) {
                            clearInterval(myself.crono);
                            console.log("muerto");
                            resolve("done");
                        }
                    }, 150);
            });
        },
        resume: function () {


            this.go();
        },
        kill: function () {
            this.a.running = 0;
            clearInterval(this.a.crono);
            clearInterval(this.a.descrono);
        },
        start: function () {

            this.a.rounds = this.a.act_rounds;
            this.a.minutos = this.a.act_time;
            this.go();
        },
        go: function () {
            const myself = this.a;
            this.a.saveall;
            asalto();

            function asalto() {
                myself.crono = setInterval(
                    function () {
                        myself.running = 1;
                        myself.minutos--;
                        if (myself.minutos == 0) {
                            clearInterval(myself.crono);
                            if (myself.rounds > 1) {

                                myself.minutos = myself.act_desc;
                                descanso();
                            } else {
                                myself.running = 4;
                            }
                        }

                        function descanso() {
                            myself.running = 2;
                            myself.descrono = setInterval(
                                function () {
                                    myself.minutos--;
                                    if (myself.minutos < 0) {
                                        clearInterval(myself.descrono);

                                        if (myself.rounds > 0) {
                                            myself.minutos = myself.act_time;
                                            myself.rounds--;
                                            asalto();
                                        } else {
                                            console.log("finito");
                                            //      myself.running = 0;
                                        }
                                    }

                                }, 1000);
                        }
                    }, 1000);
            }
        },
        closemodal: function () {
            console.log("cierro");
        },
        add: function (variable, valor) {

            if (valor == undefined) valor = 1;
            if (this.a[variable + "_text"]) {
                if (this.a[variable] > this.a[variable + "_text"].length) {
                    this.a[variable] = 0;
                    return
                }
            }
            console.log(this.a[variable]);
            this.a[variable] += valor * 1;
        },
        sub: function (variable, valor) {
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
        setPanel(sesion) {
        },
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
            setTimeout(function () {
                missesiones.splice(todoIndex, 1);
            }, 800);
        },
        close(datos) {
            console.log("llego" + datos);
            var newitem = {
                nombre: datos,
                rounds: this.a.act_rounds,
                time: this.a.act_time,
                desc: this.a.act_desc,
                preaviso: this.a.act_preaviso
            }
            this.a.sesiones.push(newitem);
            this.a.sesiontitle = "";
        },
        addSesion() {
            console.log("pinffn");
            this.a.sesiontitle = "Nombre de la sesion?";

            } else {
                this.a.sesiontitle = "¿Nombre de la sesion?";
            }
        }
    }
})