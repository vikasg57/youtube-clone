
 import {header} from "./components/header.js" 

 let head=document.querySelector("#header")

 head.innerHTML=header()
  

     const url = ""

    const key = ""

    let searchbutton=document.querySelector("#searchbutton")

    searchbutton.addEventListener('click',searchVideo)


const results =document.querySelector('#search_results')

async function searchVideo(){
    try{
        let video_query= document.querySelector("#video").value
        let response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?videoEmbeddable=true&part=snippet&maxResults=15&q=${video_query}&type=video&key=AIzaSyARVhX5SK0cgLd39MbemmARw0WsIGALAJk`)
        let data = await response.json()
        let video = data.items 
        

        // showcomment()
     
          
    

        ondisplay(video) 
        
    }
    catch(er){
        console.log(er)
    }
}

        let recommendation = JSON.parse(localStorage.getItem('recommendation_results'))
        ondisplay(recommendation)



function ondisplay(items){
  

    results.innerHTML=null

    items.map((el)=>{
        // console.log(el)
        
        let { id: { videoId } } = el;
        let{snippet}=el
       
       
        let{snippet:{thumbnails:{medium:{url}}}}=el
        let{snippet:{title}}=el
        let thumb= document.createElement('img')
        thumb.src=url
        
        let head=document.createElement('h4')
        head.innerHTML=title
        let div=document.createElement('div')

        // console.log(url)
        // console.log(videoId);

        let data_to_send = {
            snippet,
            videoId



        }
     



        // let(snip)

        div.onclick=()=>{
            playvideo(data_to_send,items)
        }

 


        

       
        div.append(thumb,head)
        results.append(div)
    });


};

        function playvideo(data,recommendation) {


            localStorage.setItem("clicked_video",JSON.stringify(data))
            localStorage.setItem("recommendation_results",JSON.stringify(recommendation))
            
            window.location.href="video.html"




            // results.innerHTML = null
           
            // // console.log("vikas")
            // console.log(videoId)
            // console.log(el)
            // let iframe = document.createElement("iframe")
            // iframe.src = `https://www.youtube.com/embed/${videoId}`
            // iframe.height = "500"
            // iframe.width = "700"
            // iframe.setAttribute("allowfullscreen", "true")
            // results.append(iframe)

        }



