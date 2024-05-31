const upper_thread =document.querySelector('.upper-thread')
const mini_game_start_btn = document.querySelector('.middle-down-thread')

console.log(upper_thread.clientHeight)

// 48 - 244px

mini_game_start_btn.addEventListener('mouseenter',()=>{
    const mouse_enter=setInterval(()=>{
        if(upper_thread.clientHeight<244)
            {
                console.log(upper_thread.clientHeight)
                upper_thread.style.height=`${upper_thread.clientHeight+14}px`
            }
            if(upper_thread.clientHeight>=244){
            upper_thread.style.height=`244px`
            
        } 
    },10)
    mini_game_start_btn.addEventListener('mouseleave',()=>{
        clearInterval(mouse_enter)
        const mouse_leave=setInterval(()=>{
            if(upper_thread.clientHeight>48)
                {
                    console.log(upper_thread.clientHeight)
                    upper_thread.style.height=`${upper_thread.clientHeight-14}px`
                }
                if(upper_thread.clientHeight<=48){
                upper_thread.style.height=`48px`
                
            } 
        },10)
        mini_game_start_btn.addEventListener('mouseenter',()=>{
            clearInterval(mouse_leave)})
    })
})
