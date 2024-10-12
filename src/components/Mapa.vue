<template>
    <l-map :useGlobalLeaflet="false" ref="map" v-model:zoom="zoom" v-model:center="centroMapa">

      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        _url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>

      <l-control position="bottomleft" class="custom-control"><div class="text-subtitle-2">Esto es un control LControl</div>Nivel de zoom: {{ zoom }}<br>Coordenadas del centro: {{ centroMapa }}</l-control>

      <l-marker v-for="marcador in marcadores" :lat-lng="marcador.coordenadas" :key="marcador.nombre">
        <l-icon
          :icon-size="marcador.icono.tamano"
          :icon-url="marcador.icono.url"
          >
        </l-icon>

        <l-tooltip>
            <div class="text-center">
                <!-- <div><img style="max-height: 35px" :src="marcador.icono.url" /></div> -->
                {{ marcador.nombre }}<br>
                {{ marcador.coordenadas }}
            </div>
        </l-tooltip>

        <l-popup>
            <div><img style="max-height: 35px" :src="marcador.icono.url" /></div>
            <div class="ma-1 text-subtitle-2">Esto es {{ marcador.nombre }}</div>
            <div class="ma-1">Aquí puedes poner lo que quieras...</div>
            <v-btn color="secondary" size="small" class="mt-2" @click="btnMarcadorClick (marcador)">
                Acción
            </v-btn>
        </l-popup>

      </l-marker>

    </l-map>

    <div style="z-index: 1000; position: absolute; right: 0px; top: 0px; text-align: right; font-size: 9px;">
        <v-btn @click="btnCentrarMapaClick" color="primary" class="ma-3">Centrar mapa</v-btn>
        <v-btn @click="btnNuevoMarcadorClick" color="primary" class="ma-3">Nuevo marcador</v-btn>
        <p v-for="marcador in marcadores" class="mr-3">{{ marcador }}</p>
    </div>
</template>

<script setup>
    // ******************* https://vue2-leaflet.netlify.app/components/

    //import L from "leaflet"
    import "leaflet/dist/leaflet.css"
    import { LMap, LTileLayer, LMarker, LIcon, LPopup, LTooltip, LControl } from "@vue-leaflet/vue-leaflet"
    import { ref, reactive } from "vue"
    import { inject } from 'vue'

    const marcadores = inject('marcadores')
    const centroInicial = [40.596008, -3.247308]
    const zoom = ref (15)
    const centroMapa = ref (centroInicial)

    function coordenadasAleatoriasCercanaACoordenadas (coordenadas) {
        return [
          coordenadas[0] + (Math.random()*0.02)-0.01,
          coordenadas[1] + (Math.random()*0.02)-0.01
        ];
    }

    function btnCentrarMapaClick () {
        centroMapa.value = centroInicial;
        setTimeout (() => {
            zoom.value = 15;
        }, 500);
    }

    function btnNuevoMarcadorClick () {
        const icono = {
            url: null,
            tamano: null
        }
        if (marcadores.length % 4 == 3) {
            icono.url = "static/images/cartel_plazas.jpg"
            icono.tamano = [115, 35]
        } else {
            icono.url = "static/images/icono_parking.svg"
            icono.tamano = [35, 35]
        }

        marcadores.push ({
            nombre: "Marcador " + (marcadores.length + 1).toString(),
            coordenadas: coordenadasAleatoriasCercanaACoordenadas (centroInicial),
            icono: icono
        })
    }

    function btnMarcadorClick (marcador) {
        alert ('Has hecho clic en: ' + JSON.stringify (marcador))
    }
</script>

<style>
.custom-control {
  background: #fff;
  padding: 0 0.5em;
  border: 1px solid #aaa;
  border-radius: 0.8em;
}
</style>
