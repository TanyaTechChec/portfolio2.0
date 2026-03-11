document.addEventListener('DOMContentLoaded', function () {

  // Фон пузырей
  (function(){
    var width,height,canvas,ctx,circles,animateHeader=true;
    initHeader(); addListeners();
    function initHeader(){
      width=window.innerWidth; height=window.innerHeight;
      canvas=document.getElementById('bubbles'); if(!canvas) return;
      canvas.width=width; canvas.height=height;
      ctx=canvas.getContext('2d');
      circles=[];
      for(var i=0;i<width*0.9;i++){ circles.push(new Circle()); }
      animate();
    }
    function addListeners(){ window.addEventListener('scroll',scrollCheck); window.addEventListener('resize',resize);}
    function scrollCheck(){ animateHeader=document.body.scrollTop<=height; }
    function resize(){ width=window.innerWidth;height=window.innerHeight; canvas.width=width; canvas.height=height;}
    function animate(){ if(animateHeader){ ctx.clearRect(0,0,width,height); for(var i in circles){ circles[i].draw(); } } requestAnimationFrame(animate);}
    function Circle(){ var _this=this; function init(){ _this.pos={x:Math.random()*width,y:height+Math.random()*100}; _this.alpha=0.1+Math.random()*0.9; _this.scale=0.1+Math.random()*0.9; _this.velocity=Math.random(); } init(); this.draw=function(){ if(_this.alpha<=0) init(); _this.pos.y-=_this.velocity; _this.alpha-=0.0005; ctx.beginPath(); ctx.arc(_this.pos.x,_this.pos.y,_this.scale*10,0,Math.PI*2); ctx.fillStyle='rgba(157,188,225,'+_this.alpha+')'; ctx.fill(); } }
  })();

  // Слайдер проектов
  const slides=document.querySelector('.slides');
  const images=document.querySelectorAll('.slides img');
  const nextBtn=document.querySelector('.next');
  const prevBtn=document.querySelector('.prev');
  let index=0;
  function showSlide(){ slides.style.transform=`translateX(-${index*100}%)`; }
  nextBtn.addEventListener('click',()=>{ index++; if(index>=images.length){index=0;} showSlide(); });
  prevBtn.addEventListener('click',()=>{ index--; if(index<0){index=images.length-1;} showSlide(); });
  showSlide();
});
