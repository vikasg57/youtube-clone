  

 import {header} from "./components/header.js" 

 let head=document.querySelector("#header")

 head.innerHTML=header()
  
  let appendvideo=()=>{
          let { videoId, snippet, snippet: { title }, snippet: { channelTitle }, snippet: { description }  } = JSON.parse(localStorage.getItem('clicked_video'))
   //     console.log(snippet)
   //     console.log(channelTitle)
   //     console.log(description)
        let recommendation = JSON.parse(localStorage.getItem('recommendation_results'))
        // console.log(recommendation)


        let video_div = document.getElementById('video_details')

        let iframe = document.createElement("iframe")
        iframe.src = `https://www.youtube.com/embed/${videoId}`
        iframe.height = "600px"
        iframe.width = "100%"
        iframe.setAttribute("allowfullscreen", "true")

        let heading = document.createElement('h2')
        heading.textContent=title
        let channelname= document.createElement('h3')
        channelname.textContent=channelTitle
      
         let des = document.createElement('p')
        des.textContent = description



        document.querySelector('.videobox').append(iframe,heading,channelname,des)
    
            showrecommendation(recommendation,iframe)
            showcomment(videoId)

            channelinfo(videoId)

    }



    appendvideo()
  

    async function channelinfo(videoId){
        try{

            let response =await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&key=AIzaSyARVhX5SK0cgLd39MbemmARw0WsIGALAJk&id=${videoId}`)

            let data =await response.json()

            console.log(data)
          
            
        }
        catch(er){
            console.log(er)
        }
    }

  

        async function showcomment(videoId) {
        try {
            let video_query = document.querySelector("#video").value
            let response = await fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=50&textFormat=html&videoId=${videoId}&key=AIzaSyARVhX5SK0cgLd39MbemmARw0WsIGALAJk`)
            let data = await response.json()
            // console.log(data)
            let{items}=data
            //  console.log(items)
             appendcomment(items)


            
        }
        catch (er) {
            console.log(er)
        }
    }

    


    function showrecommendation(data,iframe){

        data.map((el)=>{
            
            let { snippet: { thumbnails: { medium: { url } } } } = el
            let { snippet: { title } } = el
            let{snippet:{channelTitle}}=el
            let{id:{videoId}}=el
            let thumb = document.createElement('img')
            thumb.src = url

            let head = document.createElement('h3')
            head.innerHTML = title
            let channelname=document.createElement('p')
            channelname.innerHTML=channelTitle
            let div = document.createElement('div')
            div.setAttribute('class',"subrecommnd")

             let info= document.createElement('div')
             info.setAttribute('class',"info")

             info.append(head,channelname)

             div.append(thumb,info)
            document.querySelector('#recommendation').append(div)

            div.onclick=()=>{
                // console.log(videoId)

                playrecommend(videoId,iframe)


            }



        //  localStorage.removeItem("recommendation_results");



        })


    }

    function playrecommend(videoId,iframe){
         iframe.src = `https://www.youtube.com/embed/${videoId}`

    }

    let appendcomment=(items)=>{

        items.map((el)=>{
            let{snippet: { topLevelComment:{snippet} }}=el
             let { snippet: { topLevelComment: { snippet:{textOriginal}, snippet: { authorDisplayName}, snippet: { authorProfileImageUrl} } } } = el
     //        console.log(snippet)
     //       console.log(textOriginal)
    //        console.log(authorDisplayName)
    //        console.log(authorProfileImageUrl)

            let div = document.createElement('div')
              div.setAttribute('class',"commentbox")
                let imgdiv = document.createElement('div')
                  let infodiv = document.createElement('div')
                   infodiv.setAttribute('class',"infodiv")
                    let img=document.createElement('img')
                     img.src= authorProfileImageUrl
                      let name=document.createElement('h3')
                       name.textContent= authorDisplayName
                        let comment=document.createElement('p')
                         comment.textContent= textOriginal
                          imgdiv.append(img)
                           infodiv.append(name,comment)
                            div.append(imgdiv,infodiv)
                             document.querySelector('#commentdiv').append(div)

        })

    }