//기본
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

let timer_elem = document.getElementById("timer")

let howtoImg = new Image()
let diedImg = new Image()

howtoImg.src = "src/img/howto.png"
diedImg.src = "src/img/died.png"

//이벤트
document.addEventListener("keydown", (e) => {
    switch(e.keyCode) {
        case 87:
            isW = true
            break
        case 65:
            isA = true
            break
        case 83:
            isS = true
            break
        case 68:
            isD = true
            break

        case 38:
            isUP = true
            break
        case 40:
            isDOWN = true
            break
        case 37:
            isLEFT = true
            break
        case 39:
            isRIGHT = true
            break
        
        case 32:
            Reset()
            scene = 1
            break

    }

})

document.addEventListener("keyup", (e) => {
    switch(e.keyCode) {
        case 87:
            isW = false
            break
        case 65:
            isA = false
            break
        case 83:
            isS = false
            break
        case 68:
            isD = false
            break

        case 38:
            isUP = false
            break
        case 40:
            isDOWN = false
            break
        case 37:
            isLEFT = false
            break
        case 39:
            isRIGHT = false
            break

    }
})



//키보드 변수들
let isW = false
let isA = false
let isS = false
let isD = false

let isUP = false
let isDOWN = false
let isLEFT = false
let isRIGHT = false

let UPCool = false
let DOWNCool = false
let LEFTCool = false
let RIGHTCool = false


//메인 캐릭터 변수
let X = 960 / 2
let Y = 540 / 2
let speed = 2
let gunCool = 0
let bulletSpeed = 5
let gunShootCool = 10
let scene = 0
let timer = 0

//엔티티 변수
let bullets = []
let mobs = []

//루프
setTimeout(()=> {
    if ( scene == 1) {
        
    }
    setInterval(() => {
        
    }, 500)
}, 10000)

setInterval(() => {

    switch(scene) {
        case 0: {
            Scene0()
            break
        }
        case 1: {
            Scene1()
            break
        }
        case 2: {
            Scene2()
            break
        }
    }
    
}, 10)


//함수
function Scene0() {
    ctx.drawImage(howtoImg, 0, 0, 960, 540)
}

function Reset() {
    //메인 캐릭터 변수
    X = 960 / 2
    Y = 540 / 2
    speed = 2
    gunCool = 0
    bulletSpeed = 5
    gunShootCool = 10
    scene = 0
    timer = 0

    //엔티티 변수
    bullets = []
    mobs = []
}
function Scene1() {
//메인 캐릭터 이동
if (isW){
    Y -= speed
}
if (isS){
    Y += speed
}
if (isA){
    X -= speed
}
if (isD){
    X += speed
}

if (X < 0) {
    X = 0
}
if (X > 960 - 10) {
    X = 960 - 10
}
if (Y < 0) {
    Y = 0
}
if (Y > 540 - 10) {
    Y = 540 - 10
}


if (gunCool == 0) {
    if (isUP && !UPCool){
        bullets.push([X+5/2, Y+5/2, 0, -bulletSpeed])
        UPCool = true
        gunCool = gunShootCool
    }   
    else if (isDOWN && !DOWNCool){
        bullets.push([X+5/2, Y+5/2, 0, bulletSpeed])
        DOWNCool = true
        gunCool = gunShootCool
    }       
    else if (isLEFT && !LEFTCool){
        bullets.push([X+5/2, Y+5/2, -bulletSpeed, 0])
        LEFTCool = true
        gunCool = gunShootCool
    }    
    else if (isRIGHT && !RIGHTCool){
        bullets.push([X+5/2, Y+5/2, bulletSpeed, 0])
        RIGHTCool = true
        gunCool = gunShootCool
    }
    
}

if (!isUP){
    UPCool = false
}
if (!isDOWN){
    DOWNCool = false
}
if (!isLEFT){
    LEFTCool = false
}
if (!isRIGHT){
    RIGHTCool = false
}

gunCool -= 1
if (gunCool <= 0) {
    gunCool = 0
}

//총알  [X, Y, Xv, Yv]
bullets.forEach((bullet, index) => {
    bullet[0] += bullet[2]
    bullet[1] += bullet[3]

    //bullet[2] = bullet[2]*0.99
    //bullet[3] += 0.098

    if (bullet[0] > 960 || bullet[0] < -5 || bullet[1] > 540 || bullet[1] < -5) {
        bullets.splice(index, 1)
    }

    mobs.forEach ((mob, index) => {
        if (bullet[0] + 5 >= mob[0] && bullet[0] <= mob[0] + 15 &&
            bullet[1] + 5 >= mob[1] && bullet[1] <= mob[1] + 15
            ) {
                mob[3] -= 1
                bullets.splice(index, 1)
        }
    })
})


//적 [X, Y, speed, health, type]  
mobs.forEach((mob, index) => {

    if (X - mob[0] != 0 && Y - mob[1] != 0) {
        let angle = Math.atan2(Y - mob[1], X - mob[0])
        mob[0] += Math.cos(angle) * mob[2]
        mob[1] += Math.sin(angle) * mob[2]
    }
    if (X + 10 >= mob[0] && X <= mob[0] + 15 &&
        Y + 10 >= mob[1] && Y <= mob[1] + 15) {
        scene = 2
    }
    
    if (mob[3] <= 0) {
        mobs.splice(index, 1)
    }  
})

//적 생성
if (timer % 50 == 0){
    let wall = Math.floor(Math.random()*4)
        switch(wall) {
            case 0:
                mobs.push([Math.random() * 960, -15, 1, 3, 1])
                break
            case 1:
                mobs.push([Math.random() * 960, 555, 1, 3, 1])
                break
            case 2:
                mobs.push([-15, Math.random() * 540, 1, 3, 1])
                break
            case 3:
                mobs.push([975, Math.random() * 540, 1, 3, 1])
                break
        }
}
if (timer % 100 == 0) {
    if (timer > 1500) {
        let wall = Math.floor(Math.random()*4)
        switch(wall) {
            case 0:
                mobs.push([Math.random() * 960, -15, 2, 1, 2])
                break
            case 1:
                mobs.push([Math.random() * 960, 555, 2, 1, 2])
                break
            case 2:
                mobs.push([-15, Math.random() * 540, 2, 1, 2])
                break
            case 3:
                mobs.push([975, Math.random() * 540, 2, 1, 2])
                break
        }
    }
}

//화면 그리기
ctx.clearRect(0, 0, 960, 540)

//플레이어 그리기
ctx.fillStyle = "rgb(0,0,255)"
ctx.fillRect(X, Y, 10, 10)

//총알 그리기
ctx.fillStyle = "rgb(255,0,0)"
bullets.forEach((bullet) => {
    ctx.fillRect(bullet[0], bullet[1], 5, 5)
})

//적 그리기
mobs.forEach((mob) => {
    switch(mob[4]) {
        case 1:
            ctx.fillStyle = "rgb(255,0,0)"
            ctx.fillRect(mob[0], mob[1], 15, 15)
            break
        case 2:
            ctx.fillStyle = "rgb(150,0,0)"
            ctx.fillRect(mob[0], mob[1], 15, 15)
            break
    }
    
})

//타이머
timer += 1
timer_elem.innerHTML = timer/100 + "s"
}

function Scene2() {
    ctx.drawImage(diedImg, 0, 0, 960, 540)
}