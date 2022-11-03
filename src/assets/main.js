/*
[Video 21] - Consumiendo API

https://www.youtube.com/channel/UCGHfvNXqdkrthrd5jUFB93A
https://rapidapi.com/ytdlfree/api/youtube-v31

Dependencia para publicar ramas en github
gh-pages
https://www.npmjs.com/package/gh-pages

proyectos del curso
https://showcase.gndx.io/

Scripts: async, defer
https://es.javascript.info/script-async-defer
 */
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCGHfvNXqdkrthrd5jUFB93A&part=snippet%2Cid&order=date&maxResults=9';

// lugar del html donde vamos a agregar la plantilla que hemos creado mas abajo
const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '640c562ca8msh47a295bc410912ep12c97cjsne8a86a8c3d6e',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi){
    const response = await fetch(urlApi, options);
    // transformamos la informacion obtenida en el llamado con response
    const data = await response.json(); //nos entrega un objeto q podemos iterar
    return data;
}

// funcion anonima con arrow functions q se invoca a si misma
(async () => {
    try{
        const videos = await fetchData(API); //pasamos la constante API para desencadenar la logica q tenemos
        // creamos un template (html q se adapta para q itere por cada uno de los elementos que estan en la respuesta)
        let view = `
            ${videos.items.map(video => `
                <div class="group relative">
                    <div
                        class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${video.snippet.title}
                        </h3>
                    </div>
                </div>
            `).slice(0, 4).join('')} 
            
        `; // usamos slice para mostrar solo 4 elementos de los 9 que nos trae la API, join une dichos elementos

        // agregamos la insercion de la vista creada
        content.innerHTML = view;
    } catch (error){
        // preferiblemente mostrar un mensaje al usuario para q entienda que la API no esta disponible o que ha causado un error
        console.log(error);
    }
})();