const objects = document.querySelectorAll(".floating");

const sprites = [];

objects.forEach(object => {

    const width = object.offsetWidth || 110;
    const height = object.offsetHeight || 110;

    sprites.push({

        el: object,

        x: Math.random() * (window.innerWidth - width),
        y: Math.random() * (window.innerHeight - height),

        dx: (Math.random() * 1.5 + 0.5) * (Math.random() < .5 ? -1 : 1),
        dy: (Math.random() * 1.5 + 0.5) * (Math.random() < .5 ? -1 : 1),

        width,
        height

    });

});

function animate(){

    sprites.forEach(sprite=>{

        sprite.x += sprite.dx;
        sprite.y += sprite.dy;

        if(sprite.x <= 0){

            sprite.x = 0;
            sprite.dx *= -1;

        }

        if(sprite.x + sprite.width >= window.innerWidth){

            sprite.x = window.innerWidth - sprite.width;
            sprite.dx *= -1;

        }

        if(sprite.y <= 0){

            sprite.y = 0;
            sprite.dy *= -1;

        }

        if(sprite.y + sprite.height >= window.innerHeight){

            sprite.y = window.innerHeight - sprite.height;
            sprite.dy *= -1;

        }

        sprite.el.style.left = sprite.x + "px";
        sprite.el.style.top = sprite.y + "px";

    });

    requestAnimationFrame(animate);

}

setTimeout(animate,2000);

/* ---------- Mouse Interaction ---------- */

document.addEventListener("mousemove",e=>{

    sprites.forEach(sprite=>{

        const centerX = sprite.x + sprite.width/2;
        const centerY = sprite.y + sprite.height/2;

        const distance = Math.hypot(

            e.clientX-centerX,
            e.clientY-centerY

        );

        if(distance < 180){

            sprite.dx *= 1.01;
            sprite.dy *= 1.01;

        }else{

            sprite.dx *= .999;
            sprite.dy *= .999;

        }

        const maxSpeed = 4;
        const minSpeed = .6;

        sprite.dx = Math.max(
            -maxSpeed,
            Math.min(maxSpeed,sprite.dx)
        );

        sprite.dy = Math.max(
            -maxSpeed,
            Math.min(maxSpeed,sprite.dy)
        );

        if(Math.abs(sprite.dx) < minSpeed){

            sprite.dx = minSpeed * Math.sign(sprite.dx || 1);

        }

        if(Math.abs(sprite.dy) < minSpeed){

            sprite.dy = minSpeed * Math.sign(sprite.dy || 1);

        }

    });

});

/* ---------- Resize ---------- */

window.addEventListener("resize",()=>{

    sprites.forEach(sprite=>{

        sprite.x = Math.min(
            sprite.x,
            window.innerWidth-sprite.width
        );

        sprite.y = Math.min(
            sprite.y,
            window.innerHeight-sprite.height
        );

    });

});
